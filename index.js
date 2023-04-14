const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);


io.on('connection',(socket) => {
    // console.log('A user connected',socket.id);
     socket.on('msg_send',(data)=>{
         console.log(data);
         //io.emit('msg_rcvd',data);
         //socket.emit('msg_rcvd',data);
         socket.broadcast.emit('msg_rcvd',data);
     });
 });


app.use('/',express.static(__dirname+'/public'));

server.listen(3000,()=> {
    console.log('Server Started');
})