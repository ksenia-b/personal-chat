import {useState, useEffect} from "react";
import socketFunctions from "../../utils/socket";
const ChatPanel = ({selectedUser, currentUser, users}) => {
    console.log("selectedUser = ", selectedUser, " currentUser = ", currentUser)
    const [messages, setMessages] = useState([]);

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

    return (
        <div className={"right-chat w-[60%] bg-gray-300 p-4"}>
            <div className="chat-pannel">
                <div>
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
                </div>

            </div>
        </div>
    )
}

export default ChatPanel;