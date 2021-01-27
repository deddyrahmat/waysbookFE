import React, { Fragment } from 'react'
import { Form } from 'react-bootstrap'

// styling
import './Forms.css';

const Forms = ({type, ...rest}) => {
    return (
        <Fragment>
            <Form.Group>
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control type={type} {...rest} className="form-field"  />
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>
        </Fragment>
    )
}

export default Forms
