import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../configs";
import { Redirect } from "react-router-dom";

const Logout = () => {
    const [state, dispatch] = useContext(AppContext);
    const [isLogout, setIsLogout] = useState(false);

    useEffect(() => {
        dispatch({
        type: "LOGOUT",
        });

        setIsLogout(true);
    }, []);

    return isLogout && <Redirect to="/" />;
};

export default Logout;