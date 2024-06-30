// const express = require('express');
// const cors = require('cors');
// const mongoose = require("mongoose");
// const app = express();
// const port = 8000;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// require("./config/mongoose.config");
// require("./routes/post.routes")(app);
// app.use('/api/contact', require('./routes/contact.routes'));


// app.listen(port, () => {
//     console.log(`Listening on port: ${port}`);
// });

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB via Mongoose
require("./config/mongoose.config");

// Routes setup
require("./routes/post.routes")(app);
app.use('/api/contact', require('./routes/contact.routes'));

// Create HTTP server instance
const server = http.createServer(app);

// Socket.io setup with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Example socket event listener
  socket.on('sendMessage', (message) => {
    console.log('Received message:', message);
    // Broadcast message to all connected clients
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
