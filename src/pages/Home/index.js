import React, {Fragment, useContext} from 'react';
import { Row,Col } from 'react-bootstrap';

// Component
import { MainContent, Sidebar } from '../../components';
import {AppContext} from '../../configs';

const Home = () => {
    const [state] = useContext(AppContext);

    console.log("state di home", state);
    return (
        <Fragment>
            <Row className="m-5">
                <Col md="3">
                    <Sidebar />
                </Col>
                <Col md="9">
                    <MainContent />
                </Col>
            </Row>
        </Fragment>
    )
}

export default Home
