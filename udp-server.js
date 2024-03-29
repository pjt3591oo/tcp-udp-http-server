const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const port = 5000;
 
server.on('message', (message, info) => {
  console.log(`message: ${message.toString()}`);
  console.log(`from address: ${info.address} port: ${info.port}`);
});
 
server.on('listening', () => {
  const address = server.address();
  console.log(`listening ${address.address}:${address.port}`);
});
 
server.bind(port);