import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// component
import {AppContext, API} from '../../../configs';
import { Avatar,Envelope,Gender,Phone, Maps } from '../../../assets';
import Loading from '../../atoms/Loading';

// styling
import "./Profile.css";
import { Buttons } from '../../atoms';

const HeroProfile = () => {
    const [state] = useContext(AppContext);

    const [detailUser, setDetailUser] =useState([]);

    const [isLoading, setIsLoading] = useState(true);

    // const user = Users.find(user => user.id == localStorage.getItem('id_user'));

    useEffect(() => {
        const fetchUsers = async ( )=> {
            try {
                const response = await API('/user');

                if (response.status == 200) {
                    setDetailUser(response.data.data.user);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log("Your System Error : ", err);
            }
        }

        fetchUsers();
    }, []);

    console.log("state dari profile", state);
    console.log("user dari profile", detailUser);
    return isLoading ? (<Loading />) : (
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
                                            <span className=" d-block"> {detailUser.email}</span>
                                            <small className="text-muted ">Email</small>
                                        </Col>
                                    </Row>

                                    <Row className="height-list-profile">
                                        <Col md="1" className=" d-flex justify-content-end align-items-center">
                                            <img src={Gender} alt="gender" />
                                        </Col>
                                        <Col md="11">
                                            <span className=" d-block"> {detailUser.gender}</span>
                                            <small className="text-muted ">Gender</small>
                                        </Col>
                                    </Row>
                                    
                                    <Row className="height-list-profile">
                                        <Col md="1" className=" d-flex justify-content-end align-items-center">
                                            <img src={Phone} alt="gender" />
                                        </Col>
                                        <Col md="11">
                                            <span className=" d-block"> {detailUser.phone}</span>
                                            <small className="text-muted ">Mobile phone</small>
                                        </Col>
                                    </Row>

                                    <Row className="height-list-profile">
                                        <Col md="1" className=" d-flex justify-content-end align-items-center">
                                            <img src={Maps} alt="gender" />
                                        </Col>
                                        <Col md="11">
                                            <span className=" d-block"> {detailUser.address} </span>
                                            <small className="text-muted ">Address</small>
                                        </Col>
                                    </Row>

                                </Col>

                                <Col md="3">
                                    <img src={detailUser.avatar === null ? Avatar : detailUser.avatar} alt="profile_image" className="image-profile img-fluid d-inline-block" />

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
