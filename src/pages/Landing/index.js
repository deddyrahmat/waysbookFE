import React, { Fragment } from 'react';

// components
import {   Navbars, MainContent } from '../../components';
// styling
import "./Landing.css";

const Landing = () => {
    return (
        <Fragment>
            <Navbars />
            <MainContent />
        </Fragment>
    )
}

export default Landing
