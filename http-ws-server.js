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

function convertToBinary1 (number) {
  let num = number;
  let binary = (num % 2).toString();
  for (; num > 1; ) {
      num = parseInt(num / 2);
      binary =  (num % 2) + (binary);
  }
  return binary;
}

function decode(data) {
  let FIN = data[0] >> 7 == 1;
  let RSV1 = (data[0] >> 6 & 1) == 1;
  let RSV2 = (data[0] >> 5 & 1) == 1;
  let RSV3 = (data[0] >> 4 & 1) == 1;
  let OPCODE = data[0] & 0xf;

  console.log('FIN, RSV1, RSV2, RSV3, OPCODE', convertToBinary1(data[0]))
  console.log(FIN, RSV1, RSV2, RSV3, OPCODE)
  console.log()
  
  const IS_MASK = data[1] >> 7 == 1;
  const PAYLOAD_LENGTH = data[1] & 0x7f;

  console.log(`IS_MASK: ${IS_MASK}, PAYLOAD_LENGTH: ${PAYLOAD_LENGTH}`)

  const MASK = data.slice(2, 6);
  const payload = data.slice(8);
  console.log('mask', MASK)
  console.log('payload', payload)
   
  const buffer = Buffer.alloc(PAYLOAD_LENGTH); //  payload 저장용 버퍼생성

  for (let i = 0 ; i < PAYLOAD_LENGTH ; i++) {
    buffer[i] = data[6 + i] ^ MASK[i % 4]
  }

  return buffer.toString('utf-8')
}

function encode(msg) {
  const RES_PAYLOAD_LENGTH = msg.length.toString(2).padStart(8, 0); // 2진수 변환

  const responseBuffer =  Buffer.concat([
    // FIN(1), RSV1(0), RSV2(0), RSV3(0), OPCODE(0001) 
    // 10000001 => 81
    Buffer.from('81'.toString(16), 'hex'),
    // mask + payload_length 서버 -> 클라이언트 시 mask는 0이므로 payload 길이만 가지고 만든다.
    Buffer.from(parseInt(RES_PAYLOAD_LENGTH, 2).toString(16).padStart(2, 0), 'hex'), 
    // 페이로드 메시지 인코딩(UTF-8)
    Buffer.from(msg)
  ])

  return responseBuffer;
}

const server = http.createServer(function (req, res) {
  console.log('123')
});

server.on("upgrade", function (req, socket, head) {
  console.log(req.headers)
  let headersReturn = handshakeMsg(req.headers["sec-websocket-key"])
  socket.write(headersReturn);

  socket.on('data', (data) => {
    console.log('========= dataframe parse start =========')
    console.log(data)
    console.log('decode: ', decode(data));
    const msgBuffer = encode('abcdefghijk');

    console.log('encode: ', msgBuffer);
    socket.write(msgBuffer)
    socket.write(msgBuffer)
    console.log('========= dataframe parse end =========')
  })
});

server.listen(5000, function () {
  console.log("server is on 5000");
});