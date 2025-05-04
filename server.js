const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

// Setup Server
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Serve static files
app.use(express.static('public'));

io.on("connection", (socket) =>{
    console.log("A user connected");

    // Emit current time every second
    setInterval(()=>{
        const now = new Date()
        socket.emit("time", now)
    }, 1000)

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000");
});