const http = require("http");
const crypto = require("crypto");

function handshakeMsg(msg) {
  const secWebsocketAccept = msg;
  const salt = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

  // sha1 해싱된 결과 base64 인코딩
  const sha1 = crypto.createHash('sha1')
  const hashing = sha1.update(secWebsocketAccept + salt).digest('base64');
  
  return 'HTTP/1.1 101 Switching Protocols\r\n' +
         'Upgrade: websocket\r\n' +
         'Connection: Upgrade\r\n' +
         'Sec-WebSocket-Accept: ' + hashing + '\r\n' +
         '\r\n';
}

const server = http.createServer(function (req, res) {});

server.on("upgrade", function (req, socket, head) {
  let headersReturn = handshakeMsg(req.headers["sec-websocket-key"])
  socket.write(headersReturn);
});

server.listen(5000, function () {
  console.log("server is on 5000");
});