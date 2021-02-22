import React, { Fragment,useState, useContext, useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';
import {
    useHistory,
    useParams
} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

// styling
import "./DetailBook.css";

// component
import {AppContext, API} from '../../../configs';
import {Buttons} from '../../';// same ../../index.js take file Buttons
import {Loading} from '../../';

// fontawesome
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutDetailBook = () => {

    const history = useHistory();

    const {id} = useParams();
    console.log("log id dari about detail book ", id);

    const [state, dispatch] = useContext(AppContext);

    const [book, setBook] = useState([]);

    const [isLoading, setLoading] = useState(true);

    // setModal Loading
    const [showModalLoading, setShowModalLoading] = useState(false);
    const handleCloseLoading = () => setShowModalLoading(false);
    const handleShowModalLoading = () => setShowModalLoading(true);
    // setModal Loading

    // const book = Books.find(book => book.id == id);
    const loadBookById = async () => {
        try {
            const response = await API(`/book/${id}`);

            console.log("response getbook by id", response);
            if (response.status == 200) {
                setBook(response.data.data.book);
                setLoading(false);
            }
        } catch (err) {
            console.log("Your System ",err);
        }
    }


    useEffect(() => {
        loadBookById();
    }, []);

    const handleCart = (book) => {
        dispatch({
            type: "INC_CART",
            payload: { price: book.price, id: book.id },
        });
        dispatch({
            type: "SAVE_CART",
        });
        history.push('/user/cart')
    }
    

    console.log("state dari about detail book ", state);

    // const activeAddList = tes.filter(check => check == true );
    // console.log("hasil tes filter", activeAddList);
    return isLoading ? (<Loading />) : (
        <Fragment>
            <Container>
                <h3 className="title-AboutDetailBook">About This Book</h3>

                <p className="desc-AboutDetailBook">
                    {ReactHtmlParser(book.description)}
                </p>

                <div className="d-flex justify-content-end">
                    <Buttons className="buttons-black font-weight-bold mt-2 mb-2 mr-3 btn-secondary" onClick={() => handleCart(book)}  type="submit" title="Add Cart" icon={<FontAwesomeIcon className="ml-3" icon={faShoppingBasket} />}  />
                </div>

            </Container>

            {/* ================================== */}
            {/* modal loading */}
            {/* ================================== */}
            <Modal size="lg" show={showModalLoading} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <Loading />
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default AboutDetailBook
