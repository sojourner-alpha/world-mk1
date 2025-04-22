from fastapi import APIRouter, Request, Depends, HTTPException, status
import stripe
import os
from typing import Optional

router = APIRouter()

# Initialize Stripe with API key from environment
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

@router.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    """
    Create a Stripe checkout session for payment
    """
    data = await request.json()
    
    try:
        # Create new checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": data.get("product_name", "Financial Analysis Tool"),
                        },
                        "unit_amount": int(data.get("amount", 1000)),  # Amount in cents
                    },
                    "quantity": 1,
                },
            ],
            mode="payment",
            success_url=data.get("success_url", "https://curtislederle.com/payment-success"),
            cancel_url=data.get("cancel_url", "https://curtislederle.com/payment-cancel"),
        )
        return {"url": checkout_session.url}
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/webhook")
async def stripe_webhook(request: Request):
    """
    Handle Stripe webhook events
    """
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=400, detail=str(e))
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise HTTPException(status_code=400, detail=str(e))
        
    # Handle the event
    if event["type"] == "checkout.session.completed":
        checkout_session = event["data"]["object"]
        # Handle successful payment
        print(f"Payment successful for session: {checkout_session['id']}")
        # Future: Update database with payment status
    
    return {"status": "success"} 