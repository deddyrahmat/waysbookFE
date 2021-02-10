import React,{useContext} from 'react'
import {Route, Redirect} from "react-router-dom";

import {AppContext} from '..';
import { Loading } from '../../components';
// import {Users} from '../../FakeData'

const PrivateRoute = ({component : Component, ...rest}) => {

    const [state] = useContext(AppContext);

    const {auth, isLoading} = state;

    return (
        // ...rest akan menampilkan seluruh sisa props yang dikirim(rest parameter) dan lakukan conditional rendering
        // jika status dari state loading adalah true tampilkan login karena proses check auth user dari token bersifat asyncronus,    maka tampilkan loading terlebih dahulu
        // jika loading selesai/false lanjutkan kondisi status auth sudah login atau belum
        // cek role dari user yang telah login, jika user jalankan proses memanggil komponen
        // jika status bukan user, arahkan kehalaman landing kembali
        <Route 
            {...rest}
            render={(props) => 
                isLoading ? (<Loading />)
                : auth ? 
                        state.role === 'user' ?
                            <Component {...props} /> : <Redirect to="/" />
                    : <Redirect to="/" />
            }
        />
    )
}

export default PrivateRoute
