require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(()=> console.log('MongoDB connected'))
  .catch(err=> console.log(err));

// Example route
app.get('/api/health', (req, res)=> res.json({ status: 'ok' }));

// Socket.io
io.on('connection', socket => {
  console.log('User connected', socket.id);
  socket.on('taskUpdated', data => socket.broadcast.emit('taskUpdated', data));
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
