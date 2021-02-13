import React, { Fragment,useState, useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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

// images
import {RightClick, AddList} from '../../../assets'

const AboutDetailBook = () => {

    const {id} = useParams();
    console.log("log id dari about detail book ", id);

    const [state, dispatch] = useContext(AppContext);

    const [book, setBook] = useState([]);

    // const book = Books.find(book => book.id == id);
    const loadBookById = async () => {
        try {
            const response = await API(`/book/${id}`);

            console.log("response getbook by id", response);
            if (response.status == 200) {
                setBook(response.data.data.book);
            }
        } catch (err) {
            console.log("Your System ",err);
        }
    }


    useEffect(() => {
        loadBookById();
    }, [])
    

    console.log("book from get book by id",book);
    const handleListBook = (id) => {

        console.log("id dari about detail book", id)

        dispatch({
            type : "ADD_LIST",
            payload : id
        })
    };
    
    // useEffect(() => {
    //     handleListBook();
    // }, [state.listBook])

    console.log("state dari about detail book ", state);
    console.log("state length dari about detail book ", state.listBook.length);
    return (
        <Fragment>
            <Container>
                <h3 className="title-AboutDetailBook">About This Book</h3>

                <p className="desc-AboutDetailBook">
                    {ReactHtmlParser(book.about)};
                </p>

                <div className="d-flex justify-content-end">
                    {
                        state.listBook.length >= 0 && (

                            book.id != state.listBook[0] && (
                                <Buttons className="buttons-red font-weight-bold mt-2 mb-2 mr-3"  type="submit" title="Add My List" icon={AddList} onClick={() => handleListBook(book.id)} />
                            )

                        )
                    }

                    <Link to={`/user/book/read/${book.id}`}>
                        <Buttons className="buttons-grey font-weight-bold mt-2 mb-2"  type="submit" title="Read Book" icon={RightClick} />
                    </Link>

                </div>

            </Container>
        </Fragment>
    )
}

export default AboutDetailBook
