
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:3000");

export default function ChatPage() {
  const { groupId } = useParams();
  const { state } = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const username = state?.username || "Anonymous";
 const navigate = useNavigate();
 const storedGroup = localStorage.getItem('selectedGroup');
 const group = storedGroup ? JSON.parse(storedGroup) : null;
    console.log("this is the group details " , group);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/chat/${groupId}`)
      .then(res => setMessages(res.data))
      .catch(console.error);

    socket.on("newMessage", (message) => {
      setMessages(prev => [...prev, message]);
    });  

    

    return () => {
      socket.off("newMessage");
    };
  }, [groupId]);

  

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        message: newMessage,
        username,
        chatGroupId: groupId,
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit("sendMessage", messageData);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-400 to-purple-600">
      <div className="flex items-center p-4 bg-white/10 backdrop-blur-lg">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon" onClick={()=>navigate("/dashboard")} >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-white">{group.name}</h1>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-300">{msg.username[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 text-white max-w-[80%]">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{msg.username}</span>
                  <span className="text-xs text-white/70">{msg.timestamp}</span>
                </div>
                <p className="mt-1">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={sendMessage} className="p-4 bg-white/10 backdrop-blur-lg">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white/20 border-0 text-white placeholder:text-white/70"
          />
          <Button type="submit" size="icon" className="bg-white text-purple-600 hover:bg-white/90" onClick={sendMessage}>
            <Send className="h-5 w-5" />
          </Button> 
        </div>
      </form>
    </div>
  );
}
