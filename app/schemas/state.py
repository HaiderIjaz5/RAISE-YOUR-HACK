from pydantic import BaseModel, Field
from typing import Optional, Literal


class AgentState(BaseModel):
    user_input: str = Field(..., description="The original user query")
    next_step: Optional[
        Literal["scrape", "google_search", "service", "planner", "book"]
    ] = None