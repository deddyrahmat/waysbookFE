import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';

// component
import {Buttons, Inputs} from '../../';// same ../../index.js take file Buttons
import {AppContext} from '../../../configs';


// styling
import "./Auth.css";

const Register = ({titleModal, classModalButton  }) => {

    const [state, dispatch] = useContext(AppContext);

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // set modal login when user click link
    const handleLogin = () => {
        handleClose();
        dispatch({
            type: "MODAL_LOGIN",
            payload : !state.modalLogin
        });
    }
    // set modal login when user click link

    // set login from another modal
    useEffect(() => {
        if (state.modalRegister) {
            handleShow();
            dispatch({
                type:"MODAL_REGISTER",
                payload : !state.modalRegister
            })
        }
    }, [state.modalRegister])
    // set login from another modal

    
    // console.log("show res", show);
    // console.log("state", state);
    return (
        <Fragment>
            {/* <Login titleModal="Sign sdf" classModalButton="buttons-grey px-5 font-weight-bold" /> */}
            <Buttons onClick={handleShow} title={titleModal} className={classModalButton} />


            <Modal show={show} onHide={handleClose} className="d-flex justify-content-center align-items-center">
                <Modal.Body >
                    <Container>
                        <Row className="my-3">
                            <Col md="12">
                                <h2 className="title-modal">{titleModal}</h2>
                                <Form>
                                    <Inputs type="email" placeholder="Email" />
                                    <Inputs type="password" placeholder="Password" />
                                    <Inputs type="text" placeholder="Full Name" />
                                    <Buttons className="buttons-red btn-block font-weight-bold mt-2 mb-2"  type="submit" title={titleModal} />
                                </Form>
                                <div className="text-link">
                                    Already have an account ? Klik <b className="link-here" 
                                    onClick={handleLogin}>Here</b>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Register
