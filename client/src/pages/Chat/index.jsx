import { useEffect, useState, useContext } from "react";
// import {onAuthStateChanged} from 'firebase/auth';
// import {auth} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext";
import socketFunctions from "../../utils/socket";
import {userChats} from "../../api/chats.js";
import MainNav from "../../components/MainNav/index.jsx";

const Chat = () => {
    const {currentUser} = useContext(AuthContext);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        socketFunctions.connectSocket(currentUser, setOnlineUsers);
    }, [currentUser]);

    useEffect(function getChatsForCurrentUser () {
        const getChats = async () => {
            try {
                const { data } = await userChats(currentUser?.uid);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [currentUser?.uid]);

    useEffect(() => {
        const getChats = async () => {
            try {
                // const { data }  = await getChats(user?._id);
                // setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        // getChats();
    }, [currentUser?.uid]);

    useEffect(() => {
        socketFunctions.connectSocket(currentUser); // setOnlineUsers
    }, [currentUser]);

    return (
        <>
            <MainNav/>
            <div className={"left-chat"}>
                <div className="chat-panell">
                    <h2>Chat list for user: {`${currentUser.email}`}</h2>
                    <div>

                    </div>
                </div>
            </div>
            <div className={"right-chat"}>
                <div className="chat-pannel">
                    <h2>Chat panel</h2>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default Chat;