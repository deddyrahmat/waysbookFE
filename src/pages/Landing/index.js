import React, { Fragment } from 'react'
import { Row, Col, Container } from 'react-bootstrap';

// components
import {  Register, Login } from '../../components'

// images
import { LogoWOW } from '../../assets'

// styling
import "./Landing.css";

const Landing = () => {

    return (
        <Fragment>
            <div className="landing">
                <Container>
                    <Row className="d-flex justify-content-start">
                        <Col sm="8" md="6">
                            <img src={LogoWOW} alt="logo" className="img-fluid" />
                            <p className="desc-landing">
                                Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia
                            </p>
                            <Register titleModal="Sign Up" classModalButton="buttons-red px-5 font-weight-bold"/>
                            <Login titleModal="Sign In" classModalButton="buttons-grey px-5 font-weight-bold" />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    )
}

export default Landing
