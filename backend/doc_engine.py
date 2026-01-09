import os
from dotenv import load_dotenv
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.openai import OpenAI as LlamaOpenAI

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found. Please set it in your .env file.")

# Lightweight model setup — initialized once
llama_llm = LlamaOpenAI(model="gpt-4o-mini", temperature=0.7)
embed_model = OpenAIEmbedding(model="text-embedding-3-small")

# ───────────────────────────────────────────────
# Topic → folder mapping
# ───────────────────────────────────────────────
TOPIC_PATHS = {
    "stress": "data/stress",
    "sleep": "data/sleep",
    "nutrition": "data/nutrition",
    "mindfulness": "data/mindfulness",
}

_index_cache = {}  # Cache of loaded indices


def get_index_for_topic(topic: str):
    """
    Build or reuse a vector index for the given topic.
    Loads documents only once per topic.
    """
    if topic in _index_cache:
        return _index_cache[topic]

    path = TOPIC_PATHS.get(topic)
    if not path or not os.path.exists(path):
        print(f"⚠️ No folder found for topic '{topic}', skipping.")
        return None

    try:
        print(f"📚 Loading documents for topic: {topic}")
        documents = SimpleDirectoryReader(path).load_data()
        index = VectorStoreIndex.from_documents(documents, embed_model=embed_model)
        _index_cache[topic] = index
        return index
    except Exception as e:
        print(f"❌ Error building index for '{topic}': {e}")
        return None


def detect_topic(user_query: str) -> str:
    """Return the topic keyword that best matches the query."""
    q = user_query.lower()
    if any(k in q for k in ["sleep", "insomnia", "rest"]):
        return "sleep"
    if any(k in q for k in ["food", "eat", "diet", "nutrition", "meal"]):
        return "nutrition"
    if any(k in q for k in ["mindful", "focus", "meditation", "breathe", "calm"]):
        return "mindfulness"
    return "stress"  # default fallback


def query_documents(user_query: str) -> str:
    """
    Query the relevant topic documents.
    Only loads and embeds when actually called.
    """
    topic = detect_topic(user_query)
    index = get_index_for_topic(topic)

    if not index:
        return "Sorry, I don’t have any documents on that topic yet!"

    query_engine = index.as_query_engine(llm=llama_llm)
    try:
        response = query_engine.query(user_query)
        return str(response)
    except Exception as e:
        print(f"❌ Error querying documents: {e}")
        return "Hmm… something went wrong while reading the resources."