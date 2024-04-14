import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
// import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
// import {auth} from '../../firebase.js';
// import {post} from "axios";

const Signup = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')


    const [formData, setFormData] = useState({
        username: "",
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
        fetch('http://localhost:4000/auth/register', requestOptions)
            .then(response => {
                console.log("response = ", response);
                return response
            })
        // .then(data => this.setState({ postId: data.id }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords did not match!");
        } else {
            postData(formData)
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            // navigate("/");
            // setConfirmPass(true);
        }
    };

    return (
<>
                <p>{error}</p>
                <form onSubmit={handleSubmit} method="POST">
                    <div>
                        <span>Registration details</span>
                        <ul>
                            <div>
                                <li>Имя *</li>
                                <input placeholder={"Enter your usernname"} onChange={handleInputChange}
                                       name="username"
                                />
                            </div>
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

                        </ul>
                    </div>


                    <button>Register</button>
                </form>
</>
    )
}
export default Signup;