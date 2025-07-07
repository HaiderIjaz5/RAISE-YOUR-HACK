from pydantic import BaseModel, Field
from typing import Optional, Literal, List, Dict, Any
from app.schemas.planner_input import PlannerInput


class AgentState(BaseModel):
    user_input: str = Field(..., description="The original user query")
    next_step: Optional[
        Literal["scrape", "google_search", "service", "planner", "book"]
    ] = None

    # Input
    planner_input: Optional[PlannerInput] = None
    # Output
    plan: Optional[str] = None
    itinerary: Optional[List[Dict[str, Any]]] = None