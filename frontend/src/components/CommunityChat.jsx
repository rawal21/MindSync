import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Socket.IO connection
const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'], // Ensure proper transport
});

const CommunityChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRoom, setChatRoom] = useState('general'); // Default chat room
  const [senderId] = useState(() => Math.random().toString(36).substring(7)); // Generate a random ID

  // Join the chat room and fetch messages
  useEffect(() => {
    // Join the selected chat room
    socket.emit('joinRoom', chatRoom);

    // Fetch previous messages for the chat room
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/chat/${chatRoom}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    // Listen for new messages from the server
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup when chat room changes or component unmounts
    return () => {
      socket.emit('leaveRoom', chatRoom);
      socket.off('newMessage');
    };
  }, [chatRoom]);

  // Handle form submission to send a message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        senderId,
        message: newMessage,
        chatGroupId: chatRoom,
      };

      // Send the message to the server
      socket.emit('sendMessage', messageData);

      // Optimistically update the UI
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Community Chat</h5>

        {/* Chat Room Selector */}
        <div className="mb-3">
          <label htmlFor="chatRoom" className="form-label">Select Chat Room</label>
          <select
            id="chatRoom"
            className="form-select"
            value={chatRoom}
            onChange={(e) => setChatRoom(e.target.value)}
          >
            <option value="general">General</option>
            <option value="stress-management">Stress Management</option>
            <option value="fitness">Fitness</option>
          </select>
        </div>

        {/* Messages Section */}
        <div className="mb-3" style={{ height: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <strong>{msg.senderId}:</strong> {msg.message}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityChat;
