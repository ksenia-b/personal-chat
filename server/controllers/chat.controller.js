import {db} from '../firebase.js';

import {collection, getDocs} from "firebase/firestore";


export const userChats = async (req, res) => {
    let users = {}
    console.log("trying to get user chats...", req)
    try {
        const data = await getDocs(collection(db, "users"));
        data.forEach((doc) => {
            console.log("doc.id ", doc.id)
            const result = {
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description
            };
           users = [...users, result]

            console.log('users = : ', users)
        });



        res.status(200).json({"done": "ok"});
    } catch (error) {
        res.status(500).json(error);
    }
};
