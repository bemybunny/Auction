const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection',(socket)=>{
    console.log('a user connected')
    socket.on('join_room',room=>{
        socket.join(room);
    }) 
})

server.listen(4000,()=>{
    console.log('server is running at 4000')
})
