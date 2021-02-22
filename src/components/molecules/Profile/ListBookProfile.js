import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap';
import {useHistory, useRouteMatch, useLocation} from "react-router-dom";

// component
import {AppContext, API} from '../../../configs';
import Loading from '../../atoms/Loading';

// styling
import "./Profile.css";


const ListBookProfile = () => {

    let { path, url } = useRouteMatch();

    const history = useHistory();

    const [state] = useContext(AppContext);

    const [detailUser, setDetailUser] =useState([]);

    const [isLoading, setIsLoading] = useState(true);

    console.log("list book check url ", url);
    let location = useLocation();
    console.log("location list book", location);

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
            history.push(`/user/book/detail/${id}`)
            // history.push(`${url}/detail/${id}`)
        }
    }

    useEffect(() => {
        const fetchUsers = async ( )=> {
            try {
                const response = await API('/user');

                if (response.status == 200) {
                    setDetailUser(response.data.data.profile);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log("Your System Error : ", err);
            }
        }

        fetchUsers();
    }, []);

    console.log("result detailUser Book", detailUser);

    return isLoading ? (<Loading className="d-flex justify-content-center align-items-center" />) : (
        <Fragment >
            <Container className="mb-3">
                <h3 className="title-list">My Books</h3>
                <Row>
                    {
                        detailUser.purchasesbooks.length === 0 ? (
                            <Col className="d-flex justify-content-center">
                                <h3 className="text-danger text-center">Book Not Found</h3>
                            </Col>
                        ):(
                            detailUser.purchasesbooks.map(book => (
                                <Col sm="12" md="3" key={book.id} style={{cursor: 'pointer'}} onClick={() => book.bookFile}>
                                    <img src={book.thumbnail} alt="list-books" className="img-fluid list-books" />
                                    <p className="font-weight-bold mb-1 mt-3 text-truncate">{book.title}</p>
                                    <p className="text-muted">{book.author}</p>
                                </Col>
                            )).reverse()
                        )
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
