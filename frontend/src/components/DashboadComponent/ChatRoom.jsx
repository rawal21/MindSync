import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ChatRoom({ group, username, socket }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get(`http://localhost:3000/api/chat/${group._id}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchMessages();

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [group._id, socket]);

  function sendMessage() {
    if (message.trim()) {
      const newMessage = { senderId: username, message, chatGroupId: group._id };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  }

  return (
    <div className="p-4 bg-purple-500 h-full text-white flex flex-col">
      <h2>{group.name}</h2>
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">{msg.senderId}: {msg.message}</div>
        ))}
      </div>
      <div className="flex">
        <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
