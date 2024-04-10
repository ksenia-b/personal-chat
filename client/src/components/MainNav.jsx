import {Link} from "react-router-dom";

const MainNav = () => {
    return (
        <>
            <nav>
                <li><Link to="/">Home</Link></li>
                <li><Link to="login">Login</Link></li>
                <li><Link to="signup">Signup</Link></li>
            </nav>
        </>
    )
}

export default MainNav;