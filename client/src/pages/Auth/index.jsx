import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext.jsx";
import Login from "../../components/Login/index.jsx";
// import MainNav from "../../components/MainNav/index.jsx";
import Modal from "../../components/Modal/index.jsx";
import Signup from "../Signup/index.jsx";

const Auth = () => {
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);
    const [dialogType, setDialogType] = useState(null);
    const handleLogout = () => {
        console.log('-------')
        signOut(auth).then(() => {
            navigate("/");  // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("Error while signed in = ", error)
        });
    }

    const openDialog = (type) => {
        setDialogType(type);
    };

    const closeDialog = () => {
        setDialogType(null);
    };

    return ( <div>
           {/*<MainNav handleLogout={handleLogout}/>*/}
            {currentUser ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <div>
                    <button onClick={() => openDialog("Login")}>Login</button>
                    <button onClick={() => openDialog("Signup")}>Signup</button>
                </div>
            )}
            {dialogType && (
                <Modal title={dialogType} onClose={closeDialog}>
                    {dialogType === "Login" ? <Login /> : <Signup />}
                </Modal>
            )}
        </div>
    )
}

export default Auth;