"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Send, PlusCircle } from "lucide-react";
import img1 from "./images/icon.jpeg"

export default function AITherapistChatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI therapist. How are you feeling today?", sender: "ai" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: "i am in under maintaince..",
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl sm:text-2xl font-bold">AI Therapist</CardTitle>
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
            <img src={img1} alt="AI Therapist" />
          </Avatar>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[55vh] sm:h-[60vh] w-full pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] text-sm sm:text-base ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 sm:space-y-4">
          <div className="flex w-full space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow text-sm sm:text-base p-2 sm:p-3"
            />
            <Button onClick={handleSendMessage} className="p-2 sm:p-3">
              <Send className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between w-full space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="outline" className="flex items-center justify-center flex-1 p-2 sm:p-3">
              <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
              Add Reminder
            </Button>
            <Button variant="outline" className="flex items-center justify-center flex-1 p-2 sm:p-3">
              <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
              Set Next Session
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
