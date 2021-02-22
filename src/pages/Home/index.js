import React, {Fragment, useContext, useEffect, useState} from 'react';
import { Row,Col,  Alert } from 'react-bootstrap';
import {
    // BrowserRouter as Router,
    Switch,
    useRouteMatch,
    useLocation,
    useHistory,
    useParams
} from "react-router-dom";

// Component
import {PrivateRoute, API} from '../../configs';
import { DetailBook, MainContent, Profile, Subscribe, ReadBook, Navbars, Cart } from '../../components';
import {AppContext} from '../../configs';
import { LogoSidebar } from '../../assets';
// import ReadBook from "../../components/molecules/DetailBook/ReadBook"

const Home = () => {

    // let paramId = useParams();

    // let history = useHistory();

    // let location = useLocation();

    // const [state, dispatch] = useContext(AppContext);

    let { path, url } = useRouteMatch();
    
    // ==============================================================================
    // responseUserPayment
    // ==============================================================================

    return (
        <Fragment>
            <Navbars />
            {/* {
                statPay === "Pending" ? (
                    <Alert variant="warning" className="text-center">
                        Please wait for confirmation from admin.
                    </Alert>
                ) : statPay === "Cancel" ? (
                    <Alert variant="danger" className="text-center">
                        Transaksi Gagal : {descCancel}
                    </Alert>
                ) : null
            } */}
            {/* <Router> */}
            {/* // namun jika kondisi diatas tidak terpenuhi maka akan diarahkan ke page lain berdasarkan url */}
            <Switch>
                <PrivateRoute exact path={path} component={MainContent} />
                <PrivateRoute exact path={`${path}/:topicId`} component={Main} />
                <PrivateRoute exact path={`${path}/book/detail/:id`} component={SubMain} />
            </Switch>
                
            {/* </Router> */}
        </Fragment>
    )
}

const SubMain=()=> {
    let { id } = useParams();
    let { path, url } = useRouteMatch();
    let location = useLocation();
    console.log("location submain", location);

    // console.log('Check parameter topicId', topicId);
    console.log('Check parameter id ', id);
    console.log("Check path di home Tes", path);
    console.log("Check url di home Tes", url);

    if (location.pathname === `/user/book/detail/${id}`) {
        return(
            <DetailBook />
        );
    }
    else if (location.pathname === `/user/book/read/${id}`) {
        return(
            <ReadBook />
        );
    }
    else{
        return (
            <div>
            <h3>/{id} check halaman</h3>
            </div>
        );
    }
}


const Main =()=> {
    let { topicId } = useParams();
    let { path, url } = useRouteMatch();
    let location = useLocation();
    console.log("location Main", location);

    console.log('parameter topicId', topicId);
    console.log("path di home Tes", path);
    console.log("url di home Tes", url);

    if (location.pathname === "/user/profile") {
        return(
            <Profile />
        );
    }
    else if (location.pathname === "/user/subscribe") {
        return(
            <Subscribe />
        );
    }
    else if (location.pathname === "/user/cart") {
        return(
            <Cart />
        );
    }
    else{
        return (
            <div>
            <h3>{topicId} tes halaman</h3>
            </div>
        );
    }
}

export default Home
