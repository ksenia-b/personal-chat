import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext.jsx";
import Login from "../../components/Login/index.jsx";
// import MainNav from "../../components/MainNav/index.jsx";
import Modal from "../../components/Modal/index.jsx";
import Signup from "../Signup/index.jsx";
import {SocketContext} from "../../App.jsx";

const Auth = () => {
    const socket = useContext(SocketContext)
    const { currentUser } = useContext(AuthContext);
    const [dialogType, setDialogType] = useState(null);

    const handleLogout = () => {
        console.log('-------, socket', socket)
        signOut(auth).then(() => {
            // navigate("/");  // Sign-out successful.
            console.log("Signed out successfully", socket)
            window.location.reload()
            // socket.emit("offline")

        }).catch((error) => {
            console.log("Error while signed out = ", error)
        });
    }

    return ( <div>
           {/*<MainNav handleLogout={handleLogout}/>*/}
            {currentUser ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <div>
                    <button onClick={() => setDialogType("Login")}>Login</button>
                    <button onClick={() => setDialogType("Signup")}>Signup</button>
                </div>
            )}
            {dialogType && (
                <Modal title={dialogType} onClose={() => setDialogType(null)}>
                    {dialogType === "Login" ? <Login onLogin={() => setDialogType(null)}/> : <Signup />}
                </Modal>
            )}
        </div>
    )
}

export default Auth;