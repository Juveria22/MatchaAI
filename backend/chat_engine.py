import os
import time

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from openai import APIConnectionError, APIError, RateLimitError

#load key 

load_dotenv()

_api_key = os.getenv("OPENAI_API_KEY")
if not _api_key:
    raise ValueError("OPENAI_API_KEY not found. Please check your .env file.")

#llm structure primary openai api and then ollama as fallback

_openai_llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.7,
    api_key=_api_key,
)

_ollama_llm = ChatOllama(
    model="llama3.2",
    temperature=0.7,
)

#prompting

_PROMPT = ChatPromptTemplate.from_messages([
    ("system",
     "You are Match.ai, a warm and empathetic wellness assistant. "
     "Your goal is to comfort and support the user with gentle, kind, encouraging messages. "
     "Maintain a positive, emotionally intelligent tone."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])

#storing session mem

_session_store: dict[str, ChatMessageHistory] = {}


def _get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in _session_store:
        _session_store[session_id] = ChatMessageHistory()
    return _session_store[session_id]


def _make_chain(llm):
    return RunnableWithMessageHistory(
        _PROMPT | llm,
        _get_session_history,
        input_messages_key="input",
        history_messages_key="history",
    )


_openai_chain = _make_chain(_openai_llm)
_ollama_chain = _make_chain(_ollama_llm)

#fallback

_FALLBACK_MESSAGE = "Sorry, I'm taking a little breather right now. Try again in a few seconds!"
_MAX_RETRY_ATTEMPTS = 3

#retry logic 

def _invoke_chain(chain, session_id: str, user_query: str) -> str:
    config = {"configurable": {"session_id": session_id}}
    for attempt in range(_MAX_RETRY_ATTEMPTS):
        try:
            result = chain.invoke({"input": user_query}, config=config)
            return result.content
        except RateLimitError:
            wait = 2 ** attempt
            print(f"[chat_engine] Rate limit hit — retrying in {wait}s (attempt {attempt + 1})")
            time.sleep(wait)
        except (APIError, APIConnectionError) as exc:
            print(f"[chat_engine] OpenAI API error ({type(exc).__name__}): {exc}")
            time.sleep(2)
        except Exception as exc:  # noqa: BLE001
            print(f"[chat_engine] Unexpected error: {exc}")
            break
    return None  # Signal that this chain failed


#response logic; preserve covo history try openai then ollama (only works on local machine) then return response 

def get_response(session_id: str, user_query: str) -> str:
    response = _invoke_chain(_openai_chain, session_id, user_query)
    if response is not None:
        return response

    print("[chat_engine] OpenAI unavailable — falling back to Ollama.")
    response = _invoke_chain(_ollama_chain, session_id, user_query)
    if response is not None:
        return response

    return _FALLBACK_MESSAGE