import {Outlet} from "react-router-dom";
import Auth from "../Auth/index.jsx";

const Layout = () => {

    return (
        <div>
            Chat app
            <Auth/>
            <Outlet/>
        </div>
    );
};

export default Layout;
