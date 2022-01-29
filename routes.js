
const app = require('./index.js')
console.log(app.app)

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