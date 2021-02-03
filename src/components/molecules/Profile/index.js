import React, { Fragment, useContext } from 'react'
import {
    // BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    Link,
    useLocation,
    useParams
} from "react-router-dom";

// component
import {Users} from '../../../FakeData';
import {AppContext} from '../../../configs';
import HeroProfile from "./HeroProfile";
import ListBookProfile from "./ListBookProfile";

// styling
import "./Profile.css";

const Profile = () => {

    let { path, url } = useRouteMatch();

    const [state] = useContext(AppContext);

    const user = Users.find(user => user.id == localStorage.getItem('id_user'));

    console.log("path di profile", path);
    console.log("url di profile", url);

    return (
        <Fragment>
            <HeroProfile />
            <ListBookProfile />
        </Fragment>
    )
}

export default Profile
