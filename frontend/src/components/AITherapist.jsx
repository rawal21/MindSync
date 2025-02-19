

import { useState } from "react"
import { Mic, Send, Calendar, TrendingUp } from "lucide-react"

const Button = ({ children, onClick, variant, size, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md ${
      variant === "outline" ? "border border-gray-300" : "bg-purple-500 text-white"
    } ${size === "icon" ? "p-2" : ""} ${className}`}
  >
    {children}
  </button>
)

const Input = ({ placeholder, value, onChange, className }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border rounded-md p-2 ${className}`}
  />
)

const Card = ({ children, className }) => <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>

const CardHeader = ({ children, className }) => <div className={`border-b p-4 ${className}`}>{children}</div>

const CardContent = ({ children, className }) => <div className={`p-4 flex-grow overflow-y-auto space-y-4 ${className}`}>{children}</div>

const CardFooter = ({ children, className }) => <div className={`border-t p-4 ${className}`}>{children}</div>

const Avatar = ({ children, className }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${className}`}>{children}</div>
)

export default function AITherapist() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", content: "Hello! I'm your AI Therapist. How are you feeling today?" },
  ])
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)

  /**
   * Handles sending a text message to the backend.
   */
  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Update chat with user message
    const updatedChat = [...chatHistory, { role: "user", content: message }]
    setChatHistory(updatedChat)

    try {
      const response = await fetch("http://localhost:3000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      })
      const data = await response.json()

      setChatHistory([...updatedChat, { role: "ai", content: data.aiResponse }])
    } catch (error) {
      console.error("Error sending message:", error)
    }

    setMessage("")
  }

  /**
   * Handles voice recording and sending to backend.
   */
  const handleVoiceInput = async () => {
    if (!isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }

  /**
   * Starts recording voice.
   */
  const startRecording = () => {
    setIsRecording(true)
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream)
      let chunks = []

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" })
        setAudioBlob(audioBlob)
        sendVoiceMessage(audioBlob)
      }

      mediaRecorder.start()
      setTimeout(() => {
        mediaRecorder.stop()
        setIsRecording(false)
      }, 5000) // Automatically stop after 5 seconds
    })
  }

  /**
   * Sends recorded voice to backend for transcription and AI response.
   */
  const sendVoiceMessage = async (blob) => {
    const formData = new FormData()
    formData.append("audio", blob, "voice-message.wav")

    try {
      const response = await fetch("http://localhost:3000/api/ai/voice", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      setChatHistory([
        ...chatHistory,
        { role: "user", content: data.text },
        { role: "ai", content: data.aiResponse },
      ])
    } catch (error) {
      console.error("Error processing voice input:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-2xl mx-auto flex-grow flex flex-col">
        <CardHeader className="border-b">
          <h2 className="text-2xl font-bold text-center text-purple-700">AI Therapist</h2>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto space-y-4">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-end space-x-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={msg.role === "user" ? "bg-blue-500" : "bg-purple-500"}>
                  {msg.role === "user" ? "U" : "AI"}
                </Avatar>
                <div
                  className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                    msg.role === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex items-center w-full space-x-2">
            <Button
              onClick={handleVoiceInput}
              variant="outline"
              size="icon"
              className={`${isRecording ? "bg-red-500 text-white" : ""}`}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-4 flex justify-center space-x-4">
        <Button variant="outline" className="bg-white">
          <Calendar className="h-4 w-4 mr-2" />
          Set Reminder
        </Button>
        <Button variant="outline" className="bg-white">
          <TrendingUp className="h-4 w-4 mr-2" />
          View Progress
        </Button>
      </div>
    </div>
  )
}
