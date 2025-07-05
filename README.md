# RAISE-YOUR-HACK

This repository contains the collaborative work for our hackathon project. We are building this system to solve a real-world problem within the hackathon timeline. The project is open for contributions from all team members.

# How to run the agent system with fast

api

## Download neccessary library packages

Command: `pip install -r requirements.txt`

## Run outside of the app directory

Command: `uvicorn app.main:app --reload`

## Testing the agetn curl command on Linux system

Command: `curl -X POST http://127.0.0.1:8000/run      -H "Content-Type: application/json"      -d '{"input": "Book a hotel in Da Nang"}'`

Expected output: `{"user_input":"Book a hotel in Da Nang","next_step":"service"}`

## Make a call from POSTMAN

- Step 1: Change the HTTP Method to POST
- Step 2: Change type to `application/json`
- Step 3: Give the prompt in the `input` box
- Step 4: Call and receive the output
