import React, { Fragment } from 'react'
import { Container} from 'react-bootstrap'
import { 
    BrowserRouter as Router, 
    Link,
    Switch, 
    Route, 
    useRouteMatch,
    useLocation,
    useHistory,
    useParams } from 'react-router-dom';

// components
import { Navbars, Transactions, AddBook } from '../../components'
import { PrivateRouteAdmin } from '../../configs';

// styling
import './Dashboard.css';

const Dashboard = () => {
    let paramId = useParams();

    let history = useHistory();

    let location = useLocation();

    let { path, url } = useRouteMatch();

    console.log("path di dashboard", path);
    console.log("url di dashboard", url);
    console.log("parameter di dashboard", paramId);
    console.log("location di dashboard", location);


    return (
        <Fragment>
            
            {/* <Router> */}
                <Navbars />
                <Container className="mt-4">
                        <Switch>
                            <PrivateRouteAdmin exact path={path} component={Transactions} />
                            <PrivateRouteAdmin exact path={`${path}/:paramId`} component={Main} />
                        </Switch>
                    
                </Container>                
            {/* </Router> */}
        </Fragment>
    )
}

const Main =()=> {
    let { paramId } = useParams();
    let { path, url } = useRouteMatch();
    let location = useLocation();
    console.log("location Main", location);

    // console.log('parameter topicId', paramId);
    console.log("path di home Tes", path);
    console.log("url di home Tes", url);


    if (location.pathname === "/admin/addBook") {
        return(
            <AddBook />
        );
    }
    else{
        return (
            <div>
            <h3>{paramId} tes halaman</h3>
            </div>
        );
    }
}

export default Dashboard
