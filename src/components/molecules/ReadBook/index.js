import React, { Fragment, useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import { ReactReader } from "react-reader";

// component
import {API} from '../../../configs';
import {Loading} from '../../../components';

const ReadBook = (props) => {
    const {id} = useParams();

    console.log("id read bok", id);

    const [book, setBook] = useState([]);

    const [isLoading, setLoading] = useState(true);

    const loadBook = async () => {
        try {
            const response = await API(`/book/${id}`);
console.log("response read book ", response);
            if (response.status == 200) {
                setBook(response.data.data.book);
                setLoading(false);
            }
        } catch (err) {
            console.log("Your System ",err);
        }
    }

    useEffect(() => {
        loadBook();
    }, [])

    console.log("book from read book", book);

    return isLoading ? (<Loading />) : (
        <Fragment>
                <Row className="vh-100">
                    <Col>
                        <div style={{position:"relative", height: "100%"}}>
                            {" Read Book "}
                            <ReactReader
                            url={book.bookFile}
                            title={book.title}
                            // location={"epubcfi(/6/2[cover]!/6)"}
                            // locationChanged={epubcifi => console.log(epubcifi)}
                            />
                        </div>
                    </Col>
                </Row>

        </Fragment>
    )
}

export default ReadBook
