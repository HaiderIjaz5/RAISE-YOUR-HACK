from schemas.state import AgentState
from schemas.planner_input import PlannerInput
from agents.planner import load_planner_agent

# Demo PlannerInput (this is your calendar event info)
demo_input = PlannerInput(
    nop=5,
    interests=["team", "meeting"],
    startDate="2025-07-10T14:00:00+05:00",
    endDate="2025-07-10T15:00:00+05:00",
    cuisine="Italian",
    locations=["Karachi"],
    budget="5000",
    title="Tour To Karachi",
    description="Project discussion in Karachi"
)

# Demo AgentState (user wants to add plan to calendar)
state = AgentState(
    user_input="add plan to calendar",  # This is what triggers the webhook in your logic
    planner_input=demo_input
)

# Load planner agent
planner = load_planner_agent()

# Invoke the planner agent
result = planner(state)

# Print result
print("Final Agent Result:")
print(result)
