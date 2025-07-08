from schemas.booking_input import BookingRequest
from services.booking_tools import process_booking

class BookingAgent:
    def __init__(self):
        pass

    def run(self, request: BookingRequest):
        return process_booking(request)
