import { Fragment, useEffect, useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

import {AppContext, API} from '../../../configs';

import {Remove} from '../../../assets';
import {Loading} from '../../../components';

import './Cart.css';

const BookCart = ({dataCart}) => {

    const [state, dispatch] = useContext(AppContext);
    const [book, setBook] = useState(null);

    const [isLoading, setLoading] = useState(true);

    console.log("props cart", dataCart);

    useEffect(() => {
        dataCart && (
            (async () => {
                const response = await await API(`/book/${dataCart.id}`);
                if (response.status == 200) {
                    const result = response.data.data.book;
                    console.log("result book cart", result);
                    setBook(result);                    
                    setLoading(false);
                }      
            })()
        )
    },[dataCart])

    const saveCart = () => {
        dispatch({
        type: "SAVE_CART",
        });
        dispatch({
        type: "GET_TOTAL_CART",
        });
    };

    // const onInc = () => {
    //     dispatch({
    //     type: "INC_CART",
    //     payload: dataCart,
    //     });
    //     saveCart();
    // };

    // const onDec = () => {
    //     if (dataCart.qty > 1) {
    //     dispatch({
    //         type: "DEC_CART",
    //         payload: dataCart,
    //     });
    //     } else {
    //     dispatch({
    //         type: "REMOVE_CART",
    //         payload: dataCart,
    //     });
    //     }
    //     saveCart();
    // };

    const onRemove = () => {
        dispatch({
            type: "REMOVE_CART",
            payload: dataCart,
        });
        saveCart();
    };

    console.log("book cart", book);


    return isLoading ? (<Loading className="d-flex justify-content-center align-items-center" />) : (
        <Fragment>
            <Row key={book.id} className="mb-2">
                <Col md="3">
                    <img src={book.thumbnail} alt="book" className="img-fluid" />
                </Col>
                <Col md="7">
                    <p className="text-title-book">{book.title}</p>

                    {/* <div className="d-flex">
                        <span className="cursor-pointer" onClick={onDec}>
                        -
                        </span>

                        <div className="align-center px-3">
                            <p className="cart-qty-num">{dataCart.qty}</p>
                        </div>

                        <span className="cursor-pointer" onClick={onInc}>
                        +
                        </span>
                    </div> */}

                    <p className="text-reguler font-italic text-capitalize">By. {book.author}</p>
                    <p className="text-price">
                        <NumberFormat 
                            value={book.price} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp. '} 
                            renderText={
                                value => <small className="price-book d-block mt-3">{value}</small>
                            } />
                    </p>
                </Col>
                <Col md="1">
                    <img src={Remove} alt="remove" className="cursor-pointer" onClick={onRemove} />
                </Col>
            </Row>
        </Fragment>
    )
}

export default BookCart
