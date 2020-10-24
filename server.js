const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

server.listen(3000);

app.use(express.static(path.join(__dirname, 'public')));

let connecteUsers = [];

io.on('connection', (socket) => {
    console.log("Conexão detectada...");

socket.on('join-request', (username) => {
    socket.username = username;
    connecteUsers.push( username );
    console.log( connecteUsers );

    socket.emit('user-ok', connecteUsers);
});

});