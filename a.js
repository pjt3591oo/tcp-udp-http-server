const net = require('net');
const crypto = require('crypto');

function handshakeMsg(msg) {
  const websocketKey = msg.split('\n').find(item => item.includes('Sec-WebSocket-Key'));
  const secWebsocketAccept = websocketKey.split(': ')[1].replace('\n', '').replace('\r', '');
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

const server = net.createServer(socket => {
  console.log(`cnnected address: ${socket.address().address}`);
  socket.on('data', (data) => { 
    
    console.log('====== handshake start ===== ')
    console.log('request headers')
    console.log(data.toString());

    const msg = handshakeMsg(data.toString());
    console.log('response headers')
    console.log(msg)
    socket.write(msg)
    console.log('====== handshake end ===== ')
  
  });
})

server.listen(5000, function() {
  console.log(`listen on port 5000`)
})