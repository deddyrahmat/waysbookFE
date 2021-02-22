import React, { Fragment, useContext } from 'react'
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'
import {
    useRouteMatch,
    useHistory,
    Link
} from "react-router-dom";

// component
import {AppContext} from '../../../configs';

// fakedata
// import {Users} from '../../../FakeData';

// images
import {LogoSidebar, Avatar, Cart} from '../../../assets';

// fonstawesome
import { faUserAlt,faBook } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// styling
import "./Navbars.css";
import { Login, Register } from '..';

const Navbars = () => {

    const history = useHistory();

    const [state] = useContext(AppContext);

    let { path, url } = useRouteMatch();

    const navigateToCart = () => {
        if (state.carts.length > 0) {
            history.push('/user/cart');            
        }
    }
    
    // const user = Users.find(user => user.id == localStorage.getItem('id_user'));

    console.log("auth nav", state.auth);
    console.log("role nav", state.role);

    return (
        <Fragment>
            <Navbar className="mt-3">
                <Container>                    
                    <Navbar.Brand as={Link} 
                        to={
                            state.auth ? 
                                state.role == "user" ? "/user" 
                                : state.role == "admin"  ? "/admin" : '/'
                            : "/"
                        }>
                        <img src={LogoSidebar} alt="Logo" className="img-fluid" />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    
                    {
                        // cek status dari state auth. jika false tampilkan fitur logoin dan register
                        state.auth == false ? 
                            (
                                <Fragment>
                                    <Nav className="ml-auto">
                                        <Login titleModal="Login" classModalButton="buttons-transparent px-5 font-weight-bold text-right mr-3" />
                                        <Register titleModal="Register" classModalButton="buttons-black px-5 font-weight-bold "/>
                                    </Nav>
                                </Fragment>
                            )
                        // jika state auth bernilai true, maka cek state dari role. jika admin tampilkan navbar admin
                        : state.role == "admin" ? (
                                <Navbar.Collapse className="justify-content-end">
                                        <img src={state.avatar === null ? Avatar : state.avatar} alt="Logo" className="navbars-avatar rounded-circle" />
                                        <NavDropdown id="basic-nav-dropdown">

                                            <NavDropdown.Item as={Link} to="/admin/addBook"  >
                                                <FontAwesomeIcon icon={faBook} className="sidebar-icon" /> 
                                                Add Book
                                            </NavDropdown.Item>

                                            <NavDropdown.Divider />
                                            
                                            <NavDropdown.Item as={Link} to="/logout"><FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon text-danger" /> Logout</NavDropdown.Item>
                                        </NavDropdown>
                                </Navbar.Collapse>
                            )
                            // jika state auth bernilai true, maka cek state dari role. jika rolenya user tampilkan navbar user
                            :state.role == 'user' &&
                            (
                                
                                <Fragment>
                                    <Nav className="ml-auto">
                                        <div className="mt-2 mr-3" style={{cursor:"pointer"}} onClick={() => navigateToCart() }>
                                            {/* <Link to={state.carts.length > 0 ? "/user/cart" : "/"} > */}
                                                <img src={Cart} alt="cart" width="35px" height="32px"  />
                                                <div className="count-circle-cart">
                                                    <span className="number-count-cart">
                                                        {state.carts.length}
                                                    </span>
                                                </div>
                                            {/* </Link> */}
                                        </div>
                                        <Navbar.Collapse className="justify-content-end">
                                            <img src={state.avatar === null ? Avatar : state.avatar} alt="Logo" className="navbars-avatar rounded-circle" />
                                            <NavDropdown id="basic-nav-dropdown">

                                                <NavDropdown.Item as={Link} to={`${url}/profile`}  >
                                                    <FontAwesomeIcon icon={faUserAlt} className="sidebar-icon" /> 
                                                    Profile
                                                </NavDropdown.Item>

                                                <NavDropdown.Divider />
                                                
                                                <NavDropdown.Item as={Link} to="/logout"><FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon text-danger" /> Logout</NavDropdown.Item>
                                            </NavDropdown>
                                        </Navbar.Collapse>
                                    </Nav>
                                </Fragment>
                            
                            ) 
                    }
                    


                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Navbars
