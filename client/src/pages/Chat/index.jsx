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
    }, [currentUser, onlineUsers]);

    useEffect(function connectSocketForCurrentUser(){
        console.log("useEffect(function connectSocketForCurrentUser() is running.")
        socketFunctions.connectSocket(currentUser, setOnlineUsers);
    }, [currentUser]);

    useEffect(() => {
        socketFunctions.sendMessage(sendMessage);
    }, [sendMessage]);

    const handleSelectedUser = (e) => {
        console.log("handleSelectedUser, e = ", e);
        setSelectedUser(e?.target.textContent);
    }

    const checkOnlineStatus = (userId) => {
        return  onlineUsers.map(usr => usr.userId ).includes(userId);
    };
    // const getAllUsers = ()=> {
    //     // return ((onlineUsers.length > users.length)) ? onlineUsers : users;
    //     return onlineUsers
    // }
    // const shownUsers = getAllUsers()
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
                                            <div className={"flex flex-row h-8 items-center "}>
                                                {
                                                    checkOnlineStatus(user.uid) &&
                                                    ( <div className={"h-2 w-2 rounded-full bg-green-500 mr-2 text-center"}></div>)
                                                }
                                               <div>{user?.uid === currentUser.uid ? `${user?.username} (you)` : user?.username} </div>
                                            </div>
                                        )

                                    }
                                )
                            }

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