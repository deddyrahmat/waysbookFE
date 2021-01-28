import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// component
import {Buttons, Inputs} from '../../';// same ../../index.js take file Buttons
import {AppContext} from '../../../configs';

// json Fake Data
import {Users} from '../../../FakeData'

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
    const [messageFailed, setMessageFailed] = useState("");
    
    const handleCloseRegisterFailed = () => setRegisterFailed(false);
    const handleRegisterFailed = () => setRegisterFailed(true);
    // set modal for Register failed
    // ======================================================

    // ======================================================
    // process register

    const [formDataRegister, setFormDataRegister] = useState({
        email: '',
        password : '',
        fullname : ''
    });
    
    const {email, password, fullname} = formDataRegister;

    const handleChangeRegister=(e)=> {
        setFormDataRegister({
            ...formDataRegister, [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // filter FakeData Users

        const filterUser = () => Users.filter(data => data.email === email);
        let user = filterUser();
        // cek Auth User
        if (user.length > 0) {
            console.log("filter user", user);
            
            setMessageFailed("Username has been used")
            handleRegisterFailed();
        }else if(user.length === 0){
            Users.push({
                id:Users.length+1,
                fullname,
                email,
                password,
                avatar: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
                role : "user"
            })

            let cekUser = filterUser();

            console.log("cek user setelah push",cekUser);
            dispatch({
                type : "AUTH",
                payload: {
                    id : Users.length,
                    role : 'user'
                }
            });
            history.push('/home');
        }
        else{
            setMessageFailed("Register Failed")
            handleRegisterFailed();
        }
    }
    
    // process Register
    // ======================================================
    
    console.log("user dari register",Users);
    console.log("state dari register",state);
    // console.log("email register",email);
    // console.log("pass dari register",password);
    // console.log("fullname dari register",fullname);
    
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
                                    <Inputs type="email" placeholder="Email" name="email" value={email} onChange={e => handleChangeRegister(e)} />
                                    <Inputs type="password" placeholder="Password" name="password" onChange={e => handleChangeRegister(e)} />
                                    <Inputs type="text" placeholder="Full Name" name="fullname" value={fullname} onChange={e => handleChangeRegister(e)} />
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
                    <p className="modal-failed">{messageFailed}</p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Register
