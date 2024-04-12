import bcrypt from "bcrypt";
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase.js";

let userData = {
    name: null,
    email: null,
    password: null
}

export const registerUser = async (req, res) => {
    userData = {
        username: req.body?.username,
        email: req.body?.email,
        password: req.body?.password
    }
    const postData = (dataF) => {
        console.log("data to post on fe = ", JSON.parse(JSON.stringify(dataF)))
        addDoc(collection(db, "users"), {
           dataF
        }).then((response) => console.log("resonse")).catch((err) => console.log(err));

    }

    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(() => {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log(auth.currentUser.uid)
                    // setTimeActive(true)
                    // navigate('/verify-email')
                    if (auth.currentUser.uid) {
                        // user was created in firebase
                        userData.uid = auth.currentUser.uid;
                        console.log("auth user id exists?", auth.currentUser.uid);
                        postData(userData)
                        res.status(200).json({ status: "user is added" });
                    }
                }).catch((err) => res.status(500).json({ message: err.message }))
        })


};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username: username });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                res.status(400).json("wrong password");
            } else {
                const token = jwt.sign(
                    { username: user.username, id: user._id },
                    process.env.JWTKEY,
                    { expiresIn: "1h" }
                );
                res.status(200).json({ user, token });
            }
        } else {
            res.status(404).json("User not found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};