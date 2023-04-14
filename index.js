const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const connect  = require('./config/database-config');

io.on('connection',(socket) => {
    socket.on('join_room', (data) => {
        console.log("joining a room", data.roomid)
        socket.join(data.roomid);
    });

     socket.on('msg_send',async (data)=>{
         io.to(data.roomid).emit('msg_rcvd',data);
     });
     
 });

app.set('view engine','ejs');

app.get('/chat/:roomid',(req,res)=>{
    res.render('index',{
        name: 'Reema',
        id: req.params.roomid
    });
})
app.use('/',express.static(__dirname+'/public'));

server.listen(3000,async ()=> {
    console.log('Server Started');
    await connect();
    console.log('mongodb connected');
})