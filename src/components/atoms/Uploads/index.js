import React, { Fragment } from 'react'
import {Form} from 'react-bootstrap'
import { Attachment, AttachmentBook } from '../../../assets'

import "./Uploads.css";

const Uploads = ({className, Subscribe ,title,...rest}) => {

    console.log("class title bok upload", Subscribe);
    return (
        <Fragment>
            <Form.Group className={className}>
                {/* untuk input file id label for == id input file untuk menyesuaikkan form yang ingin diproses */}
                <Form.Label htmlFor={typeof(Subscribe) == 'undefined' ? "attachmentBook" : "attachment" } className="file-attachment">
                    <p >{title}</p>

                    {
                        typeof(Subscribe) == 'undefined' ? (
                            <img src={AttachmentBook} alt="attachment" className="image-file-attachment"  />
                            ): (
                            <img src={Attachment} alt="attachment" className="image-file-attachment"  />
                        )
                    }
                </Form.Label>


                {
                    typeof(Subscribe) == 'undefined' ? (
                        <Form.File id="attachmentBook" label="Example file input" className="d-none" {...rest} />                
                        ): (
                        <Form.File id="attachment" label="Example file input" className="d-none" {...rest} />                
                    )
                }

                <Form.Text id="passwordHelpBlock" muted>
                    Max size of File is 5 MB.
                </Form.Text>
            </Form.Group>
        </Fragment>
    )
}

export default Uploads
