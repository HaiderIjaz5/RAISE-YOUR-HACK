from pydantic import BaseModel

class BookingRequest(BaseModel):
    user_id: str
    event_id: str
    num_tickets: int
    currency: str = "usd"
