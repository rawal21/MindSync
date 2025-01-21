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
app.use("/api/chat", chatRoutes);

// Socket.io Events
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (chatGroupId) => {
    socket.join(chatGroupId);
    console.log(`User ${socket.id} joined room: ${chatGroupId}`);
  });

  socket.on('sendMessage', async (data) => {
    const { senderId, message, chatGroupId } = data;

    // Filter offensive words
    const filteredMessage = filterMessage(message);

    // Save the message to the database
    const newMessage = { senderId, message: filteredMessage, chatGroupId }; // Replace with DB logic if needed

    // Broadcast the message to the chat room
    io.to(chatGroupId).emit('newMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Server Listen
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
