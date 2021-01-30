import React, { Fragment, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// component
import {Users} from '../../../FakeData';
import {AppContext} from '../../../configs';
import HeroProfile from "./HeroProfile";
import ListBookProfile from "./ListBookProfile";

// styling
import "./Profile.css";

const Profile = () => {
    const [state] = useContext(AppContext);

    const user = Users.find(user => user.id == localStorage.getItem('id_user'));

    return (
        <Fragment>
            <HeroProfile />
            <ListBookProfile />
        </Fragment>
    )
}

export default Profile
