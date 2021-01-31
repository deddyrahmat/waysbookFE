import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {
    Link,
    useParams
} from "react-router-dom";

// styling
import "./DetailBook.css";

// component
import {AppContext} from '../../../configs';
import {Books} from '../../../FakeData';
import {Buttons} from '../../';// same ../../index.js take file Buttons

// images
import {RightClick, AddList} from '../../../assets'

const AboutDetailBook = () => {

    const {id} = useParams();

    const [state, dispatch] = useContext(AppContext);

    const book = Books.find(book => book.id == id);

    
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
                    {book.description}
                </p>

                <div className="d-flex justify-content-end">
                    {
                        state.listBook.length >= 0 && (

                            book.id != state.listBook[0] && (
                                <Buttons className="buttons-red font-weight-bold mt-2 mb-2 mr-3"  type="submit" title="Add My List" icon={AddList} onClick={() => handleListBook(book.id)} />
                            )

                        )
                    }
                    <Link to="/read-book">
                        <Buttons className="buttons-grey font-weight-bold mt-2 mb-2"  type="submit" title="Read Book" icon={RightClick} />
                    </Link>

                </div>

            </Container>
        </Fragment>
    )
}

export default AboutDetailBook
