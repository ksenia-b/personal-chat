import express from 'express';
import cors from "cors";
import http from "http";
import { Server } from 'socket.io';

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
            console.log("New User Connected", activeUsers);
            // updateMessageStatus({
            //     userId: newUserId,
            //     status: "delivered",
            // });
        }
        // send all active users to new user
        io.emit("get-users", activeUsers);
    });
});



app.get('/', (req, res) => {
    res.send('Hello world');
});

server.listen(4000, () => console.log('Server is running on port 4000'));



