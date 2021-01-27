import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'

// Styling
import "./Buttons.css";

const Buttons = ({title, className, ...rest}) => {

    // console.log("res login", rest);
    return (
        <Fragment>
            <Button variant="danger" className={className} {...rest}>{title}</Button>{' '}
        </Fragment>
    )
}

export default Buttons
