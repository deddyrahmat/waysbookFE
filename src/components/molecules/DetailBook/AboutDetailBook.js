import React, { Fragment,useState, useContext, useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';
import {
    Link,
    useParams
} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

// styling
import "./DetailBook.css";

// component
import {AppContext, API} from '../../../configs';
import {Buttons} from '../../';// same ../../index.js take file Buttons
import {Loading} from '../../';

// images
import {RightClick, AddList} from '../../../assets'

const AboutDetailBook = () => {

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
    }, [])
    

    console.log("book from get book by id",book);
    const handleListBook = async (id) => {

        const body = JSON.stringify({ id });

        const config = {
            headers: {
            "Content-Type": "application/json",
            },
        };

        console.log("id dari about detail book", id)
        const response = await API.post('/bookuser', body, config);
        console.log("response add list", response);
        handleShowModalLoading();
        if (response.status == 200) {
            dispatch({
                type : "ADD_LIST",
                payload : response.data.data.user.Books
            })
            handleCloseLoading();
        }
    };
    
    useEffect(() => {
    }, [state.listBook])

    console.log("state dari about detail book ", state);
    console.log("state length dari about detail book ", state.listBook.length);

    const activeAddList = state.listBook.map(list => book.id == list.id).filter(check => check == true );
    console.log("hasil tes map", activeAddList);

    // const activeAddList = tes.filter(check => check == true );
    // console.log("hasil tes filter", activeAddList);
    return isLoading ? (<Loading />) : (
        <Fragment>
            <Container>
                <h3 className="title-AboutDetailBook">About This Book</h3>

                <p className="desc-AboutDetailBook">
                    {ReactHtmlParser(book.about)}
                </p>

                <div className="d-flex justify-content-end">
                    {
                        state.listBook.length >= 0 && (

                            // state.listBook.map(list => book.id != list.id)
                            activeAddList.length == 0  ? (
                                <Buttons className="buttons-red font-weight-bold mt-2 mb-2 mr-3"  type="submit" title="Add My List" icon={AddList} onClick={() => handleListBook(book.id)} />
                            ):null

                        )
                    }

                    <Link to={`/user/book/read/${book.id}`}>
                        <Buttons className="buttons-grey font-weight-bold mt-2 mb-2"  type="submit" title="Read Book" icon={RightClick} />
                    </Link>

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
