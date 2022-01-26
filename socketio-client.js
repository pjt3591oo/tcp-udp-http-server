const { io } = require("socket.io-client");

const socket = io("ws://localhost:5000", {
  transports: ['websocket', 'polling'],
});

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on('message', (data) => {
  console.log(data)
})

// // console.log(Uint8Array.from([1, 2, 3, 4]))
// // console.log(Buffer.from([1, 2, 3, 4]))
// // console.log(Buffer.from('abc'))
// socket.on("connect", () => {
//   socket.send("Hello!");
//   socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
// });
// socket.emit('d', 'asdf');
// // handle the event sent with socket.send()
// socket.on("message", data => {
//   console.log(data);
// });