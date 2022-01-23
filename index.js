const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()

const server = http.createServer(app)

const cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3001
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  });
app.use(cors({
    origin:"http://localhost:3000"
}))
const corsOptions = {
    origin:"http://localhost:3000"
}

  
  io.on('connection', (socket) => {
      socket.on('send message', (msg) => {
          socket.broadcast.emit('sent message', msg)
        })
        socket.on('disconnect', () => {

        })
    })
    
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })

    //Database + CRUD
const diskdb = require('diskdb');
const db = diskdb.connect('./data', ['messages', 'users']);

const changeOnlineStatus = req => {
    return db.users.update({id:req.body.id}, {online:!req.body.online})
}

//CRUD Routes
app.get("/messages", (req, res) => {
    const messages = db.messages.find()
    // console.log("get request activated!")
    res.json(messages)
})

app.get("/users", (req, res) => {
    res.json(db.users.find())
})

app.patch("/users/:id", cors(corsOptions), (req, res) => {
    console.log(req.body)
    changeOnlineStatus(req)
})

app.post('/messages', cors(corsOptions), (req, res) => {
    console.log('post hit!')
    console.log(req.body)
    const data = db.messages.save(req.body)
    res.json(data)
})

