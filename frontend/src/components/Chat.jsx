import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'System',
      text: 'Welcome to the support chat. Please be kind and respectful to others.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const username = localStorage.getItem('chatUsername') || 'Anonymous';

  useEffect(() => {
    // If no username is set, redirect to join page
    if (!localStorage.getItem('chatUsername')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: username,
          text: newMessage,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      setNewMessage('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('chatUsername');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-400 to-purple-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-lg">
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="mr-4 p-2 rounded-full hover:bg-white/10 text-white"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-white">Support Community Chat</h1>
        </div>
        <span className="text-white text-sm">Logged in as {username}</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-300 flex items-center justify-center text-white">
                {message.user[0]}
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 text-white max-w-[80%]">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{message.user}</span>
                  <span className="text-xs text-white/70">{message.timestamp}</span>
                </div>
                <p className="mt-1">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white/10 backdrop-blur-lg">
        <div className="flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full bg-white/20 border-0 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-white text-purple-600 hover:bg-white/90 transition-colors"
          >
            →
          </button>
        </div>
      </form>
    </div>
  );
}