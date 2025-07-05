from fastapi import FastAPI, Body
from app.graphs.main_graph import compiled_graph
from app.schemas.state import AgentState
from pydantic import BaseModel

app = FastAPI()


class UserQuery(BaseModel):
    input: str


@app.post("/run")
def run_graph(request: UserQuery):
    state = AgentState(user_input=request.input)
    result = compiled_graph.invoke(state)
    return result
