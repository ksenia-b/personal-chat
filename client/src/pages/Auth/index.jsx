import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from '../../firebase.js';
import {AuthContext} from "../../auth/AuthContext.jsx";
import Login from "../../components/Login/index.jsx";
import MainNav from "../../components/MainNav/index.jsx";

const Auth = () => {

    return ( <div>Auth:
           <MainNav/>
        </div>
    )
}

export default Auth;