import Routes from './Routes';
import PrivateRoute from './Routes/PrivateRoute';
import PrivateRouteAdmin from './Routes/PrivateRouteAdmin';

import {AppContext, AppContextProvider} from './Context';

import {API,setAuthToken} from './API'

export {setAuthToken, API, AppContext,AppContextProvider,Routes, PrivateRoute, PrivateRouteAdmin};