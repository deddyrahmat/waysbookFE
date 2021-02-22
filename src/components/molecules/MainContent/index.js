import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {useHistory, useRouteMatch,} from "react-router-dom";
import Slider from "react-slick";
import ReactHtmlParser from 'react-html-parser';
import NumberFormat from 'react-number-format';

// component
import {AppContext, API} from '../../../configs'
import {Loading} from '../../../components';
import {Buttons} from '../../index'

// FakeData
// import {Books} from '../../../FakeData';

// stying
import './MainContent.css';
// import { Buttons } from '../../atoms';
// import { Hero1, Hero2 } from '../../../assets';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "none"}}
        onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
    );
}

const MainContent = (props) => {

    const history = useHistory();
    
    let { path, url } = useRouteMatch();
    
    const [state, dispatch] = useContext(AppContext);

    const [books, setBooks] = useState([]);

    const [isLoading, setLoading] = useState(true);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        centerMode: true,
        centerPadding: '30%',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    const loadBook = async () => {
        try {
            const response = await API('/books');

            if (response.status == 200) {
                setBooks(response.data.data.promoBooks);
                setLoading(false);
            }
        } catch (err) {
            console.warn("Your System ", err)
        }
    }
    useEffect(() => {
        loadBook();
    }, [])

    const handleListBook = (id) => {
        if (!state.auth) {
            dispatch({
                type: "MODAL_LOGIN",
                payload : !state.modalLogin
            });
        }else{
            history.push(`${url}/book/detail/${id}`)
        }
    }

    const handleCartBook = async (book) => {
        if (!state.auth) {
            dispatch({
                type: "MODAL_LOGIN",
                payload : !state.modalLogin
            });
        }else{
            dispatch({
                type: "INC_CART",
                payload: { price: book.price, id: book.id },
            });
            dispatch({
                type: "SAVE_CART",
            });
            history.push('/user/cart')
        }
    }

    return isLoading ? (<Loading className="d-flex justify-content-center align-items-center" />) : (
        <Fragment>
            <div className="hero-main d-flex justify-content-center align-items-center flex-auto">
                <div className="hero1"></div>

                <div className="text-center mt-n5">
                    <p className="desc-main-top">
                        With us, you can shop online & help
                    </p>
                    <p className="desc-main-sub">
                        save your high street at the same time
                    </p>
                </div>

                <div className="hero2"></div>
            </div>
            
            <div className="position-slider">
                <Slider {...settings}>
                    {
                        books.length > 0 ? (
                            books.map(book => (
                                <div className="d-flex align-items-stretch" key={book.id} >
                                    <img src={book.thumbnail} alt="slider" className="img-fluid img-slider" />
                                    <Card className="card-slider">
                                        <Card.Body>
                                            <Card.Title>{book.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted font-italic">By. {book.author}</Card.Subtitle>
                                            <Card.Text className="text-truncate">
                                                {ReactHtmlParser(book.description)}
                                                <NumberFormat 
                                                    value={book.price} 
                                                    displayType={'text'} 
                                                    thousandSeparator={true} 
                                                    prefix={'Rp. '} 
                                                    renderText={
                                                        value => <small className="price-book d-block mt-3">{value}</small>
                                                    } />
                                            </Card.Text>
                                            <div className="d-flex align-items-end">
                                                <Buttons title="Add to Cart" className="buttons-black px-5" onClick={() => handleCartBook(book)} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ) )
                        ) : null
                    }
                </Slider>
            </div>

            <Container className="mt-5 mb-5 ">
                    <h3 className="title-list">List Books</h3>
                    <Row >
                        {   
                            books.length > 0 ? (
                                books.map(book => (
                                    <Col sm="12" md="3" key={book.id} style={{cursor: 'pointer', alignContent:"center"}} onClick={() => handleListBook(book.id)}>
                                        <img src={book.thumbnail} alt="list-books" className="img-fluid list-books" />
                                        <p className="font-weight-bold mb-1 mt-3 text-wrap text-capitalize">{book.title}</p>
                                        <p className="text-muted font-italic text-capitalize">By. {book.author}</p>
                                        <NumberFormat 
                                        value={book.price} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        prefix={'Rp. '} 
                                        renderText={
                                            value => <small className="price-book mt-3">{value}</small>
                                        } />
                                    </Col>
                                )).reverse()
                            ) : (
                                <Col md="12" className="text-center mb-3">
                                    <h3 className="text-danger">Data Not Found</h3>
                                </Col>
                            )
                        }
                    </Row>
                </Container>

        </Fragment>
    )
}

export default MainContent
