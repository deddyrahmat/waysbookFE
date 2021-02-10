import React, { Fragment, useContext } from 'react'
import { Container, Navbar, NavDropdown } from 'react-bootstrap'
import {Link} from 'react-router-dom'

// component
import {AppContext} from '../../../configs';

// fakedata
// import {Users} from '../../../FakeData';

// images
import {LogoSidebar, Avatar} from '../../../assets';

// fonstawesome
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// styling
import "./Navbars.css";

const Navbars = () => {


    const [state] = useContext(AppContext);
    
    // const user = Users.find(user => user.id == localStorage.getItem('id_user'));

    // console.log("user nav", user);

    return (
        <Fragment>
            <Navbar className="mt-3">
                <Container>                    
                    <Navbar.Brand as={Link} to="/admin">
                        <img src={LogoSidebar} alt="Logo" className="img-fluid" />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    
                    <Navbar.Collapse className="justify-content-end">
                            <img src={state.avatar === null ? Avatar : state.avatar} alt="Logo" className="navbars-avatar rounded-circle" />
                            <NavDropdown id="basic-nav-dropdown">

                                <NavDropdown.Item as={Link} to="/admin/addBook"  >
                                    <FontAwesomeIcon icon={faBook} className="sidebar-icon" /> 
                                    Add Book
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                
                                <NavDropdown.Item as={Link} to="/"><FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon text-danger" /> Logout</NavDropdown.Item>
                            </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Navbars
