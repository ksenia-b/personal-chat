import {useState, useEffect} from "react";
import socketFunctions from "../../utils/socket";
const ChatPanel = ({selectedUser, currentUser}) => {
    console.log("selectedUser = ", selectedUser, " currentUser = ", currentUser)
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (selectedUser?.uid) {
            socketFunctions.fetchMessages(currentUser.uid, selectedUser.uid, setMessages)
                .then(messages => setMessages(messages))
                .catch(error => {
                    console.error('Error fetching messages:', error);
                    setMessages([]); // Handle error by setting messages to an empty array
                });
        }
    }, [selectedUser.uid, currentUser]);

    return (
        <div className={"right-chat w-[60%] bg-gray-300 p-4"}>
            <div className="chat-pannel">
                <div>
                    <span>Chat with {selectedUser.uid && <span className={"text-green-600"}>{selectedUser.uid}</span>}</span>
                    <div>
                        messages:

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatPanel;