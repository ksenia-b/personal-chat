import io from 'socket.io-client';
// import { addMessage, getMessages } from "../api/message.requests";


const socket = io(import.meta.env.VITE_APP_SERVER_URL);

const socketFunctions = {

    connectSocket: (user, setOnlineUsers) => {
        socket.emit("new-user-add", user?._id);
        socket.on("get-users", (users) => {
            setOnlineUsers(users);
        });

        const handleFocus = () => {
            socket.emit("new-user-add", user?.id);
        };

        const handleBlur = () => {
            if (user) {
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

    receiveUpload: (setReceivedMessage, chatId) => {
        socket.on("receive-upload", (data) => {
            if (data.chatId === chatId) {
                setReceivedMessage(data);
            }
        });
    },

    sendTyping: (user, chat, currentUser) => {
        const receiver = chat.members.find((id) => id !== currentUser);
        socket.emit("typing", {
            // EN
            // 'typer' variable is for displaying a message like "John typing..."

            // TR
            // 'typer' degiskeni "John yaziyor..." gibi bir mesaj goruntilemek icindir.
            typer: user.firstname,
            receiverId: receiver,
        });
    },

    fetchMessages: async (user, chat, setMessages, currentUser) => {
        // try {
        //     if(chat) {
        //
        //         const { data } = await getMessages(chat._id);
        //         setMessages(data);
        //
        //         var lastMessage = data[data.length - 1];
        //         if (lastMessage?.senderId !== currentUser) {
        //             socket.emit("message-seen-status", {
        //                 chatId: chat._id,
        //                 userId: user._id,
        //                 status: "",
        //             });
        //         }
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    },

    fetchTyping: (setTyping) => {
        socket.on("get-typing", (data) => {
            setTyping(data.typer + " is typing..");

            // Clear the typing status after 2 seconds
            setTimeout(() => {
                setTyping("");
            }, 2000);
        });
    },

    receiveMessageFromParent: (receivedMessage, chat, setMessages, currentUser, messages) => {
        console.log("Message Arrived: ", receivedMessage);
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);

            socket.emit("message-seen-status", receivedMessage);
        }
    },

    handleFileSelect: async (event, chat, setSelectedFile, setMessages, currentUser, setNewMessage, messages) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const receiverId = chat.members.find((id) => id !== currentUser);
        socket.emit("upload", {
            file,
            receiverId,
            chatId: chat._id,
            createdAt: new Date(),
        });

        // try {
        //     const { data } = await addMessage({
        //         chatId: chat._id,
        //         senderId: currentUser,
        //         file: file,
        //     });
        //     setMessages([...messages, { ...data, createdAt: new Date() }]);
        //     setNewMessage("");
        // } catch {
        //     console.log("error");
        // }
    },
};

export default socketFunctions;
