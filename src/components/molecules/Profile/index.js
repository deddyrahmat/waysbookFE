import React, { Fragment } from 'react'

// component
import HeroProfile from "./HeroProfile";
import ListBookProfile from "./ListBookProfile";

// styling
import "./Profile.css";

const Profile = () => {

    return (
        <Fragment>
            <HeroProfile />
            <ListBookProfile />
        </Fragment>
    )
}

export default Profile
