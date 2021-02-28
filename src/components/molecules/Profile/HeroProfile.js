import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

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

    const [imageProfile, setImageProfile] = useState(null);

    const [image, setImage] = useState({ preview: "", raw: "" });

    const [profile, setprofile] = useState({
        fullname : "",
        email : "",
        gender : "",
        phone : "",
        address : ""
    });

    const handleChangeProfile = (e) => {
        setprofile({...profile,  [e.target.name] : e.target.value})
    }

    // setModal Profile
    const [showModalProfile, setShowModalProfile] = useState(false);
    const toogleProfile = () => setShowModalProfile(!showModalProfile);
    // setModal Profile

     // modal post Loading
    const [modalLoading, setModalLoading] = useState(false);
    const toggleLoading = () => setModalLoading(!modalLoading);
    // modal post Loading

    // modal Book Success
    const [modalUpdate, setModalUpdate] = useState(false);    
    const toggleUpdate = () => setModalUpdate(!modalUpdate);
    // modal Book Success

    // ==============================================================
    // image book
    
    const handleImageProfile = (e) => {
        if (e.target.files.length) {
            setImage({
                preview : URL.createObjectURL(e.target.files[0]),
                raw : e.target.files[0]
            })
        }

        console.log("image", image);
        console.log(" e.target.files image",  e.target.files[0].type);
    }
    // image book
    // ==============================================================
    

    // const user = Users.find(user => user.id == localStorage.getItem('id_user'));

    useEffect(() => {
        const fetchUsers = async ( )=> {
            try {
                const response = await API('/user');

                if (response.status == 200) {
                    setDetailUser(response.data.data.profile);

                    setprofile({
                        fullname : response.data.data.profile.fullname,
                        email : response.data.data.profile.email,
                        gender : response.data.data.profile.gender,
                        phone : response.data.data.profile.phone,
                        address : response.data.data.profile.address
                    }
                    );
                    setIsLoading(false);
                }
            } catch (err) {
                console.log("Your System Error : ", err);
            }
        }

        fetchUsers();
    }, [showModalProfile]);

    const handleProfile = (id) => {
        try {
            console.log("id Profile ", id);
            setImageProfile(id);
            toogleProfile();
        } catch (err) {
            console.log("Your System ",err);
        }
    }

    const {
        fullname,
        email,
        gender,
        phone,
        address,
    } = profile;

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            const body = new FormData();

            body.append("fullname", fullname);
            body.append("email", email);
            body.append("gender", gender);
            body.append("phone", phone);
            body.append("address", address);

            if (image.raw) {
                body.append("avatar", image.raw);
            }

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                }
            }

            const response = await API.patch("/user", body, config);

            console.log("response profile ", response);
            toggleUpdate(true);
            // toggleLoading();
            if (response.status == 200) {
                toogleProfile(false);
                // toggleLoading();
                toggleUpdate();
            }
        } catch (err) {
            console.log("Your System ",err);
        }
    }

    console.log("state dari profile", state);
    console.log("user dari profile", detailUser);
    console.log("input profile", profile);
    return isLoading ? (<Loading className="d-flex justify-content-center align-items-center" />) : (
        <Fragment>
            <Container className="height-content mb-3">
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

                                    <Buttons className="buttons-red btn-block font-weight-bold mt-2 mb-2 d-block"  onClick={() => {handleProfile(detailUser.id)}} title="Edit Profile" />

                                </Col>
                                
                            </Row>

                        </div>
                    </Col>
                </Row>

            </Container>

            {/* ================================== */}
                {/* modal response Profile */}
                {/* ================================== */}
                <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModalProfile} onHide={toogleProfile}
                >
                {/* <Modal size="lg" show={showModalProfile} onHide={toogleProfile} className="d-flex justify-content-center align-items-center"> */}
                    <Modal.Body >
                        {/* onSubmit={handleSubmitUpdate} */}

                        <Container>
                            <Form onSubmit={handleSubmitUpdate}>

                                <Form.Group>
                                    {/* untuk input file id label for == id input file untuk menyesuaikkan form yang ingin diproses */}
                                    <Form.Label htmlFor="payment" className=" d-flex justify-content-center">
                                        <div className="card-image-profile">

                                            {
                                                image.preview ? (
                                                    <img src={image.preview} alt="Book" className=" avatar-profile mb-3 cursor-pointer" onChange={handleImageProfile}></img>
                                                ) : (
                                                    <img src={detailUser.avatar === null ? Avatar : detailUser.avatar} alt="avatar" className="avatar-profile  mb-3 cursor-pointer" />
                                                )
                                            }

                                            <p className="text-primary cursor-pointer">Change Avatar</p>

                                        </div>
                                    </Form.Label>

                                    <Form.File id="payment" label="Example file input" className="d-none" onChange={handleImageProfile} />                
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Fullname
                                    </Form.Label>
                                    <Col sm={10}>
                                    <Form.Control type="text" placeholder="fullname" name="fullname" value={profile.fullname} onChange={handleChangeProfile} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Email
                                    </Form.Label>
                                    <Col sm={10}>
                                    <Form.Control type="email" placeholder="Email" name="email" value={profile.email} onChange={handleChangeProfile} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Gender
                                    </Form.Label>
                                    <Col sm={10}>
                                    <Form.Control as="select" name="gender" onChange={handleChangeProfile}>
                                        <option> - - - </option>
                                        <option value="Laki-laki" selected={profile.gender === "Laki-laki" ? true : null} >Laki-Laki</option>
                                        <option selected={profile.gender === "Perempuan" ? true : null}>Perempuan</option>
                                    </Form.Control>
                                    {/* <Form.Control type="text" placeholder="Gender" value={profile.gender} /> */} {/* <Form.Control type="text" placeholder="Gender" value={profile.name/> */}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Phone
                                    </Form.Label>
                                    <Col sm={10}>
                                    <Form.Control type="text" placeholder="Phone" name="phone" value={profile.phone} onChange={handleChangeProfile} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Address
                                    </Form.Label>
                                    <Col sm={10}>
                                    <Form.Control type="text" placeholder="Address" name="address" value={profile.address} onChange={handleChangeProfile} />
                                    </Col>
                                </Form.Group>

                                <Modal.Footer>
                                    <Buttons className="buttons-black font-weight-bold mt-2 mb-2 d-block rounded"  title="Close"
                                    onClick={() => {
                                        toogleProfile();
                                        setImage({ preview: "", raw: "" });
                                    }}  />
                                    <Buttons className="buttons-red font-weight-bold mt-2 mb-2 d-block" type="submit" title="Simpan" />
                                </Modal.Footer>
                            </Form>
                        </Container>
                    </Modal.Body>
                </Modal>

                <Modal size="lg" show={modalUpdate} onHide={toggleUpdate} className="d-flex justify-content-center align-items-center w-100">
                    <Modal.Body >
                        <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Update Profile Success</p>
                    </Modal.Body>
                    {
                        modalUpdate == false ? (
                        <Redirect to="/user/profile" />
                        ) : null
                    }
                </Modal>

                {/* =========================== */}
                {/* Modal Loading */}
                {/* =========================== */}
                <Modal size="lg" show={modalLoading} onHide={toggleLoading} className="d-flex justify-content-center align-items-center w-100">
                    <Modal.Body >
                        <Loading />
                    </Modal.Body>
                </Modal>
        </Fragment>
    )
}

export default HeroProfile
