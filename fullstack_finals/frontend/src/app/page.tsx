"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, Bot, User, Heart, Apple, Shield, GraduationCap } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type ExpertType = "planner" | "nutrition" | "injury" | "escalation"

const expertConfig = {
  planner: {
    name: "Wellness Planner",
    icon: Heart,
    color: "bg-purple-500",
    description: "Personalized wellness planning",
  },
  nutrition: {
    name: "Nutrition Expert",
    icon: Apple,
    color: "bg-green-500",
    description: "Dietary guidance and nutrition advice",
  },
  injury: {
    name: "Injury Support",
    icon: Shield,
    color: "bg-blue-500",
    description: "Recovery and injury prevention",
  },
  escalation: {
    name: "Human Trainer",
    icon: GraduationCap,
    color: "bg-orange-500",
    description: "Connect with certified professionals",
  },
}

export default function HealthWellnessChat() {
  const [input, setInput] = useState("")
  const [expert, setExpert] = useState<ExpertType>("planner")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Health & Wellness Assistant. I'm here to help you with personalized wellness planning, nutrition advice, injury support, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const typingEffect = async (text: string) => {
    setIsTyping(true)
    let typed = ""
    const assistantMessage: Message = {
      role: "assistant",
      content: "",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])

    for (let i = 0; i < text.length; i++) {
      typed += text[i]
      await new Promise((r) => setTimeout(r, 20))
      setMessages((prev) => [...prev.slice(0, -1), { ...assistantMessage, content: typed }])
    }
    setIsTyping(false)
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res =await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`
, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: input.trim(), expert }),
      })

      if (!res.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await res.json()
      await typingEffect(data.response || "I apologize, but I couldn't generate a proper response. Please try again.")
    } catch (error) {
      console.error("Chat error:", error)
      await typingEffect("❌ I'm experiencing technical difficulties. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const currentExpert = expertConfig[expert]
  const ExpertIcon = currentExpert.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 p-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Health & Wellness Assistant</h1>
          <p className="mt-2 text-gray-600">Your personal AI companion for health, nutrition, and wellness guidance</p>
        </div>

        {/* Expert Selection */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ExpertIcon className="h-5 w-5" />
              Current Expert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={expert} onValueChange={(value: ExpertType) => setExpert(value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(expertConfig).map(([key, config]) => {
                  const Icon = config.icon
                  return (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full p-1.5 ${config.color}`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{config.name}</div>
                          <div className="text-sm text-gray-500">{config.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${currentExpert.color}`} />
                Active: {currentExpert.name}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-0">
            {/* Messages */}
            <ScrollArea className="h-[500px] p-6">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback
                        className={
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                        }
                      >
                        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={`flex flex-col gap-1 max-w-[80%] ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-sm ${
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-white border border-gray-200 text-gray-900"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <span className="text-xs text-gray-500 px-2">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 rounded-2xl bg-white border border-gray-200 px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div
                          className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
              <div ref={chatEndRef} />
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t bg-gray-50/50 p-6">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={`Ask ${currentExpert.name} anything about your health and wellness...`}
                    className="min-h-[60px] resize-none border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    disabled={loading}
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-6"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{input.length}/500</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            This AI assistant provides general wellness information and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
