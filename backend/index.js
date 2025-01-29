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

// Socket.io Events

const activeUsers = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', async (chatGroupId) => {
    socket.join(chatGroupId);
    activeUsers[chatGroupId] = (activeUsers[chatGroupId] || 0) + 1;

    await ChatGroup.findByIdAndUpdate(chatGroupId, { activeMembers: activeUsers[chatGroupId] });

    io.to(chatGroupId).emit('updateActiveMembers', { chatGroupId, count: activeUsers[chatGroupId] });
  });

  socket.on('leaveRoom', async (chatGroupId) => {
    if (activeUsers[chatGroupId]) {
      activeUsers[chatGroupId] = Math.max(0, activeUsers[chatGroupId] - 1);
      await ChatGroup.findByIdAndUpdate(chatGroupId, { activeMembers: activeUsers[chatGroupId] });

      io.to(chatGroupId).emit('updateActiveMembers', { chatGroupId, count: activeUsers[chatGroupId] });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Server Listen
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
