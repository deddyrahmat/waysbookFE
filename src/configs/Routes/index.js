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
            <Switch>
                {/* <Route path="/dashboard">
                    <Dashboard />
                </Route> */}
                <PrivateRouteAdmin exact path="/admin/dashboard" component={Dashboard} />

                <PrivateRoute exact path="/home" component={Home} />
                
                <Route exact path="/">
                    <Landing />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
