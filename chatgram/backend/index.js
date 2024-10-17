//mongodb://localhost:27017/chatgram?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const ChatMessage = require("./models/ChatMessages.js")
const Typing = require("./models/Typing.js")
const connectToMongo = require("./database.js")
connectToMongo();
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000
const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const onlineUsersMap = {}

const emitOnlineUsers = () => {
    console.log("backend");
    io.emit("OnlineIds",Object.keys(onlineUsersMap))
}

io.on('connection', (socket) => {
    socket.on("newuserConnected",(userId)=>{
        console.log("Signed Up or Loggged In");
        onlineUsersMap[userId] = socket.id
        console.log(onlineUsersMap);
        emitOnlineUsers()  
    })
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        const userId = Object.keys(onlineUsersMap).find(key => onlineUsersMap[key] === socket.id)
        delete onlineUsersMap[userId];
        console.log(onlineUsersMap);
        emitOnlineUsers()
    });
    socket.on("logoutuser",(socketId)=>{
        console.log("User Logged Out");
        const userId = Object.keys(onlineUsersMap).find(key => onlineUsersMap[key] === socketId)
        delete onlineUsersMap[userId];
        console.log(onlineUsersMap);
        emitOnlineUsers()
    })
});



// ==> all collection real time

const setupChangeStream = (collectionName, eventName) => {
    const changeStream = collectionName.watch();

    changeStream.on('change', (change) => {
        io.emit(eventName, change.fullDocument);
    });
};

setupChangeStream(Typing, 'typingdet');
setupChangeStream(ChatMessage, 'newMessage');



process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    server.close(() => {
        process.exit(1);
    });
});


//  routes of backend
app.use("/api/authentication", require("./routes/authentication"));
app.use("/api/fetchdatabase", require("./routes/FetchAllUser.js"));
app.use("/api/notifications", require("./routes/Notification.js"));
app.use("/api/friends", require("./routes/Friend.js"));
app.use("/api/messages", require("./routes/ChatMessage.js"));
app.use("/api/typing", require("./routes/Typingdet.js"));
app.use("/api/genai",require("./routes/genai.js"))
app.use("/api/photo",require("./routes/fetchthephoto.js"))