import React from 'react'
import { Container } from 'react-bootstrap';

import './Loading.css';

const Loading = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Container>
    )
}

export default Loading
