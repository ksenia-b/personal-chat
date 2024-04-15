import {collection, getDocs, addDoc, query, where} from "firebase/firestore";
import {db} from "../firebase.js";

export const getMessages = async (req, res) => {
    const chatId  = req.query.chatId;
    const currentUser = req.query.currentUser;

    // let messages = []
    console.log("trying to get messages...", chatId, currentUser)
    try {
        const q = query(collection(db, 'messages'), where('sender', 'in', [chatId, currentUser]), where('receiver', 'in', [ chatId, currentUser]));
        const data = await getDocs(q);


        const messages = data.docs.map((doc) => ({
            id: doc.id,
            message: doc.data().message,
            sender: doc.data().sender,
            receiver: doc.data().receiver,
            createdAt: doc.data().createdAt
        })).sort((a, b) => {
            return a.createdAt.seconds - b.createdAt.seconds})

        return res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const addMessage = async (req, res) => {
    console.log("req.body = ", req.body);
    const { sender, message, receiver } = req.body;
console.log("addMessages = ", sender, message, receiver)
    try {
    const result = {
        sender,
        message,
        receiver,
        createdAt: new Date(),
    }
        // Add a new document with a generated id to the "messages" collection
        const docRef = await addDoc(collection(db, 'messages'), result);

    console.log('----docRef: ', docRef)
        // Send a success response
        res.status(200).json({
            ...result,
            id: docRef.id
        });
    } catch (error) {
        // Send an error response
        res.status(500).json({ error: error.message });
    }
};