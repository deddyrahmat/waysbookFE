import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap';

// component
import {AppContext} from '../../../configs';

// styling
import "./Profile.css";

// FakeData
import {Books} from '../../../FakeData';

const ListBookProfile = () => {

    const [state] = useContext(AppContext);

    const [myListBook, setMyListBook] = useState([]);

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

    console.log("list book ", state.listBook);

    useEffect(() => {
        for (let list = 0; list < state.listBook.length; list++) {
            console.log("log dari for useEffect", list);
            console.log("panjang dari for useEffect", state.listBook.length);
            setMyListBook(Books.filter(book => state.listBook[list] == book.id))
            console.log("hasil akhir", Books.filter(book => state.listBook[list] == book.id));
        };
    }, [state.listBook])

    let lists= Books.filter(book => state.listBook[0] == book.id);

    console.log("result li", lists);
    console.log("result myList Book", myListBook);

    return (
        <Fragment>
            <Container >
                <h3 className="title-list">My List Books</h3>
                <Row>
                    {
                        myListBook.map(book => (
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

export default ListBookProfile
