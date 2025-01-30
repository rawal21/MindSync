const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const http = require('http');
const { Server } = require('socket.io');
const moodRoutes = require("./routes/moodRoutes");
const bodyParser = require("body-parser");
const facialExpressionRoutes = require("./routes/facialExpression");
const wellnessRoutes = require("./routes/wellness");
const chatRoutes = require('./routes/chat');
const { filterMessage } = require('./utils/moderation');
const cors = require("cors");
const ChatGroup = require('./models/ChatGroup');
const ChatMessage = require('./models/ChatMessage');
const chatGroupRoutes = require('./routes/chatGroupRoutes');

dotenv.config();

// Database Connection
connectDB();

const app = express();
const server = http.createServer(app); // Use http server with express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/facial-expressions", facialExpressionRoutes);
app.use("/api/routine", wellnessRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/groups', chatGroupRoutes);

// Socket config (backend)
const activeUsers = {};
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Store username and group ID for this socket connection
  socket.on('joinRoom', async ({ groupId, username }, callback) => {
    try {
      // Join the room
      socket.join(groupId);
      
      // Store username in socket data
      socket.data.username = username || "Anonymous";
      socket.data.groupId = groupId;

      // Update active members count
      activeUsers[groupId] = (activeUsers[groupId] || 0) + 1;
      await ChatGroup.findByIdAndUpdate(groupId, { 
        activeMembers: activeUsers[groupId] 
      });

      // Notify group about updated members
      io.to(groupId).emit('updateActiveMembers', { 
        chatGroupId: groupId, 
        count: activeUsers[groupId] 
      });

      // Send success confirmation to client
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: "Failed to join group" });
    }
  });

  // Socket config (backend)
socket.on('sendMessage', async (messageData) => {
  try {
    // Save to database
    const newMessage = new ChatMessage({
      username: messageData.username,
      message: messageData.message,
      chatGroupId: messageData.chatGroupId,
      // timestamp: messageData.timestamp
    });
    
    await newMessage.save();
    
    // Broadcast to room
    io.to(messageData.chatGroupId).emit('newMessage', newMessage);
  } catch (error) {
    console.error("Error saving message:", error);
  }
});

  // Handle disconnections
  socket.on('disconnect', async () => {
    if (socket.data.groupId) {
      activeUsers[socket.data.groupId] = Math.max(0, activeUsers[socket.data.groupId] - 1);
      await ChatGroup.findByIdAndUpdate(socket.data.groupId, { 
        activeMembers: activeUsers[socket.data.groupId] 
      });
      io.to(socket.data.groupId).emit('updateActiveMembers', { 
        chatGroupId: socket.data.groupId, 
        count: activeUsers[socket.data.groupId] 
      });
    }
  });
});

// Server Listen
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
