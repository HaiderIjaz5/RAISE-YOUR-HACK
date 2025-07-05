from langchain_openai import ChatOpenAI
from pydantic import SecretStr
import os
from dotenv import load_dotenv

load_dotenv()


def get_llm(model: str = "gpt-4o-mini", temperature: float = 0.3) -> ChatOpenAI:
    return ChatOpenAI(
        model=model,
        temperature=temperature,
        api_key=SecretStr(os.getenv("OPENAI_API_KEY", "")),
    )
