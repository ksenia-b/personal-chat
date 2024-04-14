import {db} from '../firebase.js';

import {collection, getDocs} from "firebase/firestore";


export const user = async (req, res) => {
    let users = {}
    console.log("create users????", req)
};


export const getAllUsers = async (req, res) => {
    let users = []
    console.log("trying to get user chats...")
    try {
        const data = await getDocs(collection(db, "users"));
        data.forEach((doc) => {
            console.log("doc =  ", doc.data().dataF)
            const result = {
                id: doc.id,
                email: doc.data().dataF.email,
                uid: doc.data().dataF.uid,
                username: doc.data().dataF.username
            };
            users = [...users, result]


        });
        console.log('users = : ', users)


        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};
