import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'

// Styling
import "./Buttons.css";

const Buttons = ({title, className, icon, ...rest}) => {

    console.log("icon", icon);
    console.log("type icon", typeof icon);
    return (
        <Fragment>
            <Button variant="danger" className={className} {...rest}>
                {title} 
                {
                    typeof icon === 'undefined' ? null 
                    : typeof icon === 'object' ? (icon) 
                    : (<img src={icon} alt="icon" className="ml-3" />)
                } 
            </Button>{' '}
        </Fragment>
    )
}

export default Buttons
