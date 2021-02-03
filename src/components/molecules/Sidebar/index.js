import React, { Fragment, useContext } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import {
    useRouteMatch,
    Link
} from "react-router-dom";

// component
import {Users} from '../../../FakeData';
import {AppContext} from '../../../configs';

// images
import {LogoSidebar} from '../../../assets'

// styling
import "./Sidebar.css";

// font awesome
// get our fontawesome imports
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {

    let { path, url } = useRouteMatch();

    const [state] = useContext(AppContext);
    
    // cari data user yang sesuai dengan user yang login dengan membandingkannya di localstorage id 
    const user = Users.find(user => user.id == localStorage.getItem('id_user'));

    return (
        <Fragment>
            <Container>
                <Row className="d-flex justify-content-center mt-n2 mb-3">
                    <Col className="text-center">
                        <Link to="/user" className="sidebar-link">
                            <img src={LogoSidebar} alt="logo" />
                        </Link>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center mb-4">
                    <Col className="text-center ">
                        <img src={user.avatar} alt="avatar" className="sidebar-avatar rounded-circle shadow" />
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center mb-4">
                    <Col className="text-center ">
                        <h3 className="sidebar-fullname">{user.fullname}</h3>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col className="text-center ">
                        {
                            state.payment ? (
                                <p className="sidebar-status-subscribed">Subscribed</p>
                            ): (
                                <p className="sidebar-status-not">Not Subscribed Yet </p>
                            )
                        }
                    </Col>
                </Row>
                
                <hr className="sidebar-hr"></hr>

                <Row className="d-flex justify-content-center sidebar-menu-length">
                    <Col>
                    {/* <Link to={`${url}/profile`}>Profile</Link> */}
                        <Link to={`${url}/profile`} className="sidebar-link">
                            <p className="sidebar-menu"> <FontAwesomeIcon icon={faUser} className="sidebar-icon" />  Profile</p>                            
                        </Link>
                    </Col>
                </Row>

                <Row className="d-flex justify-content-center mb-5">
                    <Col>
                        <Link to={`${url}/subscribe`} className="sidebar-link">
                            <p className="sidebar-menu"> <FontAwesomeIcon icon={faFileInvoiceDollar} className="sidebar-icon" />  Subscribe</p>
                        </Link>
                    </Col>
                </Row>

                <hr className="sidebar-hr"></hr>

                <Row className="d-flex justify-content-center sidebar-menu-length">
                    <Col>
                        <Link to="/" className="sidebar-link">
                            <p className="sidebar-menu"> <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />  Logout</p>
                        </Link>
                    </Col>
                </Row>

            </Container>
        </Fragment>
    )
}

export default Sidebar
