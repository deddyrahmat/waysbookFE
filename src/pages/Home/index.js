import React, {Fragment, useContext, useEffect} from 'react';
import { Row,Col, Container } from 'react-bootstrap';
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
import { DetailBook, MainContent, Profile, Sidebar, Subscribe, ReadBook } from '../../components';
import {AppContext} from '../../configs';
import { LogoSidebar } from '../../assets';
// import ReadBook from "../../components/molecules/DetailBook/ReadBook"

const Home = () => {

    let paramId = useParams();

    let history = useHistory();

    let location = useLocation();

    const [state, dispatch] = useContext(AppContext);

    let { path, url } = useRouteMatch();

    // cek data user
    

    // menyimpan url terakhir yang menyimpan id book ke variabel locPathReadBook untuk membaca buku
    const locPathReadBook = location.pathname.split("/").slice(-1)[0];

    // function untuk memanggil console log di compoennt react
    const ConsoleLog = (child) => {
        console.log("log dari fun",child);
        return false
    }


    const loadUser = async () => {
        try {
            const response = await API('/user');

            if (response.status == 200) {
                // console.log("response user home",response.data.data.user.transactions[0].remainingActive);    
                if (response.data.data.user.transactions.length > 0) {
                    if (response.data.data.user.transactions[0].remainingActive > 0) {
                        dispatch({
                            type : "PAYMENT"
                        })
                    }                    
                }            
            }
        } catch (err) {
            console.log("Your System ",err);
        }
    }

    useEffect(() => {
        loadUser();
    }, [])

    return (
        <Fragment>
            {/* <Router> */}
            {/* { ConsoleLog(location.pathname) }
            { ConsoleLog(locPathReadBook) } */}
                {/* cek apakah halaman user ini memiliki url yang valid untuk membaca buku berdasarkan id buku */}
                {
                    location.pathname === `/user/book/read/${locPathReadBook}` ? (
                        <Row className="m-5">
                            <Col md="12">
                                <Container>
                                    <img src={LogoSidebar} alt="tes" onClick={() => history.goBack()} style={{cursor:"Pointer"}} />
                                </Container>
                                <Switch>
                                    <PrivateRoute exact path={`${path}/book/read/:id`} component={SubMain} />
                                </Switch>
                            </Col>
                        </Row>
                    ) : (
                        // namun jika kondisi diatas tidak terpenuhi maka akan diarahkan ke page lain berdasarkan url
                        <Row className="m-5">
                            <Col md="3">
                                <Sidebar />
                            </Col>
                            <Col md="9">
                                <Switch>
                                    <PrivateRoute exact path={path} component={MainContent} />
                                    <PrivateRoute exact path={`${path}/:topicId`} component={Main} />
                                    <PrivateRoute exact path={`${path}/book/detail/:id`} component={SubMain} />
                                </Switch>
                            </Col>
                        </Row>

                    )

                }
                
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
    else{
        return (
            <div>
            <h3>{topicId} tes halaman</h3>
            </div>
        );
    }
}

export default Home
