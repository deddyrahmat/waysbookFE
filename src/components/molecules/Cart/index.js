import { Fragment,useEffect, useContext,useState } from 'react';
import { Col, Container, Row, Modal, Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import {Redirect} from 'react-router-dom';


import {AppContext, API} from '../../../configs';

import BookCart from './BookCart';
// import { Uploads } from '../../atoms';
import {Buttons} from '../../';// same ../../index.js take file Buttons

// styling
import './Cart.css';

// images
import { Payment } from '../../../assets';
import { Loading } from '../../atoms';

const Cart = () => {

    const [state, dispatch] = useContext(AppContext);

    const [image, setImage] = useState({ preview: "", raw: "" });
    
    useEffect(() => {
        dispatch({
        type: "GET_TOTAL_CART",
        });
    }, [dispatch]);
    

    // ==============================================================
    // image book
    
    const handleImageTransaction = (e) => {
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

    // state modal image
    const [imageModal, setImageModal] = useState(false);
    const toggleImage = () => setImageModal(!imageModal);
    // state modal image

    // modal post failed
    const [modalFailed, setModalFailed] = useState(false);
    const toggleFailed = () => setModalFailed(!modalFailed);
    // modal post failed

    // modal post Loading
    const [modalLoading, setModalLoading] = useState(false);
    const toggleLoading = () => setModalLoading(!modalLoading);
    // modal post Loading

    // modal Book Success
    const [modalBook, setModalBook] = useState(false);    
    const toggleModalBook = () => setModalBook(!modalBook);
    // modal Book Success

    const onPay = async () => {
        try {

            const books = JSON.stringify(state.carts.map(cart =>
                {
                    return {
                        id : cart.id
                    }
                }
            ))

            console.log("data books id",books);

            const body = new FormData();
            body.append("books",books)
            body.append("totalPayment",state.totalCart.total)
            if (image.raw) {
                body.append("attachment", image.raw);
                // body.append("image", imagePost[0]);
            }else{
                return setModalFailed(true);
            }

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                }
            }

            toggleLoading();
            const response = await API.post('/transaction', body, config);

            console.log("response book ", response);
            if (response.status == 200) {
                console.log("value loading true ", modalLoading);
                toggleLoading();
                dispatch({
                    type: "RESET_CART",
                });
                return toggleModalBook();
            }
        } catch (err) {
            console.log("value loading false ", modalLoading);
            console.log("Your System ", err);
            return toggleLoading();
        }
    }

    console.log("state cart",state.carts);
    console.log("state total cart",state.totalCart);
    return (
        <Fragment>
            <div className="hero-page d-flex  align-items-center flex-auto">
                <div className="hero1"></div>
                <div className="hero2"></div>
            </div>
            <Container className="height-content mb-3">
                <Container>
                    <h3 className="text-title-cart">My Cart</h3>

                    <p>Review Your Order</p>
                    <Row>
                        <Col md="7">
                            <hr></hr>
                            {
                                state.carts.length > 0 && (
                                    state.carts.map(cart => (
                                        <BookCart dataCart={cart} key={cart.id} />
                                    ))
                                )
                            }
                        </Col>
                        <Col md="5">
                            <hr></hr>
                            <div className="d-flex justify-content-between text-reguler ">
                                <p >Subtotoal</p>
                                <span >
                                    <NumberFormat 
                                    value={state.totalCart.subtotal} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'Rp. '} 
                                    renderText={
                                        value => <small className="text-reguler">{value}</small>
                                    } />
                                </span>
                            </div>
                            <div className="d-flex justify-content-between text-reguler">
                                <p>QTY</p>
                                <span>{state.totalCart.qty}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between text-price">
                                <p>Total</p>
                                <span>
                                    <NumberFormat 
                                    value={state.totalCart.total} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'Rp. '} 
                                    renderText={
                                        value => <small className="text-price">{value}</small>
                                    } />
                                </span>
                            </div>

                            <div className="d-flex justify-content-end mt-3">

                                <Form.Group>
                                    {/* untuk input file id label for == id input file untuk menyesuaikkan form yang ingin diproses */}
                                    <Form.Label htmlFor="payment" className="attachment-payment">
                                        <img src={Payment} alt="attachment" className="img-fluid"  />
                                        <Form.Text id="passwordHelpBlock" muted>
                                            Attache of transaction
                                        </Form.Text>
                                    </Form.Label>

                                    <Form.File id="payment" label="Example file input" className="d-none" onChange={handleImageTransaction} />                

                                    <Form.Text id="passwordHelpBlock" muted>
                                        Max size of File is 5 MB.
                                    </Form.Text>
                                </Form.Group>
                                {/* <Uploads onChange={handleImageTransaction} className="w-25 add-book" title="Thumbnile Book" Subscribe="Aktif" /> */}


                            </div>

                            <div className="d-flex justify-content-end mb-3">
                                {
                                    image.preview && (
                                        <img src={image.preview} alt="Book" width="50px" height="50px" className="text-center ml-3 mt-2" style={{cursor:"pointer"}} onClick={toggleImage} onChange={handleImageTransaction}></img>
                                        )
                                }
                            </div>

                            <div className="d-flex justify-content-end">
                                <Buttons className="buttons-black buttons-pay font-weight-bold mt-2 mb-2 w-50"  type="submit" title={"Pay"} onClick={onPay} />
                            </div>

                        </Col>
                    </Row>
                </Container>
            </Container>

            <Modal size="lg" show={imageModal} onHide={toggleImage} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <img src={image.preview} alt="attach file" className="text-center img-fluid" />
                </Modal.Body>
            </Modal>

            <Modal size="lg" show={modalLoading} onHide={toggleLoading} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <Loading />
                </Modal.Body>
            </Modal>

            <Modal size="lg" show={modalFailed} onHide={toggleFailed} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <span className="text-danger">Upload Failed</span>
                </Modal.Body>
            </Modal>

            <Modal size="lg" show={modalBook} onHide={toggleModalBook} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>
                        Thank you for ordering in us, please wait 1 x 24 hours to verify you order
                    </p>
                </Modal.Body>
                {
                    modalBook == false ? (
                    <Redirect to="/user/profile" />
                    ) : null
                }
            </Modal>
        </Fragment>
    )
}

export default Cart
