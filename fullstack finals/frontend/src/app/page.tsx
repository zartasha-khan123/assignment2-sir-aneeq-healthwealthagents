// // //third
// 'use client'
// import { useState } from 'react'

// export default function Home() {
//   const [input, setInput] = useState('')
//   const [expert, setExpert] = useState('planner')
//   const [response, setResponse] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSend = async () => {
//     setLoading(true)
//     setResponse('')
//     try {
//       const res = await fetch('http://127.0.0.1:8000/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ user_input: input, expert, context: {} })
//       })

//       if (!res.ok) throw new Error('❌ Failed to fetch from FastAPI backend')
//       const data = await res.json()
//       setResponse(data.response)
//     } catch (error) {
//       setResponse((error as Error).message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6 bg-amber-900">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl transition-all duration-300">
//         <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
//           🧠 Health & Wellness Planner
//         </h1>
//         <p className="text-center text-gray-600 mb-4">Choose your expert and ask anything related to your health & lifestyle.</p>

//         <label className="block text-sm  text-gray-700 mb-2 font-extrabold">Select Expert</label>
//         <select
//           className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={expert}
//           onChange={(e) => setExpert(e.target.value)}
//         >
//           <option value="planner">🧠 Wellness Planner</option>
//           <option value="nutrition">🥗 Nutrition Expert</option>
//           <option value="injury">🦴 Injury Support</option>
//           <option value="escalation">🧑‍🏫 Human Trainer</option>
//         </select>

//         <label className="block text-sm font-bold text-gray-700 mb-2">Your Question</label>
//         <textarea
//           className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 "
//           rows={5}
//           placeholder="Ask about diet, recovery, injuries, or planning goals..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />

//         <button
//           className="w-full bg-blue-400 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//           onClick={handleSend}
//           disabled={loading}
//         >
//           {loading ? 'Sending...' : 'Send'}
//         </button>

//         {response && (
//           <div className="mt-6 p-4 bg-gray-50 border-l-4 border-blue-400 rounded-md text-gray-800 whitespace-pre-wrap shadow-sm">
//             {response}
//           </div>
//         )}
//       </div>
//     </main>
//   )
// }



//perfect thaa
// 'use client'

// import { useState, useEffect, useRef } from 'react'

// export default function Home() {
//   const [input, setInput] = useState('')
//   const [expert, setExpert] = useState('planner')
//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(false)
//   const chatEndRef = useRef(null)

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const handleSend = async () => {
//     if (!input.trim()) return
//     const userMessage = { role: 'user', content: input }
//     setMessages(prev => [...prev, userMessage])
//     setLoading(true)
//     setInput('')

//     try {
//       const res = await fetch('http://127.0.0.1:8000/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ user_input: input, expert })
//       })
//       const data = await res.json()
//       const responseMessage = {
//         role: 'assistant',
//         content: data.response || '⚠️ No valid response returned.'
//       }
//       const followUpMessage = {
//         role: 'assistant',
//         content: '🤖 Aur kuch chahiye?'
//       }
//       setMessages(prev => [...prev, responseMessage, followUpMessage])
//     } catch (err) {
//       setMessages(prev => [...prev, { role: 'assistant', content: '❌ Server error.' }])
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 flex flex-col h-[90vh]">
//         <h1 className="text-3xl font-bold mb-4 text-center text-green-700">💬 Health & Wellness Chat</h1>

//         <div className="flex-grow overflow-y-auto space-y-4 border p-4 rounded mb-4 bg-gray-50">
//           {messages.map((msg, i) => (
//             <div key={i} className={`p-3 rounded-xl w-fit max-w-[90%] ${msg.role === 'user' ? 'bg-blue-100 self-end text-right' : 'bg-gray-200 self-start text-left'}`}>
//               {msg.content}
//             </div>
//           ))}
//           <div ref={chatEndRef} />
//         </div>

//         <div className="mb-2">
//           <select
//             className="w-full p-2 border rounded mb-2"
//             value={expert}
//             onChange={(e) => setExpert(e.target.value)}
//           >
//             <option value="planner">🧠 Wellness Planner</option>
//             <option value="nutrition">🥗 Nutrition Expert</option>
//             <option value="injury">🦴 Injury Support</option>
//             <option value="escalation">🧑‍🏫 Human Trainer</option>
//           </select>
//           <textarea
//             className="w-full p-2 border rounded"
//             rows={3}
//             placeholder="Type your question..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
//           />
//         </div>

//         <button
//           className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
//           onClick={handleSend}
//           disabled={loading}
//         >
//           {loading ? 'Thinking...' : 'Send'}
//         </button>
//       </div>
//     </main>
//   )
// }






// // ✅ page.tsx (Next.js Frontend)
// 'use client'

// import { useState, useEffect, useRef } from 'react'

// type Message = {
//   role: 'user' | 'assistant'
//   content: string
// }

// export default function Home() {
//   const [input, setInput] = useState('')
//   const [expert, setExpert] = useState('planner')
//   const [messages, setMessages] = useState<Message[]>([])
//   const [loading, setLoading] = useState(false)
//   const chatEndRef = useRef<HTMLDivElement | null>(null)

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const typingEffect = async (text: string) => {
//     let typed = ''
//     for (let i = 0; i < text.length; i++) {
//       typed += text[i]
//       await new Promise((r) => setTimeout(r, 10))
//       setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content: typed }])
//     }
//   }

//   const handleSend = async () => {
//     if (!input.trim()) return

//     const userMessage: Message = { role: 'user', content: input }
//     setMessages((prev) => [...prev, userMessage])
//     setInput('')
//     setLoading(true)

//     try {
//       const res = await fetch('http://127.0.0.1:8000/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ user_input: input, expert })
//       })
//       const data = await res.json()
//       const assistantMessage: Message = { role: 'assistant', content: '' }
//       setMessages((prev) => [...prev, assistantMessage])
//       await typingEffect(data.response || '⚠️ No valid response returned.')

//       setMessages((prev) => [...prev, { role: 'assistant', content: '🤖 Anything else I can help you with?' }])
//     } catch (error) {
//       setMessages((prev) => [...prev, { role: 'assistant', content: '❌ Server error.' }])
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 flex flex-col h-[90vh]">
//         <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-green-700">🌿 Health & Wellness Assistant</h1>

//         <div className="flex-grow overflow-y-auto space-y-4 px-3 py-2 rounded bg-gray-50 border border-gray-200 mb-4">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-line text-sm md:text-base shadow 
//                 ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}
//           <div ref={chatEndRef} />
//         </div>

//         <div className="flex flex-col gap-2 mb-2">
//           <select
//             className="w-full p-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
//             value={expert}
//             onChange={(e) => setExpert(e.target.value)}
//           >
//             <option value="planner">🧠 Wellness Planner</option>
//             <option value="nutrition">🥗 Nutrition Expert</option>
//             <option value="injury">🦴 Injury Support</option>
//             <option value="escalation">🧑‍🏫 Human Trainer</option>
//           </select>

//           <textarea
//             className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
//             rows={3}
//             placeholder="Type your health or wellness question..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault()
//                 handleSend()
//               }
//             }}
//           />
//         </div>

//         <button
//           onClick={handleSend}
//           disabled={loading}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
//         >
//           {loading ? 'Thinking...' : 'Send'}
//         </button>
//       </div>
//     </main>
//   )
// }


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
      const res = await fetch("http://127.0.0.1:8000/chat", {
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
