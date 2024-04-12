import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase.js";
import { AuthContext } from "../../auth/AuthContext.jsx";
import Modal from "../Modal";
import Login from "../Login/index.jsx";
import Signup from "../../pages/Signup/index.jsx";


const MainNav = ({ handleLogout }) => {
    const { currentUser } = useContext(AuthContext);
    const [dialogType, setDialogType] = useState(null);

    const openDialog = (type) => {
        setDialogType(type);
    };

    const closeDialog = () => {
        setDialogType(null);
    };

    return (
        <div>
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
    );
};

export default MainNav;
