import {useState, useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {Routes, BrowserRouter as Router, Route, Navigate} from "react-router-dom";
import {AuthProvider} from './auth/AuthContext';
import Auth from "./pages/Auth/index.jsx";
import Chat from "./pages/Chat/index.jsx";
import io from "socket.io-client";
import {auth} from './firebase.js';

const socket = io.connect('http://localhost:4000');


function App() {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        let userData = {}
        onAuthStateChanged(auth, (user) => {
            userData = {
                uid: user.uid,
                email: user.email,
                // displayName: user?.displayName,
                // photoURL: user?.photoURL
            }
            setCurrentUser(userData)
        })
    }, [])

    console.log('current user---', currentUser)

    return (<AuthProvider value={{currentUser, socket}}>
            <Router>
                <Routes>
                    <Route path="/" element={currentUser ? <Chat/> : <Navigate to="../auth"/>} />
                    <Route path="/auth" element={currentUser ? <Navigate to="../"/> : <Auth/>} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
