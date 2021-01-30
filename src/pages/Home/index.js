import React, {Fragment, useContext} from 'react';
import { Row,Col } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

// Component
import {PrivateRoute} from '../../configs';
import { MainContent, Profile, Sidebar, Subscribe } from '../../components';
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
                            <PrivateRoute exact path="/home" component={MainContent} />
                            <PrivateRoute exact path="/subscribe" component={Subscribe} />
                            <PrivateRoute exact path="/profile" component={Profile} />
                        </Switch>
                    </Col>
                </Row>
            </Router>
        </Fragment>
    )
}

export default Home
