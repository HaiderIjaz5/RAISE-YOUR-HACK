# from fastapi import FastAPI, Body
# from app.graphs.main_graph import compiled_graph
# from app.schemas.state import AgentState
# from pydantic import BaseModel

# app = FastAPI()


# class UserQuery(BaseModel):
#     input: str


# @app.post("/run")
# def run_graph(request: UserQuery):
#     state = AgentState(user_input=request.input)
#     result = compiled_graph.invoke(state)
#     return result

from fastapi import APIRouter, FastAPI
from app.agents.planner.planner import load_planner_agent
from app.schemas.state import AgentState

router = APIRouter()


@router.post("/planner/test")
def test_planner_agent(state: AgentState):
    planner = load_planner_agent()
    result = planner.invoke(state)
    return result


app = FastAPI()
app.include_router(router)
