const dgram = require('dgram');
const toHost = '0.0.0.0';
const toPort = 5000;
const client = dgram.createSocket('udp4');
 
const data = Buffer.from('mung');
 
client.send(data, toPort, toHost, (err) => {
  if (err) console.log(err);
  else console.log('ok');
  client.close();
});