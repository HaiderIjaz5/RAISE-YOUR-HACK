# RAISE-YOUR-HACK

This repository contains the collaborative work for our hackathon project. We are building this system to solve a real-world problem within the hackathon timeline. The project is open for contributions from all team members.


Key features include:

Personalized Suggestions: The chatbot uses survey input to understand each user’s travel preferences and recommends destinations, activities, and accommodations that best match their interests.

Hotel Recommendations: The chatbot evaluates hotels in the target area based on criteria such as price, location, reviews, and amenities to suggest the best options for the traveler’s budget and needs.

Trip Planning Assistance: Beyond suggestions, the chatbot assists users with booking hotels, planning itineraries, and finding local attractions.

Seamless Booking: Users can finalize their bookings for hotels and other services directly through the platform with chatbot guidance.

The goal of Travelling Web is to make trip planning simple, interactive, and highly personalized — helping travelers make better decisions about where to stay and what to do, all through an easy chat interface.

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
