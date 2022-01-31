const express = require('express')
const http = require('http')
const app = express()
const { Server } = require('socket.io')

const server = http.createServer(app)

const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3001
const origin = process.env.ORIGIN || "http://localhost:3000"
const io = new Server(server, {
    cors: {
      origin
    }
  });

app.use(cors({origin}))
const corsOptions = {origin}


io.on('connection', (socket) => {
    socket.emit("connect user", socket.id)

    socket.on('send message', (msg) => {
        socket.broadcast.emit('sent message', msg)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
        changeToOffline(socket.id)
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

//Database Setup
const diskdb = require('diskdb');
const db = diskdb.connect('./data', ['messages', 'users']);

//Database Helpers

//switches the online property to off
const changeToOffline = socketId => {
    db.users.update({socketId:socketId}, {online:false})
}

const connectUser = (user) => {
    db.users.update({id:user.id}, {online:true, socketId:user.socketId})
}

//CRUD Routes
app.get("/messages", cors(corsOptions), (req, res) => {
    const messages = db.messages.find()
    res.json(messages)
})

app.get("/users", cors(corsOptions), (req, res) => {
    const users = db.users.find()
    res.json(users)
})

app.patch("/users/:id", cors(corsOptions), (req, res) => {
    connectUser(req.body)
    res.json(db.users.find({id:req.body.id}))
})

app.post('/messages', cors(corsOptions), (req, res) => {
    const data = db.messages.save(req.body)
    res.json(data)
})

// module.exports({app})
