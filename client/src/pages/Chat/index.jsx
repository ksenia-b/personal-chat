import { useEffect, useState, useContext } from "react";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext";

const Chat = () => {
    const {currentUser, socket} = useContext(AuthContext)

    // Get the chat in chat section
    useEffect(() => {
        const getChats = async () => {
            try {
                // const { data }  = await getChats(user?._id);
                // setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [currentUser?.uid]);

    return (
        <>
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