const net = require('net');

const server = net.createServer(socket => {
  console.log(`cnnected address: ${socket.address().address}`);
  socket.on('data', (data) => { 
    console.log('====== receive data======='); 
    const httpMsg = `
HTTP/1.1 200 Success
Connection: close
Content-Length: 1573
Content-Type: text/html; charset=UTF-8
Keep-Alive: timeout=5, max=100
Date: Sun, 23 Jan 2022 07:59:05 GMT

<!DOCTYPE html>
<html lang=en>
  <meta charset=utf-8>
  <meta name=viewport content="initial-scale=1, minimum-scale=1, width=device-width">
  <title>Wow!!!!</title>
  <body>
    <h1>test</h1>
  </body>
</html>
`

    console.log(data.toString());
    socket.write(httpMsg)
    console.log('====== receive data======='); 
    // socket.end();
  });
})

server.listen(5000, function() {
  console.log(`listen on port 5000`)
})