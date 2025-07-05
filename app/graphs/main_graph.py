from langgraph.graph import StateGraph, END
from app.agents.orchestrator import load_orchestrator_agent
from app.schemas.state import AgentState

orchestrator_agent = load_orchestrator_agent()

graph = StateGraph(AgentState)

graph.add_node("orchestrator", orchestrator_agent)

graph.set_entry_point("orchestrator")

graph.add_edge("orchestrator", END)

compiled_graph = graph.compile()
