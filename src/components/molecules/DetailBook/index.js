import React, { Fragment } from 'react';
import AboutDetailBook from './AboutDetailBook';
// styling
import './DetailBook.css';
import InfoDetailBook from './InfoDetailBook';

const DetailBook = () => {
    return (
        <Fragment>
            <InfoDetailBook />
            <AboutDetailBook />
        </Fragment>
    )
}

export default DetailBook
