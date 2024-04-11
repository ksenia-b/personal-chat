import Login from "../Login/index.jsx";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase.js";
import {useContext} from "react";
import {AuthContext} from "../../auth/AuthContext.jsx";
import Signup from "../../pages/Signup/index.jsx";

const MainNav = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("Error while signed in = ", error)
        });
    }


    return(
        <>
        {
            currentUser ? <button onClick={handleLogout}>
                    Logout
                </button> :
               <div>
                   <button onClick={<Login/>}>Login</button>
                   <button onClick={<Signup/>}>Signup</button>
               </div>


        }
        </>
    )
}

export default MainNav;