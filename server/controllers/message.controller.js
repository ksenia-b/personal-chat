import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase.js";

export const getMessages = async (req, res) => {
    const chatId  = req.query.chatId;
    const currentUser = req.query.currentUser;

    let messages = []
    console.log("trying to get messages...", chatId, currentUser)
    try {
        // const data = await getDocs(collection(db, "messages"));
        const q = query(collection(db, 'messages'), where('sender', 'in', [chatId, currentUser]), where('receiver', 'in', [ chatId, currentUser]));
        // const q = query(
        //     collection(db, 'messages'),
        //     // where('sender', '==', currentUser),
        //     where('sender', 'in', [currentUser])
        //     // where('receiver', '==', currentUser)
        // );
        const data = await getDocs(q);
        // console.log("messages data = ", data)
        data.forEach((doc) => {
            console.log("message doc1 =  ", doc.data())
            const result = {
                id: doc.id,
                message: doc.data().message,
                uid: doc.data().uid,
                sender: doc.data().sender,
                receiver: doc.data().receiver
            };
            messages = [...messages, result]


        });
        console.log('messages = : ', messages)


        return res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
};
