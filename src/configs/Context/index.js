import {createContext, useReducer} from 'react';

export const AppContext = createContext();

const initialState = {
    modalLogin : false,
    modalRegister : false,
    auth : false,
    payment : false,
    listBook : []
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
        case "AUTH":
            localStorage.setItem('id_user', payload.id )
            return {
                ...state,
                auth : true,
                role : payload.role
            }
        case "PAYMENT":
            return {
                ...state,
                payment : true,
            }
        case "ADD_LIST" :
            return {
                ...state,
                listBook : [payload]
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