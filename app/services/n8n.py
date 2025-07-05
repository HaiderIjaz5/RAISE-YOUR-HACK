import requests

N8N_WEBHOOK_URL = "https://aaronpham5504.app.n8n.cloud/webhook-test/event-planner"


def send_itinerary_to_n8n(itinerary: list):
    if not itinerary:
        return {"status": "failed", "message": "Itinerary is empty"}

    try:
        response = requests.post(N8N_WEBHOOK_URL, json=itinerary)
        response.raise_for_status()
        return {"status": "success", "n8n_response": response.text}
    except requests.RequestException as e:
        return {"status": "error", "message": str(e)}
