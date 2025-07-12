const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // 리액트 개발 서버 주소
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // 새로운 유저 입장을 모든 클라이언트에게 알림
  io.emit('user-enter', `새로운 유저(${socket.id.substring(0, 5)})가 입장했습니다.`);

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    // 유저 퇴장을 모든 클라이언트에게 알림
    io.emit('user-leave', `유저(${socket.id.substring(0, 5)})가 퇴장했습니다.`);
  });

  socket.on('chat message', (msg) => {
    console.log('message from ' + socket.id + ': ' + msg.text);
    // 메시지를 보낸 클라이언트를 제외한 모든 클라이언트에게 메시지 전송
    socket.broadcast.emit('chat message', { ...msg, id: socket.id });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server listening on port ${PORT}`);
}); 