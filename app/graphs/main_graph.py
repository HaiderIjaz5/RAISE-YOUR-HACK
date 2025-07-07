from langgraph.graph import StateGraph, END
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from agents.orchestrator import load_orchestrator_agent
from schemas.state import AgentState

orchestrator_agent = load_orchestrator_agent()

graph = StateGraph(AgentState)

# Add Nodes to the graph
graph.add_node("orchestrator", orchestrator_agent)

graph.set_entry_point("orchestrator")


# Conditional edge from orchestor
def route_next_step(state: AgentState):
    if state.next_step == "planner":
        return "planner"
    elif state.next_step == "scrape":
        return "scrape"
    elif state.next_step == "google_search":
        return "google_search"
    elif state.next_step == "book":
        return "book"
    elif state.next_step == "service":
        return "service"
    else:
        return END


graph.add_edge("orchestrator", END)

compiled_graph = graph.compile()