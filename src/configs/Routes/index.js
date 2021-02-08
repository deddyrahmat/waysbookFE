import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


// components
import { Landing, Home, Dashboard } from "../../pages";
import PrivateRoute from './PrivateRoute';
import PrivateRouteAdmin from './PrivateRouteAdmin';

const Routes = () => {
    return (
        <Router>
            {/* <Switch> */}
                {/* <Route path="/dashboard">
                    <Dashboard />
                </Route> */}

                <Route exact path="/">
                    <Landing />
                </Route>

                {/* <Route path="/user">
                    <Home />
                </Route> */}
                

                <PrivateRoute path="/user" component={Home} />
                <PrivateRouteAdmin path="/admin" component={Dashboard} />
                
            {/* </Switch> */}
        </Router>
    )
}

export default Routes
