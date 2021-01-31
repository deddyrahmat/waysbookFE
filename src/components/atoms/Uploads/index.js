import React, { Fragment } from 'react'
import {Form} from 'react-bootstrap'
import { Attachment, AttachmentBook } from '../../../assets'

import "./Uploads.css";

const Uploads = ({className, Subscribe ,title,...rest}) => {

    console.log("class title bokk", Subscribe);
    return (
        <Fragment>
            <Form.Group className={className}>
                <Form.Label htmlFor="attachment" className="file-attachment">
                    <p >{title}</p>

                    {
                        typeof(Subscribe) == 'undefined' ? (
                            <img src={AttachmentBook} alt="attachment" className="image-file-attachment"  />
                            ): (
                            <img src={Attachment} alt="attachment" className="image-file-attachment"  />
                        )
                    }
                </Form.Label>

                <Form.File id="attachment" label="Example file input" className="d-none" {...rest} />                
            </Form.Group>
        </Fragment>
    )
}

export default Uploads
