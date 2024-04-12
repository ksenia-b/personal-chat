import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from 'socket.io';
import ChatRoute from "./routes/chat.route.js";
import AuthRoute from "./routes/auth.route.js";

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
        // send all active users to new user
        io.emit("get-users", activeUsers);
    });
});

// app.get('/', (req, res) => {
//     res.send('Hello world');
// });

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", AuthRoute);
app.use("/chat", ChatRoute);


server.listen(4000, () => console.log('Server is running on port 4000'));


