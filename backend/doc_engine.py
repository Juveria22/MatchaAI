import os

from dotenv import load_dotenv
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.openai import OpenAI as LlamaOpenAI


load_dotenv()

_api_key = os.getenv("OPENAI_API_KEY")
if not _api_key:
    raise ValueError("OPENAI_API_KEY not found. Please set it in your .env file.")

#llm model gpt 4o mini

_llm = LlamaOpenAI(model="gpt-4o-mini", temperature=0.7)
_embed_model = OpenAIEmbedding(model="text-embedding-3-small")


# Maps a topic keyword to its document folder.
# Add new topics here if wanted 
_TOPIC_PATHS: dict[str, str] = {
    "stress":       "data/stress",
    "sleep":        "data/sleep",
    "nutrition":    "data/nutrition",
    "mindfulness":  "data/mindfulness",
}

_DEFAULT_TOPIC = "stress"

# Keyword -> topic routing table. Checked in order; first match wins
_TOPIC_KEYWORDS: list[tuple[str, list[str]]] = [
    ("sleep",       ["sleep", "insomnia", "rest"]),
    ("nutrition",   ["food", "eat", "diet", "nutrition", "meal"]),
    ("mindfulness", ["mindful", "focus", "meditation", "breathe", "calm"]),
]

# In-memory cache so each topic's index is only built once per process
_index_cache: dict[str, VectorStoreIndex] = {}

# return topic that best matches or default to stress

def _detect_topic(query: str) -> str:
    lowered = query.lower()
    for topic, keywords in _TOPIC_KEYWORDS:
        if any(kw in lowered for kw in keywords):
            return topic
    return _DEFAULT_TOPIC

#return cached vector for given topic, build if needed and return None for missing topic folder or if index cant be built 

def _get_or_build_index(topic: str):
    if topic in _index_cache:
        return _index_cache[topic]

    folder = _TOPIC_PATHS.get(topic)
    if not folder or not os.path.exists(folder):
        print(f"[doc_engine] No document folder found for topic '{topic}' - skipping.")
        return None

    try:
        print(f"[doc_engine] Building index for topic: {topic}")
        documents = SimpleDirectoryReader(folder).load_data()
        index = VectorStoreIndex.from_documents(documents, embed_model=_embed_model)
        _index_cache[topic] = index
        return index
    except Exception as exc:
        print(f"[doc_engine] Failed to build index for '{topic}': {exc}")
        return None

# query doc index most relevant to user question. Detect topic and load corresponding vector index and return respose from dource docs
#fallback response for faliure

def query_documents(user_query: str) -> str:
    topic = _detect_topic(user_query)
    index = _get_or_build_index(topic)

    if index is None:
        return "Sorry, I don't have any resources on that topic yet!"

    try:
        response = index.as_query_engine(llm=_llm).query(user_query)
        return str(response)
    except Exception as exc:
        print(f"[doc_engine] Query failed: {exc}")
        return "Something went wrong while reading the resources - please try again."