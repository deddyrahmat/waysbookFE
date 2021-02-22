import React, { Fragment } from 'react'

// component
import HeroProfile from "./HeroProfile";
import ListBookProfile from "./ListBookProfile";

// styling
import "./Profile.css";

const Profile = () => {

    return (
        <Fragment>
            <div className="hero-page d-flex  align-items-center flex-auto">
                <div className="hero1"></div>
                <div className="hero2"></div>
            </div>
            <HeroProfile />
            <ListBookProfile />
        </Fragment>
    )
}

export default Profile
