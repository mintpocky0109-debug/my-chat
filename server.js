const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// index.html 파일을 절대 경로로 안전하게 보내기
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('유저 접속됨');

  socket.on('chat message', (msg) => {
    // 받은 메시지를 나를 포함한 모두에게 다시 쏘기
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('유저 나감');
  });
});

// Render가 주는 포트를 우선으로 사용
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`서버 실행 중... 포트: ${PORT}`);
});