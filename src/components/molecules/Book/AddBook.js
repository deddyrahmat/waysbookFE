import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// utils CKEDITOR
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// component
import { Inputs,Uploads, Buttons } from '../../atoms'
import { AddBooks } from '../../../assets';

// styling
import "./AddBook.css";

const AddBook = () => {

    // ==============================================================
    // image book
    const [image, setImage] = useState({ preview: "", raw: "" });
    
    const handleImageTransaction = (e) => {
        if (e.target.files.length) {
            setImage({
            preview : URL.createObjectURL(e.target.files[0]),
            raw : e.target.files[0]
        })
    }
    }
    // image book
    // ==============================================================

    return (
        <Fragment>
            <Container>
                <h3 className="title-AddBook">Add Book</h3>

                <Row>
                    <Col>
                        <Inputs type="text" placeholder="Title" name="title" />
                        <Inputs type="date" placeholder="Publication Date" name="publication" />
                        <Inputs type="text" placeholder="Pages" name="pages" />
                        <Inputs type="text" placeholder="Author" name="author" />
                        <Inputs type="text" placeholder="ISBN" name="isbn" />
                        
                        <CKEditor
                            editor={ ClassicEditor }
                            config={{placeholder: "About This Book..."}} 
                            data=""
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            } }
                            // onChange={ handleCKEditor }
                            onBlur={ ( event, editor ) => {
                                // console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                // console.log( 'Focus.', editor );
                            } }
                        />

                        <Uploads onChange={handleImageTransaction} className="mt-3 w-25 add-book" title="Attache Book File" classNameTitleBook="title-book" />

                        {
                            image.preview && (
                                <img src={image.preview} alt="attach file" width="50px" className="text-center" onChange={handleImageTransaction}></img>
                            )
                        }

                        <div className="d-flex justify-content-end mb-5">
                            <Buttons className="buttons-red font-weight-bold mt-2 mb-2"  type="submit" title="Add Book" icon={AddBooks} />
                        </div>
                    </Col>
                </Row>

            </Container>
        </Fragment>
    )
}

export default AddBook
