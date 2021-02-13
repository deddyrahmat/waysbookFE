import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Col, Container, Row, Modal } from 'react-bootstrap';
import {useHistory, useRouteMatch,} from "react-router-dom";

// component
import {AppContext, API} from '../../../configs'
import {HeroImage} from '../';
import {Loading} from '../../../components';


// FakeData
// import {Books} from '../../../FakeData';

// stying
import './MainContent.css';

const MainContent = (props) => {

    const history = useHistory();
    
    let { path, url } = useRouteMatch();
    
    const [state] = useContext(AppContext);

    const [books, setBooks] = useState([]);

    const [isLoading, setLoading] = useState(true);

    // ======================================================
    // set modal for login failed
    const [detailBookFailed, setDetailBookFailed] = useState(false);
    const [messageFailed, setMessageFailed] = useState("");
    
    const handleCloseDetailBookFailed = () => setDetailBookFailed(false);
    const handleDetailBookFailed = () => setDetailBookFailed(true);
    // set modal for DetailBook failed
    // ======================================================
    

    const handleListBook = (id) => {
        if (!state.payment) {
            handleDetailBookFailed();
            setMessageFailed("please make a payment to read the latest books");
        }else{
            history.push(`${url}/book/detail/${id}`)
        }
    }

    const loadBook = async () => {
        try {
            const response = await API('/books');
            console.log("response books", response);
            if (response.status == 200) {
                setBooks(response.data.data.books);
                setLoading(false);
            }
        } catch (err) {
            console.log("Your System ", err);
        }
    }

    useEffect(() => {
        loadBook();
    }, [])


    console.log("match from home", props.matchRouter);
    console.log("url from maincontent", url);

    console.log("books ", books);
    return isLoading ? (<Loading className="d-flex justify-content-center align-items-center" />) : (
        <Fragment>
            <Container >

                <HeroImage image={books[books.length - 1].thumbnail}  />

                
                <h3 className="title-list">List Books</h3>
                <Row>
                    {
                        books.map(book => (
                            <Col sm="12" md="3" key={book.id} style={{cursor: 'pointer'}} onClick={() => handleListBook(book.id)}>
                                <img src={book.thumbnail} alt="list-books" className="img-fluid list-books" />
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
