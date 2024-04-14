import {useState, useEffect} from "react";
import socketFunctions from "../../utils/socket";
import {addMessage} from "../../api/message.requests.js";

const ChatPanel = ({selectedUser, currentUser, users}) => {
    console.log("selectedUser = ", selectedUser, " currentUser = ", currentUser)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (selectedUser?.uid) {
            socketFunctions.fetchMessages(currentUser.uid, selectedUser.uid, setMessages)
                // .then(messages => { console.log("messages = ", messages); setMessages(messages)})
                .catch(error => {
                    console.error('Error fetching messages:', error);
                    setMessages([]); // Handle error by setting messages to an empty array
                });
        }
    }, [selectedUser.uid, currentUser]);

    const findUsername = (userId) => {
        const receiverUser = users.find(user => user.uid === userId);
        console.log("messages.receiver = ", receiverUser)
        return  receiverUser?.username

    };

    const handleChange = (newMessage) => {
        setNewMessage(newMessage.target.value);
    };

    // const handleSend = async (e) => {
    //     e.preventDefault();
    //     const message = {
    //         sender: currentUser.uid,
    //         message: newMessage,
    //         receiver: selectedUser.uid,
    //         createdAt: new Date(),
    //         status: "",
    //     };
    //     console.log("handleSend = ", message)
    //     // const receiverId = chat.members.find((id) => id !== currentUser);
    //     // // send message to socket server
    //     // setSendMessage({ ...message, receiverId, createdAt: new Date() });
    //     // setSelectedFile(null);
    //     // // send message to database
    //     try {
    //         const { data } = await addMessage(message);
    //         setMessages([...messages, data]);
    //         setNewMessage("");
    //     } catch {
    //         console.log("error");
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: currentUser.uid,
            message: newMessage,
            receiver: selectedUser.uid,
            createdAt: new Date(),
            status: "",
        };
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        } catch (error) {
            console.error("Error adding message:", error);
        }
    };

    return (
        <div className={"right-chat w-[60%] bg-gray-300 p-4"}>
            <div className="flex flex-col h-full">
                <div className={"flex-grow"}>
                    <span>Chat with {selectedUser.uid &&
                        <span className={"text-green-600"}>{selectedUser.username}</span>}</span>
                    <div className="px-2 py-4">
                        {
                            messages && messages.length > 0  ? messages.map(item => (
                            <div key={item.id} className="bg-gray-100 rounded-lg p-4 mb-4">
                                <div className="text-blue-800 font-semibold">{findUsername(item?.receiver)}:</div>
                                <div className="text-gray-800 italic">{item?.message}</div>
                            </div>
                            )) : <div className={"italic"}>No messages yet...</div>
                        }
                    </div>
                </div>
                <div>
                    Write a message:
                    <form onSubmit={handleSubmit}>
                        <div className="chat-sender flex-grow">
                            <input
                                id="inputMessage"
                                value={newMessage}
                                onChange={handleChange}
                                placeholder="Message"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button
                            onClick={() => handleSend()}
                            className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Send
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ChatPanel;