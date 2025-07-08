from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

def get_llm(model: str = "meta-llama/llama-4-scout-17b-16e-instruct", temperature: float = 0.3):
    # Initialize the Groq client using API Key from .env
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    # Return the client and configuration so you can use it later
    return {
        "client": client,
        "model": model,
        "temperature": temperature
    }
