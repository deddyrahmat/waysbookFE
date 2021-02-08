import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// component
import {Buttons, Inputs} from '../../';// same ../../index.js take file Buttons
import {AppContext} from '../../../configs';

// json Fake Data
// import FakeData from '../../../json/FakeData.json'
import {Users} from '../../../FakeData';

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
    
    const {email, password} = formData;

    const handleChangeLogin=(e)=> {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // filter FakeData Users
        let user = Users.filter(data => data.email === email && data.password === password)
        // cek Auth User
        if (user.length > 0) {
            dispatch({
                type : "AUTH",
                payload: {
                    id:user[0].id,
                    role : user[0].role
                }
            });

            // cek role for redirect page where role user
            if (user[0].role == "admin") {
                history.push('/admin');                
            }else{
                history.push('/user');
            }
        }else{
            handleLoginFailed();
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
                                    <Buttons className="buttons-red btn-block font-weight-bold mt-2 mb-2"  type="submit" title={titleModal} />
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
