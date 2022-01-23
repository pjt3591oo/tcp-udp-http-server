const http = require('http');
const url = require('url');

const server = http.createServer( (req, res) => {
  console.log(req.method)
  console.log(req.url)
  res.writeHead(200);
  if (req.method === 'GET' && req.url === '/') {
    return res.end('mung ');
  } else{
    return res.end('mung mung');
  }
});

server.listen(5000)