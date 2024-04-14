import { useEffect, useState, useContext } from "react";
import { allUsers } from "../../api/user.requests.js";
// import {onAuthStateChanged} from 'firebase/auth';
// import {auth} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext";
import socketFunctions from "../../utils/socket";
import {userChats} from "../../api/chats.js";
// import MainNav from "../../components/MainNav/index.jsx";

const Chat = () => {
    const {currentUser} = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [users, setUsers] = useState([]);

    // Get the chat in chat section
    useEffect(function getAllUsersFromDB(){
        console.log("useEffect ----> getAllUsersFromDB is running...")
        const getUsers = async () => {
            try {
                const { data } = await allUsers();
                console.log("all users data = ", data);
                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, [currentUser.uid]);

    useEffect(function connectSocketForCurrentUser(){
        socketFunctions.connectSocket(currentUser, setOnlineUsers);
    }, [currentUser]);

    useEffect(() => {
        socketFunctions.sendMessage(sendMessage);
    }, [sendMessage]);

    const handleSelectedUser = (e) => {
        console.log("handleSelectedUser, e = ", e);
        setSelectedUser(e?.target.textContent);

    }
    return (
        <div className={"px-4 py-8"}>
            <div className={"flex flex-row justify-between "}>
                <div>You: <span className={"bg-gray-300"}>{`${currentUser.email}`}</span></div>
                {/*<MainNav/>*/}
            </div>

            <div className={"flex flex-row py-16 px-8"}>
            <div className={"left-chat w-[40%] bg-gray-200 p-4"}>
                    <div className="chat-panell">
                        <span>Users online:</span>
                        <div className={"p-4 bg-white"}>
                            <div  >
                                {onlineUsers.map(user => <div key={user?.userId} className={"pointer"} onClick={handleSelectedUser}>{(user.userId !== currentUser.uid) && user.userId}</div>)}
                            </div>
                        </div>
                    </div>
            </div>
                <div className={"right-chat w-[60%] bg-gray-300 p-4"}>
                    <div className="chat-pannel">
                        <div>
                            <span>Chat panel {selectedUser && `with user with id = ${selectedUser}`}</span>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;