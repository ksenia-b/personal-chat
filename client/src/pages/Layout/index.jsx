import {Outlet} from "react-router-dom";
import Auth from "../Auth/index.jsx";

const Layout = () => {

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center my-4">
                Chat app
            </h1>
            <Auth/>
            <Outlet/>
        </div>
    );
};

export default Layout;
