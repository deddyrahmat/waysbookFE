import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// component
import {Buttons, Inputs} from '../../';// same ../../index.js take file Buttons
import {AppContext, API, setAuthToken} from '../../../configs';


// json Fake Data
// import FakeData from '../../../json/FakeData.json'
// import {Users} from '../../../FakeData';

// styling
import "./Auth.css";

const Login = ({titleModal, classModalButton, ...rest  }) => {
    
    const history = useHistory();

    const [state, dispatch] = useContext(AppContext);

    // ======================================================
    // set variable show modal login in page
    const [showLogin, setShowLogin] = useState(false);
    
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    // set variable show modal login in page
    // ======================================================

    // ======================================================
    // set modal for login failed
    const [loginFailed, setLoginFailed] = useState(false);
    
    const handleCloseLoginFailed = () => setLoginFailed(false);
    const handleLoginFailed = () => setLoginFailed(true);
    // set modal for login failed
    // ======================================================

    // ======================================================
    // set modal register when user click link
    const handleRegister = () => {
        handleCloseLogin();
        dispatch({
            type: "MODAL_REGISTER",
            payload : !state.modalRegister
        });
    }
    // set modal register when user click link
    // ======================================================

    // ======================================================
    // set login from another modal
    useEffect(() => {
        if (state.modalLogin) {
            handleShowLogin();
            dispatch({
                type:"MODAL_LOGIN",
                payload : !state.modalLogin
            })
        }
    }, [state.modalLogin])
    // set login from another modal
    // ======================================================
    
    // ======================================================
    // process login

    const [formData, setFormData] = useState({
        email: '',
        password : ''
    });
    
    const handleChangeLogin=(e)=> {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    
    const {email, password} = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = JSON.stringify({ email, password });

            const config = {
                headers: {
                "Content-Type": "application/json",
                },
            };

            const response = await API.post("/login", body, config);

            console.log("hasil response login",response);     
            const result = response.data.data.user;
            if (response.status == 200) {
                console.log("hasil response login",response.data.data.user);                
                    dispatch({
                    type : "AUTH",
                    payload: result
                });

                setAuthToken(result.token);

                // cek role for redirect page where role user
                if (result.role == "admin") {
                    history.push('/admin');                
                }else{
                    history.push('/user');
                }
            }
        } catch (err) {
            handleLoginFailed();
            console.log("error : ", err);            
        }
    }
    
    // process login
    // ======================================================

    
    
    return (
        <Fragment>
            <Buttons onClick={handleShowLogin} title={titleModal} className={classModalButton} />

            <Modal show={showLogin} onHide={handleCloseLogin} className="d-flex justify-content-center align-items-center">
                <Modal.Body >
                    <Container>
                        <Row className="my-3">
                            <Col md="12">
                                <h2 className="title-modal">{titleModal}</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Inputs type="email" placeholder="Email" name="email" value={email} onChange={e => handleChangeLogin(e)} />
                                    <Inputs type="password" placeholder="Password" name="password" onChange={e => handleChangeLogin(e)} />
                                    <Buttons className="buttons-black btn-block font-weight-bold mt-2 mb-2"  type="submit" title={titleModal} />
                                </Form>
                                <div className="text-link">
                                    Don't have an account ? Klik <b className="link-here" 
                                    onClick={handleRegister}>Here</b>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>



            {/* component modal login failed */}
            <Modal size="lg" show={loginFailed} onHide={handleCloseLoginFailed} className="d-flex justify-content-center align-items-center">
                <Modal.Body >
                    <p className="modal-failed">Login Failed</p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Login
