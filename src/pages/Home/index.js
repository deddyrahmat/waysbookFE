import React, {Fragment, useContext} from 'react';
import { Row,Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Component
import {PrivateRoute} from '../../configs';
import { MainContent, Sidebar, Subscribe } from '../../components';
import {AppContext} from '../../configs';

const Home = () => {
    const [state] = useContext(AppContext);

    console.log("state di home", state);
    return (
        <Fragment>
            <Router>
                <Row className="m-5">
                    <Col md="3">
                        <Sidebar />
                    </Col>
                    <Col md="9">
                        <Switch>
                            <PrivateRoute exact path="/subscribe" component={Subscribe} />
                            <PrivateRoute exact path="/home" component={MainContent} />
                        </Switch>
                    </Col>
                </Row>
            </Router>
        </Fragment>
    )
}

export default Home
