import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// component
import {Buttons, Inputs} from '../../';// same ../../index.js take file Buttons
import {AppContext} from '../../../configs';

// json Fake Data
import FakeData from '../../../FakeData/FakeData.json'

// styling
import "./Auth.css";

const Register = ({titleModal, classModalButton  }) => {

    const history = useHistory();

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


    // ======================================================
    // set modal for Register failed
    const [registerFailed, setRegisterFailed] = useState(false);
    
    const handleCloseRegisterFailed = () => setRegisterFailed(false);
    const handleRegisterFailed = () => setRegisterFailed(true);
    // set modal for Register failed
    // ======================================================

    // ======================================================
    // process register

    const {users} = FakeData;

    const [formData, setFormData] = useState({
        email: '',
        password : '',
        fullname : ''
    });
    
    const {email, password, fullname} = formData;

    const handleChangeRegister=(e)=> {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // filter FakeData Users
        let user = users.filter(data => data.email === email)
        // cek Auth User
        if (user.length > 0) {
            dispatch({
                type : "AUTH",
                payload: user[0].id
            });
            history.push('/home');
        }else{
            handleRegisterFailed();
        }
    }
    
    // process Register
    // ======================================================
    
    
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
                                <Form onSubmit={handleSubmit}>
                                    <Inputs type="email" placeholder="Email" value={email} onChange={e => handleChangeRegister(e)} />
                                    <Inputs type="password" placeholder="Password" onChange={e => handleChangeRegister(e)} />
                                    <Inputs type="text" placeholder="Full Name" value={fullname} onChange={e => handleChangeRegister(e)} />
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

            {/* component modal Register failed */}
            <Modal size="lg" show={registerFailed} onHide={handleCloseRegisterFailed} className="d-flex justify-content-center align-items-center">
                <Modal.Body >
                    <p className="modal-failed">Register Failed</p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Register
