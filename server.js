const express = require('express')
const http = require('http')
const socketIO = require('socket.io');
const port = 5000;
let language='javascript'
let value=''
const app = express()
const server = http.createServer(app)
// Create a socketIO server
const io = socketIO(server, {
    cors: {
        origin: "*",
    },
});

// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// var usernames = {};
// var rooms = [];
// Triggered whenever a user joins and websocket
// handshake is successfull
io.on("connection", (socket) => {
    // const { id } = socket.client
    console.log(`User connected`,socket.id)

    io.to(socket.id).emit('initial-language',language)
    io.to(socket.id).emit('initial-value',value)
    socket.on('language-change',(data)=>{
        console.log(data);
        socket.broadcast.emit('language-change',data)
        language=data
    })
    socket.on('value-change',(data)=>{
        console.log(data)
        socket.broadcast.emit('value-change',data)
        value=data
    })
    // socket.on('join-room', ({ name, room }, callback) => {
    //     //console.log("JOINING " + msg)
    //     socket.room = room
    //     socket.join(room)
    //     console.log(socket.room)
    //     socket.broadcast.to(room).emit('joined-room', { name, room });
    // })

    // // If code changes, broadcast to sockets
    // socket.on('code-change', msg => {
    //     socket.broadcast.to(socket.room).emit('code-update', msg)

    // })


    // // If language changes, broadcast to sockets
    // socket.on('language-change', msg => {
    //     console.log(msg)
    //     socket.broadcast.to(socket.room).emit('language-update', msg)
    // })

    // // If connection is lost
    // socket.on('disconnect', () => {
    //     console.log(`user ${id} disconnected`)
    // })

    // socket.on('disconnecting', () => {
    //     try {
    //         let room = io.sockets.adapter.rooms[socket.room]
    //     }
    //     catch (error) {
    //         console.log("Disconnect error")
    //     }

    // })

});

server.listen(port, () => console.log(`Listening on port ${port}`))