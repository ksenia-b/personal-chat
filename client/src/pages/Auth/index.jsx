import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext.jsx";
import Login from "../../components/Login/index.jsx";

const Auth = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("Error while signed in = ", error)
        });
    }

    const {currentUser} = useContext(AuthContext);
    return ( <div>Auth:
            {currentUser ? <button onClick={handleLogout}>
                Logout
            </button> :
            <Login />
            }
        </div>
    )
}

export default Auth;