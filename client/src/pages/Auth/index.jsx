import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext.jsx";
import Login from "../../components/Login/index.jsx";
import MainNav from "../../components/MainNav/index.jsx";

const Auth = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");  // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("Error while signed in = ", error)
        });
    }
    return ( <div>Auth:
           <MainNav handleLogout={handleLogout()}/>
        </div>
    )
}

export default Auth;