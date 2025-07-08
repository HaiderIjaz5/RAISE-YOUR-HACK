"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, MapPin } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your travel assistant. I can help you plan your perfect trip. Where would you like to go?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    if (input.includes("paris") || input.includes("france")) {
      return "Paris is an amazing choice! The City of Light offers incredible museums, cuisine, and architecture. Would you like recommendations for the best time to visit or specific attractions?"
    } else if (input.includes("japan") || input.includes("tokyo")) {
      return "Japan is fantastic! From Tokyo's modern skyline to Kyoto's ancient temples, there's so much to explore. Are you interested in cherry blossom season or perhaps the autumn colors?"
    } else if (input.includes("beach") || input.includes("tropical")) {
      return "For beautiful beaches, I'd recommend the Maldives, Bali, or the Greek islands. Each offers crystal-clear waters and unique experiences. What's your preferred activity - relaxation or water sports?"
    } else if (input.includes("budget") || input.includes("cheap")) {
      return "For budget-friendly destinations, consider Thailand, Vietnam, or Eastern Europe. These places offer great value with rich culture and delicious food. What's your approximate budget range?"
    } else {
      return "That sounds interesting! I'd love to help you plan that trip. Could you tell me more about what kind of experience you're looking for - adventure, relaxation, culture, or something else?"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Map Section */}
        <div className="w-1/2 bg-white shadow-lg">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b bg-gradient-to-r from-emerald-500 to-sky-500 text-white">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Explore Destinations</h2>
              </div>
            </div>
            <div className="flex-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Travel Destinations Map"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-1/2 bg-white shadow-2xl flex flex-col border-l border-gray-200">
          <div className="p-4 border-b bg-gradient-to-r from-emerald-500 to-sky-500 text-white">
            <h2 className="text-lg font-semibold">Travel Assistant</h2>
            <p className="text-sm opacity-90">Ask me anything about your travel plans!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about destinations, activities, or travel tips..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white p-2 rounded-full transition-colors duration-200"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
