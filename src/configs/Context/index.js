import {createContext, useReducer} from 'react';

export const AppContext = createContext();

const initialState = {
    modalLogin : false,
    modalRegister : false,
    auth : false,
    fullname : '',
    avatar : null,
    payment : false,
    totalCart: { subtotal: 0, qty: 0, total: 0 },
    carts : [],
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
        case "INC_CART":
            // menambah/menaikan jumlah dari item yang akan dimasukan kedalam cart
            // filter data cart berdasarkan id payload yang diterima untuk menyimpan array book yang sesuai
            const filterExistedBook = state.carts.filter(
                book => book.id == payload.id
            );

            if (filterExistedBook.length > 0) {
                // jika ada data yang tersimapn
                // lakukan proses map array ke state.carts
                const newCart = state.carts.map(book=> {
                    // karna kasusnya tidak ada plus/minus item, maka default qty item book == 1
                    // jika id book dari state sama dengan yang dikirim di payload id, kembalikan data buku dan tambahkan qty book
                    // if (book.id == payload.id) {
                    //     return {...book, qty : book.qty + 1};
                    // }else{
                    //     // jika tidak aada id buku yang sama, maka return book awal
                    //     return book;
                    // }
                    return book;
                })

                // return data state lainnya dan carts terbaru
                return {
                    ...state,
                    carts : newCart
                }
            }

            // buat variabel baru untuk menampung data array yang isinya data state carts dan juga payload kiriman serta qty nya
            // selain id, isi variabel payload ada price
            const newCart = [...state.carts, { ...payload, qty : 1}];
            return {
                ...state,
                carts : newCart
            }
        case "DEC_CART":
            return {
                ...state,
                carts: state.carts.map((book) => {
                    if (book.id === payload.id) {
                        return { ...book, qty: book.qty - 1 };
                    } else {
                        return book;
                    }
                }),
            };
        case "SAVE_CART":
            // lakukan penyimpanan cart ke localstorage setelah proses cart(inc, dec and remove cart) selesai
            localStorage.setItem("cart", JSON.stringify(state.carts));
            return state;
        case "UPDATE_CART":
            // ambil data cart dari localstogae dan simpan ke variabel
            const cart = localStorage.getItem("cart");
            // jika tidak ada data di cart di localstorage return state default
            if (!cart) {
                return state;
            }

            // jika ada data di localstorage, return seluruh data
            return { ...state, carts: JSON.parse(cart) };
        case "REMOVE_CART":
            return {
                ...state,
                carts: state.carts.filter(
                    (book) => book.id !== payload.id
                ),
            };
        case "RESET_CART":
            localStorage.removeItem("cart");
            return {
                ...state,
                carts: [],
            };
        
        case "GET_TOTAL_CART":
            if (state.carts.length > 0) {
                let subtotal = 0,
                qty = 0,
                total = 0;
                state.carts.forEach((book) => {
                    subtotal += +book.price;
                    qty += +book.qty;
                    total += +book.price * +book.qty;
                });
                return {
                ...state,
                totalCart: { subtotal, qty, total },
                };
            } else {
                return {
                ...state,
                totalCart: initialState.totalCart,
                };
            }

        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.removeItem("cart");
            return {
                ...state,
                auth : false,
                isLoading: false,
                payment: false,
                listBook : [],
                carts : []
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