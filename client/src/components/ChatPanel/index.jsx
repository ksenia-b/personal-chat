import {useState, useEffect} from "react";
import socketFunctions from "../../utils/socket";
import {addMessage} from "../../api/message.requests.js";

const ChatPanel = ({selectedUser, currentUser, users, receivedMessage, setSendMessage}) => {
    // console.log("selectedUser = ", selectedUser, " currentUser = ", currentUser)
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

    // useEffect(() => {
    //     socketFunctions.receiveMessageFromParent(
    //         receivedMessage,
    //         selectedUser.uid, //chat
    //         setMessages,
    //         currentUser,
    //         messages
    //     );
    // }, [receivedMessage]);

    const findUsername = (userId) => {
        return  users.find(user => user.uid === userId)?.username;
    };

    // const handleChange = (newMsg) => {
    //     console.log("handle change...", newMsg.target.value);
    //     setNewMessage([
    //         // ...newMessage, // Copy existing messages
    //         {
    //             sender: currentUser.uid,
    //             message: newMsg.target.value,
    //             receiver: selectedUser.uid,
    //             createdAt: new Date(),
    //             status: ""
    //         }
    //     ]);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage){
            return null;
        }

        const message = {
            sender: currentUser.uid,  // TODO get user info on the server
            message: newMessage,
            receiver: selectedUser.uid
        };

        try {

            setNewMessage('');
            const { data } = await addMessage(message);
            setMessages([...messages, data]); // my?

            socketFunctions.sendMessage(data);
        } catch (error) {
            console.error("Error adding message:", error);
        }
    };

    // useEffect(() => {
    //     console.log("useEffect newMessage -> ", newMessage)
    //     socketFunctions.sendMessage({
    //         ...newMessage
    //     });
    // }, [newMessage]);

    return (
        <div className={"right-chat w-[60%] bg-gray-300 p-4"}>
            {selectedUser?.uid &&
                <div className="flex flex-col h-full">
                    <div className={"flex-grow"}>
                    <span>Chat with {selectedUser.uid &&
                        <span className={"text-green-600"}>{selectedUser.username}</span>}</span>
                        <div className={`px-2 py-4`}>

                        {
                                messages && messages.length > 0 ? messages.map(item => (
                                    <div key={item?.id}
                                         className={`my-4  rounded-lg ${item?.sender === currentUser?.uid ? "text-left w-[350px]" : "text-right"}`}>
                                        <div className="bg-white w-300  rounded-lg px-8 py-4">
                                            <div className="bg-white-800  rounded-lg">
                                            <span
                                                className={"text-blue-800 font-semibold "}>{findUsername(item?.sender)} </span>
                                                {item?.sender && <span
                                                    className={item?.sender === currentUser.uid ? "text-black-500 italic text-xs" : ""}>
        {item?.sender === currentUser.uid && "(you)"}     </span>}

                                            </div>
                                            <div className="text-gray-800 italic">{item?.message}</div>
                                        </div>
                                    </div>
                                )) : <div className={"italic"}>No messages yet...</div>
                        }
                        </div>
                    </div>
                    <div>
                        Write a message:
                        <form onSubmit={handleSubmit} className={"flex flex-row gap-4"}>
                            <div className="chat-sender flex-grow">
                                <input
                                    id="inputMessage"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Message"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button>
                                Send
                            </button>
                        </form>
                    </div>

                </div>
            }

        </div>
    )
}

export default ChatPanel;