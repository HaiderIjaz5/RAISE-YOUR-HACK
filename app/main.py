from fastapi import APIRouter, FastAPI
from app.agents.planner.planner import load_planner_agent
from app.schemas.state import AgentState

from app.agents.booking.booking_agent import BookingAgent
from app.schemas.booking_input import BookingRequest

router = APIRouter()

# ---- Planner Route ----
@router.post("/planner/test")
def test_planner_agent(state: AgentState):
    planner = load_planner_agent()
    result = planner.invoke(state)
    return result

# ---- Booking Route ----
@router.post("/booking/run")
def run_booking_agent(request: BookingRequest):
    agent = BookingAgent()
    result = agent.run(request)
    return result


app = FastAPI()
app.include_router(router)
