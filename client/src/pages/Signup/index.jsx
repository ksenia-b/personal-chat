import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import {auth} from '../../firebase.js';

const Signup = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')


    const [formData, setFormData] = useState({
        uid: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        console.log("handle input change")
        const {name, value} = e.target;
        if (name === "repeatpassword") {
            // validPassword = validatePassword()}
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                isValid = false
                setError('Passwords does not match')
            }
        }
        return isValid
    }
    const postData = (dataF) => {
        console.log("data to post on fe = ", JSON.parse(JSON.stringify(dataF)))
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataF)
        };
        console.log("requestOptions = ", requestOptions);
        fetch('http://localhost:3000/users', requestOptions)
            .then(response => {
                console.log("response = ", response);
                return response
            })
        // .then(data => this.setState({ postId: data.id }));
    }
    const register = e => {
        e.preventDefault()

        setError('')
        if (validatePassword()) {
            // Create a new user with email and password using firebase
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then(() => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            console.log(auth.currentUser.uid)
                            // setTimeActive(true)
                            // navigate('/verify-email')
                            if (auth.currentUser.uid) {
                                // user was created in firebase
                                formData.uid = auth.currentUser.uid
                                console.log("auth user id exists");

                                postData(formData)
                            }

                        }).catch((err) => alert(err.message))
                })
                .catch(err => setError(err.message))
        } else {
            console.log("password valid", validatePassword())
        }
        // setEmail('')
        // setPassword('')
        // setConfirmPassword('')
        // navigate("/login");
    }

    return (
        <>

            <div>
                <h2>Registration</h2>
                <div>Registration will only take a few minutes and will allow you to receive
                    access to your personal account. Fields marked * are required
                </div>
                <p>{error}</p>
                <form onSubmit={register} method="POST">
                    <div>
                        <span>Учетная запись</span>
                        <ul>
                            <div>
                                <li>E-Mail *</li>
                                <input placeholder={"Enter email"}
                                       type='email'
                                    // value={email}
                                       name="email"
                                       required
                                       onChange={handleInputChange}/>

                            </div>
                            <div>
                                <li>Пароль *</li>
                                <input placeholder={"Enter password"}
                                       type='password'
                                       name="password"

                                       required
                                    // onChange={e => setPassword(e.target.value)}
                                       onChange={handleInputChange}
                                />

                            </div>
                            <div>
                                <li>Repeat password *</li>
                                <input placeholder={"Повторите пароль"}
                                       type='password'
                                       name="repeatpassword"

                                       required

                                    // e => setConfirmPassword(e.target.value)}
                                       onChange={handleInputChange}
                                />

                            </div>
                            <div>
                                <li>Birthdate</li>
                                <input placeholder={"14.06.1990"}
                                       name="birthday"
                                />
                            </div>
                        </ul>
                    </div>

                    <div>
                        <span>User info</span>
                        <ul>
                            <div>
                                <li>Фамилия *</li>
                                <input placeholder={"Enter surname"}
                                       onChange={handleInputChange}
                                       name="surname"
                                />
                            </div>
                            <div>
                                <li>Имя *</li>
                                <input placeholder={"Enter your name"} onChange={handleInputChange}
                                       name="name"
                                />
                            </div>

                        </ul>
                    </div>

                    <button>Register</button>
                </form>
            </div>
        </>
    )
}
export default Signup;