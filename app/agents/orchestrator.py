from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableLambda
from app.schemas.state import AgentState
from dotenv import load_dotenv
from pydantic import SecretStr
from app.core.llm import get_llm
import os


load_dotenv()


def load_orchestrator_agent():
    with open(
        "/home/aaronpham/Coding/LabLabAI_hackathon/RAISE-YOUR-HACK/app/agents/prompts/orchestrator.txt"
    ) as f:
        template = f.read()

    prompt = PromptTemplate.from_template(template)
    llm = get_llm()

    chain = prompt | llm  # Updated to use RunnableSequence

    # Wrap it with a LangGraph-compatible Runnable
    def invoke_orchestrator(state: AgentState) -> AgentState:
        result = chain.invoke({"user_input": state.user_input})
        data = state.model_dump()
        data.pop("next_step", None)

        return AgentState(**data, next_step=result.content.strip())

    return RunnableLambda(invoke_orchestrator)
