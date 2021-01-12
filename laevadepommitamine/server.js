const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
const port = 8000

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/public/chat.html')
})

io.on('connection', (socket) => {
    socket.on('chatMessage', msg => {
        console.log(socket.id + ': ' + msg)
        io.emit('chatMessage', {'userId': socket.id, 'message': msg})
    })
    //console.log('user connected' + socket.id)
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
app.use('/js', express.static('./public/js/'))
