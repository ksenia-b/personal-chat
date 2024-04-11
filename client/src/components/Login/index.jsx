import React, {useContext, useState} from "react";
import {auth} from "../../firebase.js";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../auth/AuthContext";
import {Formik, Form} from 'formik';

const Login = () => {

    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext)
    console.log("current user in Login = ", currentUser)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

            console.log("login sucessful", auth)
            navigate("/");
        } catch {
            console.log("You entered a wrong username or password.", email, password);
        }
    }

    if (currentUser?.uid) {
        return <Navigate to='/' replace/>

    }

    return (
                <Formik initialValues={{}}
                        onSubmit={loginWithUsernameAndPassword} className={"flex"}
                >
                    {({errors, touched}) => (
                        <Form className={"flex-column "}>
                          <div> Login: <input name="login" placeholder="Login or email" onChange={handleSetEmail}/></div>
                           <div> Password: <input name="password" placeholder="Password" onChange={handleSetPassword}/></div>

                            <div>
                                <Link to="forgot-password"><span>Forgot password?</span></Link>
                            </div>
                            <div>
                                <button type="submit"
                                        onClick={(e) => loginWithUsernameAndPassword(e)}>
                                    Submit
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>

    )
}

export default Login