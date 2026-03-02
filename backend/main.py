#to start backend: venv\Scripts\activate
#cd backend
#uvicorn main:app --reload
#deactivate
import asyncio
import json
import os
import uuid

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from chat_engine import get_response
from crisis import CRISIS_RESPONSE, contains_crisis_keyword
from doc_engine import query_documents
from logger import log_chat
from models import ChatRequest

# app setup

app = FastAPI(title="Match.ai", description="Wellness support chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LEADERBOARD_FILE = "leaderboard.json"
MAX_LEADERBOARD_SIZE = 5

# Only route to the doc engine when the user is explicitly seeking advice or
# strategies, not just mentioning a wellness-related feeling.
DOC_INTENT_KEYWORDS = [
    "tips", "strategy", "strategies", "how to", "ways to",
    "techniques", "help me with", "advice", "guide", "steps",
    "manage stress", "cope", "coping", "mindfulness", "meditation",
    "breathing", "self care", "relax", "breathe",
]


#helper funcs

def _is_doc_query(query: str) -> bool:
    text = query.lower()
    return any(keyword in text for keyword in DOC_INTENT_KEYWORDS)


def _read_leaderboard() -> list[dict]:
    if not os.path.exists(LEADERBOARD_FILE):
        return []
    with open(LEADERBOARD_FILE, "r") as f:
        return json.load(f)


def _write_leaderboard(entries: list[dict]) -> None:
    with open(LEADERBOARD_FILE, "w") as f:
        json.dump(entries, f)


#rest api routes
@app.get("/")
async def root():
    return {"message": "Welcome to Match.ai — your friendly wellness support bot!"}


#main chat endpoint - routes to crisis handler, doc enginer, or llm depending on user's query 
@app.post("/chat")
async def chat(request: ChatRequest):
    session_id = request.session_id or str(uuid.uuid4())
    query = request.query.strip()

    if not query:
        raise HTTPException(status_code=400, detail="Query must not be empty.")

    # 1. Crisis detection - highest priority, checked before anything else.
    if await asyncio.to_thread(contains_crisis_keyword, query):
        await asyncio.to_thread(
            log_chat, session_id, query, CRISIS_RESPONSE,
            is_crisis=True, engine_used="crisis"
        )
        return {"response": CRISIS_RESPONSE}

    # 2. Doc engine - user is asking for wellness strategies or resources.
    if _is_doc_query(query):
        response = await asyncio.to_thread(query_documents, query)
        await asyncio.to_thread(
            log_chat, session_id, query, response,
            is_crisis=False, engine_used="doc"
        )
        return {"response": response}

    # 3. Conversational LLM - general chat with session memory.
    response = await asyncio.to_thread(get_response, session_id, query)
    await asyncio.to_thread(
        log_chat, session_id, query, response,
        is_crisis=False, engine_used="chat"
    )
    return {"response": response}


@app.post("/doc-chat")
async def doc_chat(request: ChatRequest):
    """Direct document search endpoint, bypassing the LLM."""
    response = await asyncio.to_thread(query_documents, request.query)
    return {"response": response}


# clicker game leaderboad 

class ScoreEntry(BaseModel):
    name: str
    score: int

#returns top 5

@app.get("/leaderboard")
async def get_leaderboard():
    return await asyncio.to_thread(_read_leaderboard)

#adding a new score

@app.post("/leaderboard")
async def add_score(entry: ScoreEntry):
    leaderboard = await asyncio.to_thread(_read_leaderboard)
    leaderboard.append(entry.dict())
    leaderboard = sorted(leaderboard, key=lambda x: x["score"], reverse=True)[:MAX_LEADERBOARD_SIZE]
    await asyncio.to_thread(_write_leaderboard, leaderboard)
    return leaderboard