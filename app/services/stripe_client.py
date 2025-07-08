import os
import stripe
from dotenv import load_dotenv

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

def create_payment_intent(amount_cents: int, currency: str = "usd", description: str = "", metadata: dict = None):
    intent = stripe.PaymentIntent.create(
        amount=amount_cents,
        currency=currency,
        description=description,
        automatic_payment_methods={"enabled": True},
        metadata=metadata or {},
    )
    return intent
