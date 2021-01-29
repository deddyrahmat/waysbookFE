import React, { Fragment, useContext, useState } from 'react'
import { Col, Container, Row, Modal } from 'react-bootstrap'

// component
import {AppContext} from '../../../configs'
import {HeroImage} from '../';


// FakeData
import {Books} from '../../../FakeData';

// stying
import './MainContent.css';

const MainContent = () => {

    const [state] = useContext(AppContext);

    // ======================================================
    // set modal for login failed
    const [detailBookFailed, setDetailBookFailed] = useState(false);
    const [messageFailed, setMessageFailed] = useState("");
    
    const handleCloseDetailBookFailed = () => setDetailBookFailed(false);
    const handleDetailBookFailed = () => setDetailBookFailed(true);
    // set modal for DetailBook failed
    // ======================================================

    const handleStatusPay = () => {
        if (!state.payment) {
            handleDetailBookFailed();
            setMessageFailed("please make a payment to read the latest books");
        }
    }


    return (
        <Fragment>
            <Container >
                {/* <img src={HeroImage} alt="heroimage" className="img-fluid" /> */}
                <HeroImage />
                <h3 className="title-list">List Books</h3>
                <Row>
                    {
                        Books.map(book => (
                            <Col sm="12" md="3" key={book.id} style={{cursor: 'pointer'}} onClick={handleStatusPay}>
                                <img src={book.image} alt="list-books" className="img-fluid list-books" />
                                <p className="font-weight-bold mb-1 mt-3 text-truncate">{book.title}</p>
                                <p className="text-muted">{book.author}</p>
                            </Col>
                        )).reverse()
                    }
                </Row>
            </Container>

            {/* modal failed */}
            <Modal size="lg" show={detailBookFailed} onHide={handleCloseDetailBookFailed} className="d-flex justify-content-center align-items-center">
                <Modal.Body >
                    <p className="modal-failed">{messageFailed}</p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default MainContent
