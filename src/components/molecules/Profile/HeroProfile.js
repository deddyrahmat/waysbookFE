import React, { Fragment, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// component
import {Users} from '../../../FakeData';
import {AppContext} from '../../../configs';
import { Envelope,Gender,Phone, Maps } from '../../../assets';

// styling
import "./Profile.css";
import { Buttons } from '../../atoms';

const HeroProfile = () => {
    const [state] = useContext(AppContext);

    const user = Users.find(user => user.id == localStorage.getItem('id_user'));

    console.log("state dari profile", state);
    console.log("users dari profile", Users);
    console.log("user dari profile", user);
    return (
        <Fragment>
            <Container>
                <h2 className="title-profile">Profile</h2>

                <Row>
                    <Col sm="12" md="12">
                        <div className="bg-profile">

                            <Row className="content-profile">

                                <Col md="9">

                                    <Row className="height-list-profile">
                                        <Col md="1" className=" d-flex justify-content-end align-items-center">
                                            <img src={Envelope} alt="email" />
                                        </Col>
                                        <Col md="11">
                                            <span className=" d-block"> {user.email}</span>
                                            <small className="text-muted ">Email</small>
                                        </Col>
                                    </Row>

                                    <Row className="height-list-profile">
                                        <Col md="1" className=" d-flex justify-content-end align-items-center">
                                            <img src={Gender} alt="gender" />
                                        </Col>
                                        <Col md="11">
                                            <span className=" d-block"> {user.gender}</span>
                                            <small className="text-muted ">Gender</small>
                                        </Col>
                                    </Row>
                                    
                                    <Row className="height-list-profile">
                                        <Col md="1" className=" d-flex justify-content-end align-items-center">
                                            <img src={Phone} alt="gender" />
                                        </Col>
                                        <Col md="11">
                                            <span className=" d-block"> {user.phone}</span>
                                            <small className="text-muted ">Mobile phone</small>
                                        </Col>
                                    </Row>

                                    <Row className="height-list-profile">
                                        <Col md="1" className=" d-flex justify-content-end align-items-center">
                                            <img src={Maps} alt="gender" />
                                        </Col>
                                        <Col md="11">
                                            <span className=" d-block"> {user.address} </span>
                                            <small className="text-muted ">Address</small>
                                        </Col>
                                    </Row>

                                </Col>

                                <Col md="3">
                                    <img src={user.avatar} alt="profile_image" className="image-profile img-fluid d-inline-block" />

                                    <Buttons className="buttons-red btn-block font-weight-bold mt-2 mb-2 d-block"  type="submit" title="Edit Profile" />

                                </Col>
                                
                            </Row>

                        </div>
                    </Col>
                </Row>

            </Container>
        </Fragment>
    )
}

export default HeroProfile
