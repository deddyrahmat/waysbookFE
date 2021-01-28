import React, { Fragment, useContext, useState } from 'react'
import { Col, Container, Row, Modal } from 'react-bootstrap'

// component
import {AppContext} from '../../../configs'

// images
import {HeroImage, AlamKubur, Serangkai, TessoftheRoad, BukuSiswa} from '../../../assets'

const MainContent = () => {

    const [state] = useContext(AppContext);

    // ======================================================
    // set modal for login failed
    const [detailBookFailed, setDetailBookFailed] = useState(false);
    const [messageFailed, setMessageFailed] = useState("");
    
    const handleCloseDetailBookFailed = () => setDetailBookFailed(false);
    const handleDetailBookFailed = () => setDetailBookFailed(true);
    // set modal for DetailBook failed
    // ======================================================

    const handleStatusPay = () => {
        if (!state.payment) {
            handleDetailBookFailed();
            setMessageFailed("please make a payment to read the latest books");
        }
    }

    return (
        <Fragment>
            <Container>
                <img src={HeroImage} alt="heroimage" className="img-fluid" />
                <h3 className="font-weight-bold my-4">List Books</h3>
                <Row>
                    <Col sm="12" md="3" style={{cursor: 'pointer'}} onClick={handleStatusPay}>
                        <img src={AlamKubur} alt="list-books" className="img-fluid list-books" />
                        <p className="font-weight-bold mb-1 mt-3 text-truncate">Kabar Rahasia Dari Alam Kubur</p>
                        <p className="text-muted">DR. Kamil Yusuf Al-Atum</p>
                    </Col>
                    <Col sm="12" md="3">
                        <img src={Serangkai} alt="list-books" className="img-fluid list-books" />
                        <p className="font-weight-bold mb-1 mt-3 text-truncate">Serangkai</p>
                        <p className="text-muted">Valerie Patkar</p>
                    </Col>
                    <Col sm="12" md="3">
                        <img src={TessoftheRoad} alt="list-books" className="img-fluid list-books" />
                        <p className="font-weight-bold mb-1 mt-3 text-truncate">Tess on the Road</p>
                        <p className="text-muted">Rachel Hartman</p>
                    </Col>
                    <Col sm="12" md="3">
                        <img src={BukuSiswa} alt="list-books" className="img-fluid list-books" />
                        <p className="font-weight-bold mb-1 mt-3 text-truncate">Z1 - Sd/Mi Buku Siswa Tematik</p>
                        <p className="text-muted">Afi Yustiyana</p>
                    </Col>
                </Row>
            </Container>

            {/* modal failed */}
            <Modal size="lg" show={detailBookFailed} onHide={handleCloseDetailBookFailed} className="d-flex justify-content-center align-items-center">
                <Modal.Body >
                    <p className="modal-failed">{messageFailed}</p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default MainContent
