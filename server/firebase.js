import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBMsdrhgdXHoiwifvR2m6wJv6nC91kZCyA",
    authDomain: "chat-noname.firebaseapp.com",
    databaseURL: "https://chat-noname-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-noname",
    storageBucket: "chat-noname.appspot.com",
    messagingSenderId: "155518430596",
    appId: "1:155518430596:web:71c2cfcb0f29b6474781d1"
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app)

export {auth, db}