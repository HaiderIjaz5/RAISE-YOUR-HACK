from .stripe_client import create_payment_intent
from schemas.booking_input import BookingRequest

def process_booking(request: BookingRequest):
    price_per_ticket = 1000
    total_amount = price_per_ticket * request.num_tickets

    intent = create_payment_intent(
        amount_cents=total_amount,
        currency=request.currency,
        description=f"Booking {request.num_tickets} tickets for {request.event_id}",
        metadata={"user_id": request.user_id, "event_id": request.event_id}
    )

    return {
        "status": "requires_action" if intent.status in ("requires_action", "requires_payment_method") else "succeeded",
        "client_secret": intent.client_secret,
        "payment_intent_id": intent.id,
        "amount": total_amount,
        "currency": intent.currency,
    }
