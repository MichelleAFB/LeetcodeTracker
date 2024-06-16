const io = require('socket.io')();
console.log("SOCKET ON")
io.on('connection', client => { 
    socket.emit("welcome","You are connected to the socket")
    console.log("CONNECTED")
    socket.on("message",(data)=>{
        console.log("incoming message",data)
    })
 });
io.listen(3032);
module.exports={io}