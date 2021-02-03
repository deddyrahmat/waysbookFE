import React, { Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
    useParams
} from "react-router-dom";

// component
import {Books} from '../../../FakeData';

// styling
import './DetailBook.css';

const InfoDetailBook = () => {
    const {id} = useParams();
    console.log("log id dari info detail book ", id);
    const book = Books.find(book => book.id == id);
    
    return (
        <Fragment>
            <Container>
                <Row>
                    <Col md="5">
                        <img src={book.image} alt="detail-book" className="image-detail-book" />
                    </Col>
                    <Col md="7" className="mt-1">
                        <div className="container-detail-book">
                            <h2 className="title-detail-book m-0 p-0">{book.title}</h2>
                            <small className="author-detail-book">{book.author}</small>
                        </div>
                        
                        <div className="container-detail-book">
                            <h2 className="date-detail-book size-detail-book">Publication Date</h2>
                            <small className="sub-detail-book">{book.publication}</small>
                        </div>
                        
                        <div className="container-detail-book">
                            <h2 className="pages-detail-book size-detail-book">Page</h2>
                            <small className="sub-detail-book">{book.pages}</small>
                        </div>
                        
                        <div className="container-detail-book">
                            <h2 className="isbn-detail-book size-detail-book">ISBN</h2>
                            <small className="sub-detail-book">{book.isbn   }</small>
                        </div>



                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default InfoDetailBook
