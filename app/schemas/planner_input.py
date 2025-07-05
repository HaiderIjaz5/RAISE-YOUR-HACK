from pydantic import BaseModel
from typing import Optional, List


class PlannerInput(BaseModel):
    nop: Optional[int] = None
    interests: Optional[List[str]] = None
    calendar: Optional[str] = None
    cuisine: Optional[str] = None
    location: Optional[str] = None
    budget: Optional[str] = None
