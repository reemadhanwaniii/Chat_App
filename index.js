const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);


app.use('/',express.static(__dirname+'/public'));

io.on('connection',(socket) => {
    console.log('A user connected',socket.id);

    socket.on('from_client',() => {
        console.log('Event coming from client');
    });

    setInterval(()=>{
        socket.emit('from_server');
    },2000);
});

server.listen(3000,()=> {
    console.log('Server Started');
})