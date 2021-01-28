import React,{useContext} from 'react'
import {Route, Redirect} from "react-router-dom";

import {AppContext} from '..';
// import {Users} from '../../FakeData'

const PrivateRoute = ({component : Component, ...rest}) => {

    const [state] = useContext(AppContext);

    const {auth} = state;

    return (
        <Route 
            {...rest}
            render={(props) => 
                auth ? 
                    state.role === 'user' ?
                        <Component {...props} /> : <Redirect to="/" />
                : <Redirect to="/" />
            }
        />
    )
}

export default PrivateRoute
