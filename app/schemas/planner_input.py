from pydantic import BaseModel
from typing import Optional, List
from datetime import time


class PlannerInput(BaseModel):
    nop: Optional[int] = None
    interests: Optional[List[str]] = None

    # calendar: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None

    cuisine: Optional[str] = None
    locations: Optional[List[str]] = None
    budget: Optional[str] = None
