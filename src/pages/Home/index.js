import React, {useContext} from 'react';
import {AppContext} from '../../configs';

const Home = () => {
    const [state] = useContext(AppContext);

    console.log("state di home", state);
    return (
        <div>
            <p>Ini adalah home untuk user</p>
        </div>
    )
}

export default Home
