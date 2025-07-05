from pydantic import BaseModel, Field
from typing import Optional, Literal
from app.schemas.planner_input import PlannerInput  # import the model


class AgentState(BaseModel):
    user_input: str = Field(..., description="The original user query")
    next_step: Optional[
        Literal["scrape", "google_search", "service", "planner", "book"]
    ] = None
    planner_input: Optional[PlannerInput] = None  # 👈 Key line
