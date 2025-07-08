from tool.tool import trigger_n8n_calendar_manager

# Example for CREATE action
response = trigger_n8n_calendar_manager(
    action="create",
    title="Team Meeting",
    start="2025-07-08T14:00:00+05:00",
    end="2025-07-08T15:00:00+05:00",
    description="Project discussion",
    location="Zoom"
)

print("Webhook Trigger Response:", response)
