
const express = require('express')
const http = require('http')
const socketIO = require('socket.io');
const mongoose = require('mongoose')
const port = 5000;
let rooms = {}
let language
let value
const app = express()
app.use(express.json());
var cors = require('cors');
app.use(cors())
require('./models/Users');
app.use(require('./routes/auth'));
app.use(require('./routes/userRooms'))
const server = http.createServer(app)
// Create a socketIO server
const io = socketIO(server, {
    cors: {
        origin: "*",
    },
});
let roomname

const dbURI = "mongodb+srv://Abhinav:abhinav@cluster0.fg6uh.mongodb.net/code-collab?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => { console.log(err) });

io.on("connection", (socket) => {
    // const { id } = socket.client
    console.log(`User connected`, socket.id)

    socket.on('join-room', ({ room }) => {
        console.log(room);
        roomname = room
        const present = room in rooms
        if (!present) {
            rooms[room] = {
                language: 'javascript',
                value: ''
            }
        }
        socket.join(room)
        console.log(rooms)
        
        language = rooms[roomname].language
        value = rooms[roomname].value
        io.to(socket.id).emit('initial-language', language)
        io.to(socket.id).emit('initial-value', value)
        socket.on('language-change', (data) => {
            // console.log(data);
            socket.broadcast.to(data.room).emit('language-change', data.language)
            language = data.language
            rooms[data.room].language = language
        })

        socket.on('value-change', (data) => {
            // console.log(data)
            socket.broadcast.to(data.room).emit('value-change', data.message)
            value = data.message
            rooms[data.room].value = value
            console.log(rooms)
        })

        socket.on('message', (data) => {
            //send message to the same room
            io.to(room).emit('create-message', data)
        });

        socket.on('disconnect', () => {
            // io.socket.removeAllListeners()
            console.log('User disconnected', socket.id);
        })
    })
});


if (process.env.NODE_ENV == "production") {
    app.use(express.static('Client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'))
    })
}

server.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))
