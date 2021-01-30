import React, { Fragment, useState, useContext } from 'react';
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';

// component
import {AppContext} from '../../../configs';
import {Inputs, Buttons} from '../../../components'

// images
import {Wow} from '../../../assets';
import { Uploads } from '../../atoms';

// styling
import "./Subscribe.css";

const Subscribe = () => {

    const [state, dispatch] = useContext(AppContext);

    const [showModal, setShowModal] = useState(false);

    const [descModal, setDescModal] = useState("");

    const handleClose = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

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
    const handlePayment = (e) => {
        e.preventDefault();

        dispatch({
            type : "PAYMENT"
        })

        setDescModal("Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you");

        handleShowModal();


        console.log("e", e);
    }
    // submit payment
    // ==============================================================

    console.log('image', image);
    console.log('state', state);
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
                            <Inputs type="text" placeholder="Input Your Account Number" name="account"/>
                            <Uploads onChange={handleImageTransaction} />

                            {
                                image.preview && (
                                    <img src={image.preview} alt="attach file" width="50px" className="text-center" onChange={handleImageTransaction}></img>
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
                    <p className="modal-subscribe">{descModal}</p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Subscribe
