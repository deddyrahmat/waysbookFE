import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


// components
import { Landing, Home } from "../../pages";
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <Router>
            <Switch>
                {/* <Route path="/home">
                    <Home />
                </Route> */}
                <PrivateRoute exact path="/home" component={Home} />
                <Route path="/">
                    <Landing />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
