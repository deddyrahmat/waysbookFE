import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ReactReader } from "react-reader";


const ReadBook = (props) => {
    return (
        <Fragment>
                <Row className="vh-100">
                    <Col>
                        <div style={{position:"relative", height: "100%"}}>
                            {" testing aja bung "}
                            <ReactReader
                            url={"/Books/alice.epub"}
                            title={"Alice in wonderland"}
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
