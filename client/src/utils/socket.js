import io from 'socket.io-client';
// import { addMessage, getMessages } from "../api/message.requests";


const socket = io(import.meta.env.VITE_APP_SERVER_URL);

const socketFunctions = {

    connectSocket: (currentUser, setOnlineUsers) => {
        socket.emit("new-user-add", currentUser?.uid);
        socket.on("get-users", (users) => {
            console.log("get-users for currentUser, setOnlineUsers", users)
            setOnlineUsers(users);
        });

        const handleFocus = () => {
            socket.emit("new-user-add", currentUser?.uid);
        };

        const handleBlur = () => {
            if (currentUser) {
                socket.emit("offline");
            }
        };

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
        };
    },

    sendMessage: (message) => {
        if (message) {
            socket.emit("send-message", message);
        }
    },

    receiveMessage: (setReceivedMessage, chatId) => {
        socket.on("recieve-message", (data) => {
            if (data.chatId === chatId) {
                setReceivedMessage(data);
            }
        });
    },
};

export default socketFunctions;
