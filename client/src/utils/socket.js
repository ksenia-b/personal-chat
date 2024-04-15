import io from 'socket.io-client';
import { getMessages } from "../api/message.requests";


const socket = io(import.meta.env.VITE_APP_SERVER_URL);

const socketFunctions = {

    connectSocket: (currentUser, setOnlineUsers) => {
        socket.emit("new-user-add", currentUser?.uid);
        socket.on("get-users", (users) => {
            console.log("get-users for currentUser, setOnlineUsers", users)
            setOnlineUsers(users);
        });

        // Listen for new user registrations
        socket.on('registered-user', (userData) => {
            // Add the new user to the online users list
            setOnlineUsers(prevUsers => [...prevUsers, userData]);
        });

        const handleFocus = () => {
            socket.emit("new-user-add", currentUser?.uid);
            socket.emit("registered-user", currentUser?.uid)
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

    fetchMessages: async (user, chat, setMessages) => { // or selectedUser.uid
        // currentUser.uid, selectedUser.uid, setMessages
        try {
            console.log(user,", fetch messags, chat =  ", user, chat)
            if(user) {
                const { data } = await getMessages({currentUser: user, chatId: chat });
                console.log("data for get messages = ", data)
                setMessages(data);

                // Mark the last message as seen if it's from another user
                // let lastMessage = data[data.length - 1];
                // if (lastMessage?.senderId !== currentUser) {
                //     socket.emit("message-seen-status", {
                //         userId: user._id,
                //         status: "",
                //     });
                // }
            }
        } catch (error) {
            console.log(error);
        }
    },

    sendMessage: (message) => {
        console.log("socket.io clint send-message, message = ", message)
        if (message) {
            socket.emit("send-message", message);
        }
    },

    receiveMessageFromParent: (receivedMessage, chat, setMessages, currentUser, messages) => {
        console.log("Message Arrived: ", receivedMessage);
        if (receivedMessage !== null && receivedMessage?.receiver === chat) {
            setMessages([...messages, receivedMessage]);

            socket.emit("message-seen-status", receivedMessage);
        }
    },
    receiveMessage: (setReceivedMessage, chatId) => {
        console.log("receiveMessage ", chatId);
        socket.on("recieve-message", (data) => { // .on?
            console.log("recieve-message...", data)
            if (data.chatId === chatId) {
                setReceivedMessage(data);
            }
        });
    },
};

export default socketFunctions;
