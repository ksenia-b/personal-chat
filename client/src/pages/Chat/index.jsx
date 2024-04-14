import { useEffect, useState, useContext } from "react";
import { allUsers } from "../../api/user.requests.js";
import ChatPanel from "../../components/ChatPanel/index.jsx";
// import {onAuthStateChanged} from 'firebase/auth';
// import {auth} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext";
import socketFunctions from "../../utils/socket";
import {userChats} from "../../api/chats.js";
// import MainNav from "../../components/MainNav/index.jsx";

const Chat = () => {
    const {currentUser} = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
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
    }, [currentUser, onlineUsers]);

    useEffect(function connectSocketForCurrentUser(){
        console.log("useEffect(function connectSocketForCurrentUser() is running.")
        socketFunctions.connectSocket(currentUser, setOnlineUsers);
    }, [currentUser]);

    useEffect(() => {
        socketFunctions.sendMessage(sendMessage);
    }, [sendMessage]);

    const handleSelectedUser = (e) => {
        const clickedUsername = e?.target.textContent;

        const selectedUserId = users.find(user => user.username === clickedUsername)?.uid;
        console.log("selectedUserId ", selectedUserId);
            //users[users.username === e?.target.textContent];
        console.log("selectedUserId = ", selectedUserId)
        setSelectedUser({uid: selectedUserId, username: clickedUsername});
    }

    const checkOnlineStatus = (userId) => {
        return  onlineUsers.map(usr => usr.userId ).includes(userId);
    };

    return (
        <div className={"px-4 py-8"}>
            <div className={"flex flex-row justify-between "}>
                <div>You: <span className={"bg-gray-300"}>{`${currentUser.email}`}</span></div>
                {/*<MainNav/>*/}
            </div>

            <div className={"flex flex-row py-16 px-8"}>
            <div className={"left-chat w-[50%] bg-gray-200 p-4"}>
                    <div className="chat-panell">
                        <span>All users:</span>
                        <div className={"p-4 bg-white"}>
                            {

                                users.map(
                                    user => {
                                        return  (
                                            <div className={"flex flex-row h-8 items-center  cursor-pointer"}
                                                 onClick={handleSelectedUser}>
                                                {
                                                    checkOnlineStatus(user.uid) &&
                                                    (<div
                                                        className={"h-2 w-2 rounded-full bg-green-500 mr-2 text-center"}></div>)
                                                }
                                                {/*<div>{user?.uid === currentUser.uid ? `${user?.username} (you)` : user?.username} </div>*/}
                                                { <div>{user?.username}</div>}
                                            </div>
                                        )

                                    }
                                )
                            }

                        </div>
                    </div>
            </div>
              <ChatPanel selectedUser={selectedUser} currentUser={currentUser}/>
            </div>
        </div>
    )
}

export default Chat;