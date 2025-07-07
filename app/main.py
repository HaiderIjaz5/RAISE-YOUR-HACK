from fastapi import FastAPI, Body
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from graphs.main_graph import compiled_graph
from schemas.state import AgentState
from pydantic import BaseModel

app = FastAPI()


class UserQuery(BaseModel):
    input: str


@app.post("/run")
def run_graph(request: UserQuery):
    state = AgentState(user_input=request.input)
    result = compiled_graph.invoke(state)
    return result
# Test API endpoint
if __name__ == "__main__":
    import requests
    
    # Test POST request
    response = requests.post(
        "http://127.0.0.1:8000/run",
        json={"input": "Book a hotel in Da Nang"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")