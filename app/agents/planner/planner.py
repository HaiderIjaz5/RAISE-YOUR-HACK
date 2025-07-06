from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda
from app.schemas.state import AgentState
from app.core.llm import get_llm
import re
import json


def load_planner_agent():
    """
    Planner Agent should only works as an place suggestions agent which suggest which place should visit. And fetch the information about price in the database to calculate the budget.
    """
    with open(
        "/home/aaronpham/Coding/LabLabAI_hackathon/RAISE-YOUR-HACK/app/agents/prompts/planners.txt"
    ) as f:
        template = f.read()

    prompt = PromptTemplate.from_template(template)
    llm = get_llm(model="gpt-4o-mini", temperature=0.2)

    chain = prompt | llm

    def invoke(state: AgentState) -> AgentState:
        if not state.planner_input:
            raise ValueError("Missing planner_input")
        response = chain.invoke(state.planner_input.model_dump())
        content = response.content if hasattr(response, "content") else response
        content = str(content)

        try:
            match = re.search(r"\[\s*{.*?}\s*]", content, re.DOTALL)
            itinerary_json = json.loads(match.group()) if match else []
        except Exception as e:
            raise ValueError("Could not extact itinerary JSON format ") from e

        plan_summary = content.replace(match.group(), "") if match else content

        # Define a good structure for the output result
        state_dict = state.model_dump()
        state_dict["plan"] = plan_summary
        state_dict["itinerary"] = itinerary_json

        return AgentState(**state_dict)

    return RunnableLambda(invoke)
