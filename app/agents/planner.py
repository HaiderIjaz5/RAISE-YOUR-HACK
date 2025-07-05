from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda
from app.schemas.state import AgentState
from app.core.llm import get_llm


def load_planner_agent():
    with open(
        "/home/aaronpham/Coding/LabLabAI_hackathon/RAISE-YOUR-HACK/app/agents/prompts/planners.txt"
    ) as f:
        template = f.read()

    prompt = PromptTemplate.from_template(template)
    llm = get_llm(model="gpt-4o", temperature=0.2)

    chain = prompt | llm

    def invoke(state: AgentState) -> AgentState:
        if not state.planner_input:
            raise ValueError("Missing planner_input")
        response = chain.invoke(state.planner_input.dict())
        return AgentState(**{**state.dict(), "plan": response.content})

    return RunnableLambda(invoke)
