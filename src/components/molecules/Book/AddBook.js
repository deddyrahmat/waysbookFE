import React, { Fragment, useState } from 'react';
import { Col, Container, Row, Modal, Form, ProgressBar } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import NumberFormat from 'react-number-format';

// utils CKEDITOR
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// component
import {API} from '../../../configs';
import { Inputs,Uploads, Buttons, Loading } from '../../atoms';
import { AddBooks } from '../../../assets';


// styling
import "./AddBook.css";

const AddBook = () => {
    
    const [fileBook, setFileBook] = useState({ preview: "", raw: "" });
    const [image, setImage] = useState({ preview: "", raw: "" });
    // set progres upload file
    const [progressUpload, setProgressUpload] = useState(0);

    const [book, setBook] = useState({
        title : "",
        publication : "",
        pages : "",
        author : "",
        isbn : "",
        description : "",
        price : ''
    });

    
    const handleChangeBook = (e) => {
        setBook({...book,  [e.target.name] : e.target.value})
    }

    // ==============================================================
    // fileBook book
    
    const handleFileBookTransaction = (e) => {
        if (e.target.files.length) {
            setFileBook({
                preview : e.target.files[0].name,
                raw : e.target.files[0]
            })
        }
        
        console.log("file book",fileBook);
        console.log(" e.target.files filebook",  e.target.files);
    }
    // fileBook book
    // ==============================================================

    // ==============================================================
    // image book
    
    const handleImageTransaction = (e) => {
        if (e.target.files.length) {
            setImage({
                preview : URL.createObjectURL(e.target.files[0]),
                raw : e.target.files[0]
            })
        }

        console.log("image", image);
        console.log(" e.target.files image",  e.target.files[0].type);
    }
    // image book
    // ==============================================================


    const handleCKEditor = ( event, editor ) => {
        const data = editor.getData();
        // console.log( { event, editor, data } );
        setBook({...book,description : data});
    }

    // state modal image
    const [imageModal, setImageModal] = useState(false);
    const handleCloseImage = () => setImageModal(false);
    const handleShowModalImage = () => setImageModal(true);
    // state modal image
    
    // modal Book Success
    const [modalBook, setModalBook] = useState(false);    
    const handleCloseModalBook = () => setModalBook(false);
    const handleShowModalBook = () => setModalBook(true);
    // modal Book Success

    // modal post failed
    const [modalFailed, setModalFailed] = useState(false);
    const toggleFailed = () => setModalFailed(!modalFailed);
    // modal post failed

    // modal post Loading
    const [modalLoading, setModalLoading] = useState(false);
    const toggleLoading = () => setModalLoading(!modalLoading);
    // modal post Loading

    // modal progress uplaod
    const [modalProgressUpload, setmodalProgressUpload] = useState(false);    
    const toggleProgressUpload = () => setmodalProgressUpload(!modalProgressUpload);
    // modal progress uplaod
    
    const { title,
        publication,
        pages,
        author,
        isbn,
        description,
        price
    } = book;

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {

            const body = new FormData();

            body.append("title", title);
            body.append("publicationDate", publication);
            body.append("pages", pages);
            body.append("author", author);
            body.append("isbn", isbn);
            body.append("description", description);
            body.append("price", parseInt(price.replace(/,/g , '')));

            if (fileBook.raw) {
                body.append("bookFile", fileBook.raw);
                // body.append("image", imagePost[0]);
            }else{
                return setModalFailed(true);
            }

            if (fileBook.raw) {
                body.append("thumbnail", image.raw);
                // body.append("image", imagePost[0]);
            }else{
                return setModalFailed(true);
            }

            console.log("body book", body);

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },

                // onUploadProgress: progressEvent => {
                //     console.log("loaded : ", progressUpload.loaded);
                //     console.log("total : ", progressUpload.total);
                //     let percentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                //     setProgressUpload(percentage);

                //     if (percentage <= 100) {
                //         setmodalProgressUpload(true);
                //     }
                // }
            };

            toggleLoading();
            const response = await API.post('/book', body, config);

            console.log("response book ", response);
            if (response.status == 200) {
                toggleLoading();
                setModalBook(true);
                
                // setTimeout(() => {
                //     setProgressUpload(0);
                // }, 1000)
            }

        } catch (err) {
            console.log("Your System ", err);
        }
    }

    console.log("state book ", book);

    return (
        <Fragment>
            <Container>
                <h3 className="title-AddBook">Add Book</h3>

                <Row>
                    <Col>
                        <Form onSubmit={handleOnSubmit}>
                            <Inputs type="text" placeholder="Title" name="title" onChange={handleChangeBook} />
                            <Inputs type="date" placeholder="Publication Date" onChange={handleChangeBook} name="publication" />
                            <Inputs type="text" placeholder="Pages" onChange={handleChangeBook} name="pages" />
                            <Inputs type="text" placeholder="Author" onChange={handleChangeBook} name="author" />
                            <Inputs type="text" placeholder="ISBN" onChange={handleChangeBook} name="isbn" />
                            {/* <Inputs type="number" placeholder="Price" onChange={handleChangeBook} name="price" /> */}
                            <NumberFormat thousandSeparator={true} style={{paddingLeft:"10px", paddingTop:"5px", paddingBottom:"5px"}} placeholder="Price" name="price" id="price" className="form-field w-100 mb-3" inputmode="numeric" onChange={handleChangeBook} />
                            
                            <CKEditor
                                editor={ ClassicEditor }
                                config={{placeholder: "Description This Book..."}} 
                                data=""
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ handleCKEditor }
                                onBlur={ ( event, editor ) => {
                                    // console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    // console.log( 'Focus.', editor );
                                } }
                            />

                            <div className="d-flex align-items-center">
                                <Uploads onChange={handleFileBookTransaction} className="mt-3 w-25 add-book" title="Attach Book File" classNameTitleBook="title-book" />

                                {
                                    fileBook.preview && (
                                        <p className="ml-3 mt-3">{fileBook.preview}</p>
                                    )
                                }
                            </div>

                            <div className="d-flex">

                                <Uploads onChange={handleImageTransaction} className="w-25 add-book" title="Thumbnile Book" Subscribe="Aktif" />

                                {
                                    image.preview && (
                                        <img src={image.preview} alt="Book" width="50px" height="50px" className="text-center ml-3 mt-2" style={{cursor:"pointer"}} onClick={handleShowModalImage} onChange={handleImageTransaction}></img>
                                    )
                                }
                            </div>
                            <div className="d-flex justify-content-end mb-5">
                                <Buttons className="buttons-black font-weight-bold mt-2 mb-2"  type="submit" title="Add Book" icon={AddBooks} />
                            </div>
                        </Form>
                    </Col>
                </Row>

            </Container>


            <Modal size="lg" show={modalBook} onHide={handleCloseModalBook} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Book Success Created</p>
                </Modal.Body>
                {
                    modalBook == false ? (
                    <Redirect to="/admin" />
                    ) : null
                }
            </Modal>

            <Modal size="lg" dialogClassName="modal-90w" show={modalProgressUpload} onHide={toggleProgressUpload} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <div className="text-center">{progressUpload}%</div>
                    {/* <Progress value={progressUpload} /> */}
                    <ProgressBar animated now={progressUpload} />
                </Modal.Body>
            </Modal>


            {/* =========================== */}
            {/* Modal Loading */}
            {/* =========================== */}
            <Modal size="lg" show={modalLoading} onHide={toggleLoading} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <Loading />
                </Modal.Body>
            </Modal>


            <Modal size="lg" show={imageModal} onHide={handleCloseImage} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <img src={image.preview} alt="attach file" className="text-center img-fluid" />
                </Modal.Body>
            </Modal>

            <Modal size="lg" show={modalFailed} onHide={toggleFailed} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <span className="text-danger">Upload Failed</span>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default AddBook
