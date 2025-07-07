from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

def get_llm(model: str = "meta-llama/llama-4-scout-17b-16e-instruct", temperature: float = 0.3):

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))


    return {
        "client": client,
        "model": model,
        "temperature": temperature
    }
