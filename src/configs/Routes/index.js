import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


// components
import { Landing, Home } from "../../pages";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/">
                    <Landing />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
