from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableLambda
from app.schemas.state import AgentState
from dotenv import load_dotenv
import os

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")


def load_orchestrator_agent():
    # Load prompt
    with open(
        "/home/aaronpham/Coding/LabLabAI_hackathon/RAISE-YOUR-HACK/app/agents/prompts/orchestrator.txt"
    ) as f:
        template = f.read()

    prompt = PromptTemplate.from_template(template)

    """
    Change the model to Groq - LLAMA
    """
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0, openai_api_key=openai_api_key)

    chain = prompt | llm  # Updated to use RunnableSequence

    # Wrap it with a LangGraph-compatible Runnable
    def invoke_orchestrator(state: AgentState) -> AgentState:
        result = chain.invoke({"user_input": state.user_input})
        data = state.model_dump()
        data.pop("next_step", None)
        return AgentState(**data, next_step=result.content.strip())

    return RunnableLambda(invoke_orchestrator)
