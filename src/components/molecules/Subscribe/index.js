import React, { Fragment, useState, useContext } from 'react';
import { Row, Col, Container, Form, Modal, ProgressBar } from 'react-bootstrap';
import { useHistory,Redirect} from 'react-router-dom';

// component
import {AppContext, API} from '../../../configs';
import {Inputs, Buttons} from '../../../components'

// images
import {Wow} from '../../../assets';
import { Uploads } from '../../atoms';

// styling
import "./Subscribe.css";

const Subscribe = () => {

    const history = useHistory();

    const [state, dispatch] = useContext(AppContext);

    // setModal Main
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    // setModal Main
    
    
    const [descModalSuccess, setDescModalSuccess] = useState("");
    const [descModalFailed, setDescModalFailed] = useState("");
    
    // set progres upload file
    const [progressUpload, setProgressUpload] = useState(0);
    
    const [imageModal, setImageModal] = useState(false);
    const handleCloseImage = () => setImageModal(false);
    const handleShowModalImage = () => setImageModal(true);
    

    // modal progress uplaod
    const [modalProgressUpload, setmodalProgressUpload] = useState(false);    
    const toggleProgressUpload = () => setmodalProgressUpload(!modalProgressUpload);
    // modal progress uplaod

    const [account, setAccount] = useState('')

    const handleChangeAccount = (e) => {
        setAccount(e.target.value)
    }

    // ==============================================================
    // attachment
    const [image, setImage] = useState({ preview: "", raw: "" });
    
    const handleImageTransaction = (e) => {
        if (e.target.files.length) {
            setImage({
            preview : URL.createObjectURL(e.target.files[0]),
            raw : e.target.files[0]
        })
    }
    }
    // attachment
    // ==============================================================
    

    // ==============================================================
    // submit payment
    const handlePayment = async (e) => {
        e.preventDefault();

        try {

            console.log("account number", account);
            const body = new FormData();
            body.append("numberAccount", account);

            if (image.raw !== "") {
                body.append("transferProof", image.raw);                
            }else{
                setDescModalFailed("Please upload file payment transfer");

                handleShowModal();
            }

            console.log("image prev", image);

            console.log("body input ", body);

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },

                onUploadProgress: progressEvent => {
                    console.log("loaded : ", progressUpload.loaded);
                    console.log("total : ", progressUpload.total);
                    let percentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                    setProgressUpload(percentage);

                    if (percentage <= 100) {
                    setmodalProgressUpload(true);
                    }
                }
            };

            console.log("config input ", config);

            const response = await API.post("/transaction", body, config);
            if (response.status == 200) {

                // setmodalPost(true);
                // dispatch({
                //     type : "USER_LOADED",
                //     payload : state
                // })

                setDescModalSuccess("Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you");

                handleShowModal();

                // setLoading(false);
                setTimeout(() => {
                    setProgressUpload(0);
                }, 1000)
            }

        } catch (err) {
            console.log("Your System Error : ", err);
        }
    }
    // submit payment
    // ==============================================================

    console.log('image', image);
    console.log('data change input number', account);
    return (
        <Fragment>
            <Container>
                <Row className="d-flex justify-content-center align-items-center vh-100">
                    <Col md="6" className="text-center">
                        <h3 className="title-subscribe m-0 p-0">Premium</h3>
                        <div className="desc-subscribe">
                            <p className="d-inline">Pay now and access all the latest books from </p>
                            <img src={Wow} alt="icon" />
                        </div>
                        <div className="account-subscribe">
                            <img src={Wow} alt="icon" />
                            <p className="d-inline">: 0981312323</p>
                        </div>

                        <Form onSubmit={handlePayment}>
                            <Inputs type="text" placeholder="Input Your Account Number" name="numberAccount" onChange={handleChangeAccount} />
                            <Uploads onChange={handleImageTransaction} className="title-file-attachment" title="Attache proof of transfer" Subscribe="aktif"/>

                            {
                                image.preview && (
                                    <img src={image.preview} alt="attach file" width="50px" className="text-center" style={{cursor:"pointer"}} onClick={handleShowModalImage} onChange={handleImageTransaction} />
                                )
                            }

                            <Buttons className="buttons-red btn-block font-weight-bold mb-2 height-button-subscribe"  type="submit" title="Send" />
                        </Form>
                    </Col>
                </Row>
            </Container>

            {/* component modal */}
            <Modal size="lg" show={showModal} onHide={handleClose} className="d-flex justify-content-center align-items-center">
                <Modal.Body >
                    {descModalSuccess !== "" ? (
                        <p className="modal-subscribe">{descModalSuccess}</p>
                    ) :  (
                        <p className="modal-subscribe-failed">{descModalFailed}</p>
                    )}
                </Modal.Body>
                {
                    descModalSuccess !== "" ? 
                        showModal == false ? (
                            <Redirect to="/user" />
                        ) : null

                    : null
                }
            </Modal>

            <Modal size="lg" show={imageModal} onHide={handleCloseImage} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <img src={image.preview} alt="attach file" className="text-center img-fluid" />
                </Modal.Body>
            </Modal>

            <Modal size="lg" show={modalProgressUpload} onHide={toggleProgressUpload} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <div className="text-center">{progressUpload}%</div>
                    {/* <Progress value={progressUpload} /> */}
                    <ProgressBar animated now={progressUpload} />
                </Modal.Body>
            </Modal>

        </Fragment>
    )
}

export default Subscribe
