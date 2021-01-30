import React, { Fragment } from 'react'
import {Form} from 'react-bootstrap'
import { Attachment } from '../../../assets'

import "./Uploads.css";

const Uploads = ({...rest}) => {
    return (
        <Fragment>
            <Form.Group className="m-0 p-0">
                <Form.Label htmlFor="attachment" className="file-attachment">
                    <p className="title-file-attachment d-inline">Attache proof of transfer</p>
                    <img src={Attachment} alt="attachment" className="image-file-attachment"  />
                </Form.Label>

                <Form.File id="attachment" label="Example file input" className="d-none" {...rest} />                
            </Form.Group>
        </Fragment>
    )
}

export default Uploads
