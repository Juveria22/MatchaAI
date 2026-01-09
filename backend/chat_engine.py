#Create fallback to ollama for when openai runs out of credits
import os
import time
from dotenv import load_dotenv
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from openai import APIError, APIConnectionError, RateLimitError

# OpenAI + Ollama integrations
from langchain.chat_models import ChatOpenAI
# from langchain_ollama import OllamaLLM
# uncomment if you want to switch back later

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") 

if not OPENAI_API_KEY:
    raise ValueError('OPENAI_API_KEY not found. Please check your .env file.')

#Initializing the LLM 
#temperature is about randomness, higher temp means more creative 
llm = ChatOpenAI(
    model="gpt-4o-mini",  # you can also use "gpt-4o-mini"
    temperature=0.7,
    api_key=OPENAI_API_KEY
)


#Store per user memory sessions 

session_memory_map = {}


# Define a consistent prompt template for conversation
prompt = PromptTemplate(
    input_variables=["history", "input"],
    template=(
        "You are Match.ai, a warm and empathetic wellness assistant. "
        "Your goal is to comfort and support the user with gentle, kind, encouraging messages. "
        "Maintain a positive, emotionally intelligent tone.\n\n"
        "Conversation history:\n{history}\n\n"
        "User: {input}\nMatch.ai:"
    )
)

def safe_generate(conversation, user_query):
    """Runs the model safely with retry logic."""
    max_attempts = 3
    for attempt in range(max_attempts):
        try:
            return conversation.predict(input=user_query)
        except RateLimitError:
            wait = 2 ** attempt
            print(f"Rate limit hit. Retrying in {wait}s...")
            time.sleep(wait)
        except (APIError, APIConnectionError) as e:
            print(f"OpenAI API error ({type(e).__name__}): {e}")
            time.sleep(2)
        except Exception as e:
            print(f"Unexpected error in chat generation: {e}")
            break
    return "Sorry, I'm taking a little breather right now. Try again in a few seconds!"

#Function to get response. sesssion id is individual to each user. created each time a new user starts a conversation. 
# user query tracks text  
# session memory checks for conversation history for the session id. If theres no history we create a new conversation memory map for the id 
# initializing a conversation chain by taking the session id and initializing it
# the .predict method generates an ai response based on the previous context and the current query (itll always try to look for previous history)
#then itll return the response in string 

def get_response(session_id: str, user_query: str) -> str:
    """Returns AI response using persistent session memory."""
    if session_id not in session_memory_map:
        memory = ConversationBufferMemory(memory_key="history")
        chain = LLMChain(llm=llm, prompt=prompt, memory=memory, verbose=False)
        session_memory_map[session_id] = chain
    else:
        chain = session_memory_map[session_id]

    response = safe_generate(chain, user_query)
    return response