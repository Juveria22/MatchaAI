import requests

BASE_URL = "http://127.0.0.1:8000"

# Test chat endpoint
chat_payload = {"session_id": "user1", "query": "Hey, I'm feeling anxious today."}
res1 = requests.post(f"{BASE_URL}/chat", json=chat_payload)
print("Chat:", res1.json())

# Test doc-chat endpoint
doc_payload = {"session_id": "user1", "query": "What helps reduce stress?"}
res2 = requests.post(f"{BASE_URL}/doc-chat", json=doc_payload)
print("Doc Chat:", res2.json())
