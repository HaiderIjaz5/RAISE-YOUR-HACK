from schemas.state import AgentState
from core.llm import get_llm
from tool.tool import trigger_n8n_calendar_manager

import os
import re
import json


def load_planner_agent():
    """
    Planner Agent: Suggests places to visit and calculates budget using database info.
    """

    # ✅ Dynamically load the prompt file from: app/agents/prompts/planners.txt
    current_dir = os.path.dirname(__file__)  # This is app/agents
    prompt_path = os.path.join(current_dir, "prompts", "planners.txt")

    with open(prompt_path, encoding="utf-8") as f:
        template = f.read()

    # Load Groq LLM configuration
    llm_config = get_llm(model="meta-llama/llama-4-scout-17b-16e-instruct", temperature=0.2)
    client = llm_config["client"]
    model = llm_config["model"]
    temperature = llm_config["temperature"]

    def invoke(state: AgentState) -> AgentState:
        if not state.planner_input:
            raise ValueError("Missing planner_input")

        # Build user message using the input and template
        user_message = template.format(**state.planner_input.model_dump())

        # Call Groq API directly
        completion = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": user_message}],
            temperature=temperature,
            max_completion_tokens=1024,
            top_p=1,
            stream=False
        )

        content = completion.choices[0].message.content

        try:
            match = re.search(r"\[\s*{.*?}\s*]", content, re.DOTALL)
            itinerary_json = json.loads(match.group()) if match else []
        except Exception as e:
            raise ValueError("Could not extract itinerary JSON format") from e

        plan_summary = content.replace(match.group(), "") if match else content

        # 🔥 Trigger the n8n Calendar Manager webhook
        if itinerary_json:
            event = itinerary_json[0]  # Picking the first event for demo
            webhook_response = trigger_n8n_calendar_manager(
                action="create",
                title=event.get("title", "Untitled Event"),
                start=event.get("start"),
                end=event.get("end"),
                description=event.get("description", ""),
                location=event.get("location", "")
            )
            print("Webhook response:", webhook_response)
        else:
            print("No itinerary found to send to webhook.")
            webhook_response = None

        return AgentState(
            **{**state.model_dump(), "plan": plan_summary, "itinerary": itinerary_json}
        )

    return invoke  # Return the function directly
