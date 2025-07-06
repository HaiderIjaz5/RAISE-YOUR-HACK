from langchain_core.tools import tool
import requests
from typing import List

N8N_WEBHOOK_URL = "https://aaronpham5504.app.n8n.cloud/webhook-test/event-planner"


@tool
def calendar_creation(itinerary: List):
    if not itinerary:
        return {"status": "failed", "message": "Itinerary is empty"}

    try:
        response = requests.post(N8N_WEBHOOK_URL, json=itinerary)
        response.raise_for_status()
        return {"status": "success", "n8n_response": response.text}
    except requests.RequestException as e:
        return {"status": "error", "message": str(e)}


@tool
def get_weather(Location: str) -> str:
    # Your implementation here
    return f"Weather for {Location}"


planer_tools = [get_weather, calendar_creation]
