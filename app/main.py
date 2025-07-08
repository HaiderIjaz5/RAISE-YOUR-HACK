from fastapi import APIRouter, FastAPI
from agents.planner import load_planner_agent
from schemas.state import AgentState

router = APIRouter()


@router.post("/planner")
def test_planner_agent(state: AgentState):
    planner = load_planner_agent()
    result = planner(state)
    return result


# 👉 FastAPI app setup
app = FastAPI()
app.include_router(router)
