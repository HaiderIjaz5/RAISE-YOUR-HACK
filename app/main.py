from fastapi import APIRouter, FastAPI
from agents.planner import load_planner_agent
from schemas.state import AgentState

router = APIRouter()

# 👉 Endpoint to test planner agent
@router.post("/planner/test")
def test_planner_agent(state: AgentState):
    planner = load_planner_agent()  # Direct function
    result = planner(state)         # ✅ Correct: Direct function call, no .invoke
    return result                   # FastAPI will auto-serialize AgentState to JSON

# 👉 FastAPI app setup
app = FastAPI()
app.include_router(router)
