import React, {useState, useEffect} from 'react';

import {onAuthStateChanged} from 'firebase/auth';
import {Routes, BrowserRouter as Router, Route, Navigate} from "react-router-dom";
import {AuthProvider} from './auth/AuthContext';
import Auth from "./pages/Auth/index.jsx";
import Chat from "./pages/Chat/index.jsx";
import Layout from "./pages/Layout/index.jsx";
import io from "socket.io-client";
import {auth} from './firebase.js';
import socket from "./utils/socket.js";
export const SocketContext = React.createContext();


function App() {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        let userData = {}
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return null;
            }
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

    return (<AuthProvider value={{currentUser}}>
        <SocketContext.Provider value={socket}>
            <Router>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={currentUser ? <Chat/> : <Navigate to="../auth"/>} />
                        <Route path="/auth" element={currentUser ? <Navigate to="../"/> : null} />
                    </Route>
                </Routes>
            </Router>
        </SocketContext.Provider>
        </AuthProvider>
    )
}

export default App
