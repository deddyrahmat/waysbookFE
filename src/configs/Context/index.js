import {createContext, useReducer} from 'react';

export const AppContext = createContext();

const initialState = {
    modalLogin : false,
    modalRegister : false,
    auth : false,
    fullname : '',
    avatar : null,
    payment : false,
    listBook : [],
    isLoading : true// cek ketersedian token
}

const reducer = (state, action)=> {
    const {payload, type} = action;

    switch (type) {
        case "MODAL_LOGIN":
            return{
                ...state,
                modalLogin : payload
            }
        case "MODAL_REGISTER":
            return{
                ...state,
                modalRegister : payload
            }
        case "USER_LOADED" : 
            return {
                ...state,
                auth : true,
                isLoading : false,
                isLogin : true,
                fullname : payload.fullname,
                avatar : payload.avatar,
                role : payload.role
            }
        case "AUTH":
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                auth : true,
                fullname : payload.fullname,
                avatar : payload.avatar,
                role : payload.role
            }
        // case "PAYMENT":
        //     return {
        //         ...state,
        //         payment : true,
        //     }
        case "ADD_LIST" :
            return {
                ...state,
                listBook : [payload]
            }

        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                isLogin : false,
                isLoading: false,
                listBook : []
            }    
        default:
            throw new Error();
    }
}

export const AppContextProvider = (props) => {
    // state = initial state
    // dispatch = reducer

    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}