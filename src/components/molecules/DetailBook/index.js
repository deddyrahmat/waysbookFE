import React, { Fragment } from 'react';
import AboutDetailBook from './AboutDetailBook';
// styling
import './DetailBook.css';
import InfoDetailBook from './InfoDetailBook';

const DetailBook = () => {
    return (
        <Fragment>
            <div className="hero-page d-flex  align-items-center flex-auto">
                <div className="hero1"></div>
                <div className="hero2"></div>
            </div>
            <InfoDetailBook />
            <AboutDetailBook />
        </Fragment>
    )
}

export default DetailBook
