
from dotenv import load_dotenv
import os
from groq import Groq

load_dotenv() 

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
client = Groq(api_key=GROQ_API_KEY)


def chat_response(conversation_history):

    chat_completion = client.chat.completions.create(
    messages=conversation_history,  
    model="llama-3.3-70b-versatile", 
    )
    ai_response = chat_completion.choices[0].message.content
    return ai_response
