const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();
client.connect('ws://localhost:5000');

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');

    connection.on('message', function(message) {
        console.log(message)
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            const data0 = {a: 10};
            console.log('send data', data0)
            // connection.send(JSON.stringify(data0))
            connection.emit('test', 'test');
            setTimeout(sendNumber, 3000);
        }
    }
    sendNumber();
});

