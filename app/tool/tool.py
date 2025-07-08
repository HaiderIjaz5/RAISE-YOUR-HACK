import requests

def trigger_n8n_calendar_manager(action: str, title: str, start: str, end: str, description: str, location: str, event_id: str = None):
    webhook_url = "https://haiderijaz.app.n8n.cloud/webhook-test/event-planner"

    payload = {
        "action": action,
        "title": title,
        "start": start,
        "end": end,
        "description": description,
        "location": location
    }

    if action == "update" or action == "delete":
        payload["event_id"] = event_id

    try:
        response = requests.post(webhook_url, json=payload)
        response.raise_for_status()
        return {"status": "success", "response": response.json() if response.content else "No Content"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
