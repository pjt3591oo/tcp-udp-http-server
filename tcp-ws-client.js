const net = require('net');

// 서버 5000번 포트로 접속 
// TCP level: 3 way-handshake
const socket = net.connect({ port: 5000 });

let isHandshake = false;

socket.on('connect', function () {
  console.log('connected to server!');
  
  const msg = [
    'GET / HTTP/1.1\r\n',
    'Connection: Upgrade\r\n',
    'Upgrade: websocket\r\n',
    'Sec-WebSocket-Version: 13\r\n',
    'Sec-WebSocket-Key: s+92vaV9BEsiNRk0rVmKDA==\r\n',
    'Host: localhost:5000\r\n',
    '\r\n'
  ].join('')

  // HTTP level: 2 way-handshake
  socket.write(msg);

  setInterval(() => {
    if (isHandshake) { // handshake 되었을 때만 실행
      socket.write(); // TODO: 인코딩
    }
  }, 1000);
});

// 서버로부터 받은 데이터를 화면에 출력 
socket.on('data', function (data) {
  // TODO: 디코딩 필요
  // 핸드쉐이크 응답과 dataframe을 전달받음
  console.log(data); 
});

// // 접속이 종료됬을때 메시지 출력 
// // 4 way-handshake
// socket.on('end', function () {
//   console.log('disconnected.');
// });

// // 에러가 발생할때 에러메시지 화면에 출력 
// socket.on('error', function (err) {
//   console.log(err);
// });

// // connection에서 timeout이 발생하면 메시지 출력 
// socket.on('timeout', function () {
//   console.log('connection timeout.');
// });

