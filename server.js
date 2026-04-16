const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 사용자가 내 사이트(localhost:3000)에 접속하면 index.html 파일을 보여줘라
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 실시간 무전기(socket.io)가 연결되었을 때
io.on('connection', (socket) => {
  console.log('어떤 유저가 채팅방에 들어왔어요!');

  // 누군가 'chat message'라는 이름으로 신호를 보내면
  socket.on('chat message', (msg) => {
    // 모든 사람에게 그 내용을 전달해라
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`서버가 실행 중입니다! (포트: ${PORT})`);
});