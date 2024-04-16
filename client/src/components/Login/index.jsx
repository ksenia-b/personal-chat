import React, {useContext, useState} from "react";
import {auth} from "../../firebase.js";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate, Navigate} from "react-router-dom";
import {AuthContext} from "../../auth/AuthContext";
import {Formik, Form} from 'formik';

const Login = ({onLogin}) => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setIsLoading] = useState(false);

    const handleSetEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handleSetPassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();
        console.log("email = ", email);
        console.log("password = ", password);
        try {
            await signInWithEmailAndPassword(auth, email, password).catch(err => setError(err.message))
            setIsLoading(true)
            console.log("login sucessful", auth)
            onLogin()
            // navigate("/");
        } catch {
            console.log("You entered a wrong username or password.", email, password);
        }
    }
    // setIsLoading(false)
    if (currentUser?.uid) {
        return  <Navigate to='/' replace/>
    }

    return (<>
        {loading? <div>Loading...</div>:
                <form className={"flex flex-col gap-4 "} onSubmit={loginWithUsernameAndPassword}>
                  <div> Login: <input name="login" placeholder="Login or email" onChange={handleSetEmail}/></div>
                   <div> Password: <input name="password" placeholder="Password" onChange={handleSetPassword}/></div>
                        <button type="submit">Submit</button>
                </form>
        }
        </>

    )
}

export default Login