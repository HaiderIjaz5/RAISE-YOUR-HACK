from langgraph.graph import StateGraph, END
from app.agents.orchestrator import load_orchestrator_agent
from app.agents.planner.planner import load_planner_agent
from app.schemas.state import AgentState

orchestrator_agent = load_orchestrator_agent()
planner_agent = load_planner_agent()

graph = StateGraph(AgentState)

# Add Nodes to the graph
graph.add_node("orchestrator", orchestrator_agent)
graph.add_node("planner", planner_agent)

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


graph.add_conditional_edges("orchestrator", route_next_step)
graph.add_edge("planner", "orchestrator")

compiled_graph = graph.compile()
