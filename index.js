const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()

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
    socket.on('send message', (msg) => {
        socket.broadcast.emit('sent message', msg)
    })
    socket.on('disconnect', () => {
        // console.log('user disconnected', socket.id)
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

//Database Setup
const diskdb = require('diskdb');
const db = diskdb.connect('./data', ['messages', 'users']);

//Database Helpers

//switches the online property on/off
const changeOnlineStatus = req => {
    return db.users.update({id:req.body.id}, {online:!req.body.online})
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
    changeOnlineStatus(req)

    res.json(db.users.find({id:req.body.id}))
})

app.post('/messages', cors(corsOptions), (req, res) => {
    const data = db.messages.save(req.body)
    res.json(data)
})

