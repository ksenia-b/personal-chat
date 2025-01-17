import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from 'socket.io';
import ChatRoute from "./routes/chat.route.js";
import AuthRoute from "./routes/auth.route.js";
import UserRoute from "./routes/user.route.js";
import MessageRoute from "./routes/message.route.js";

const app = express();
app.use(cors());
const server = http.createServer(app);

let activeUsers = [];

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});



io.on("connection", (socket) => {

    // add new User
    socket.on("new-user-add", (newUserId) => {
        console.log("new-user-add, new-user-add = ", newUserId)
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
            console.log("New User Connected, activeUsers = ", activeUsers);
            // updateMessageStatus({
            //     userId: newUserId,
            //     status: "delivered",
            // });
        }

        // socket.to(newUserId).emit('receive_message', {
        //     message: "message",
        //     userName: 'CHAT_BOT',
        //     avatar: '',
        //     createdAt: serverTimestamp(),
        //     chatId: "1",
        //     uid: '',
        //     __createdtime__
        // });

        // send all active users to new user
        io.emit("get-users", activeUsers);

    });

    // add new User Registered
    socket.on("registered-user", (userId) => {
        console.log("registered-user ", userId)
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === userId)) {
            activeUsers.push({ userId: userId, socketId: socket.id });
            console.log("New User Connected, activeUsers = ", activeUsers);
            // updateMessageStatus({
            //     userId: newUserId,
            //     status: "delivered",
            // });
        }
        // send all active users to new user
        io.emit("get-users", activeUsers);
    });


    socket.on("offline", () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        // send all active users to all users
        io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected, activeUsers", activeUsers);
        // send all active users to all users
        io.emit("get-users", activeUsers);
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
        const { receiver } = data;
        console.log("Data in send-message: ", data)
        const user = activeUsers.find((user) => user.userId === receiver);
        console.log("Sending from socket to user = ", user, " receiverId = ", receiver);
        data.status = "sent";

        if (user) {
            io.to(user.socketId).emit("receive-message", data);
        }
        console.log("---------------------------------------");
    });

});

// app.get('/', (req, res) => {
//     res.send('Hello world');
// });

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", UserRoute);
app.use("/auth", AuthRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);


server.listen(4000, () => console.log('Server is running on port 4000'));


