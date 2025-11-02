#to start backend: venv\Scripts\activate
#uvicorn backend.main:app --reload
#deactivate
import os

#from dotenv import load_dotenv
from fastapi import FastAPI

from chat_engine import get_response
from crisis import CRISIS_RESPONSE, contains_crisis_keyword
from doc_engine import query_documents
from logger import log_chat
from models import ChatRequest
from fastapi.middleware.cors import CORSMiddleware #this lets u access backend code from the frontend 
#from ollama import Ollama 

#load_dotenv()

app = FastAPI()

DOC_KEYWORDS = [
    "stress", "relax", "breathe", "meditation", "anxiety",
    "wellness", "cope", "coping", "manage stress", "mindfulness",
    "calm", "focus", "tips", "strategy", "self care"
]

def should_use_doc_engine(query: str) -> bool:
    text = query.lower()
    return any(word in text for word in DOC_KEYWORDS)


#this code allows cors to let the frontend access the backend 
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"], #You can replace " " with specific domain in production
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers=["*"],
)

#sends welcome message
@app.get("/")
def read_root():
    return {"message": "Welcome to matchai! Your neighborhood friendly support bot!"}

#this accepts the post request; first it;; try to check for the crisis words as soon as the user sends data 
#if no crisis detected it send the normal llm response 
@app.post("/chat")
def chat_with_memory(request: ChatRequest):
    session_id = request.session_id
    user_query = request.query

    # Crisis check
    if contains_crisis_keyword(user_query):
        log_chat(session_id, user_query, CRISIS_RESPONSE, is_crisis=True, engine_used="crisis")
        return {"response": CRISIS_RESPONSE}

    # Document keyword trigger
    if should_use_doc_engine(user_query):
        response = query_documents(user_query)
        log_chat(session_id, user_query, response, is_crisis=False, engine_used="doc")
        return {"response": response}

    # Normal OpenAI chat
    response = get_response(session_id, user_query)
    log_chat(session_id, user_query, response, is_crisis=False, engine_used="chat")
    return {"response": response}

#recieves post requests with user query too but here it'll try to search within our vector database 
#from doc_engine.py where were just creating the index of the query engine and from their it gets the response from the documents  
@app.post("/doc-chat")
def chat_with_documents(request: ChatRequest):
    response = query_documents(request.query)
    return {"response": response}