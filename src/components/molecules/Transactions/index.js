import React, { Fragment, useEffect, useState } from 'react';
import { Table, NavDropdown, Container, Modal, Form, Button } from 'react-bootstrap';

// component
import {API} from '../../../configs';

import {Loading} from '../../../components';

// styling
import "./Transactions.css";

const Transactions = () => {

    const [transactions, setTransactions] = useState([]);

    const [idTransactionCancel, setIdTransactionCancel] = useState(null);
    const [descTransactionCancel, setDescTransactionCancel] = useState("");

    // make state for loading file
    const [isLoading, setLoading] = useState(true);

    // setModal Loading
    const [showModalLoading, setShowModalLoading] = useState(false);
    const handleCloseLoading = () => setShowModalLoading(false);
    const handleShowModalLoading = () => setShowModalLoading(true);
    // setModal Loading

    // setModal Approved
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    // setModal Approved

    // setModal Cancel
    const [showModalCancel, setShowModalCancel] = useState(false);
    const toogleCancel = () => setShowModalCancel(!showModalCancel);
    // setModal Cancel

    // state modal image
    const [fileImage, setfileImage] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const toogleImage = () => setImageModal(!imageModal);
    // state modal image

    const handleApprove = async (id) => {
        try {
            handleShowModalLoading();
            const response = await API.patch(`/approved-transaction/${id}`);
            console.log("response transaction update approve", response);
            if (response.status == 200) {
                handleShowModal();
                handleCloseLoading();
            }
        } catch (err) {
            console.log("Your system error ",err);
            handleCloseLoading();
        }
    }

    const loadTransaction = async () => {
        try {
            const response = await API('/transactions');

            if (response.status == 200) {
                console.log("hasil response", response.data.data.transactions);
                setTransactions(response.data.data.transactions);
                setLoading(false);
            }
        } catch (err) {
            console.log("Your system error : ", err);
        }
    }

    useEffect(() => {
        loadTransaction();
    }, [showModal]);


    // =====================================================================
    // SUB Desc Cancel
    // =====================================================================

    const handleDescCancel = (e) => {
        console.log("data desc cancel",e.target.value);
        setDescTransactionCancel(e.target.value);
    } 

    const handleCancel = (id) => {
        try {
            console.log("id cancel ", id);
            setIdTransactionCancel(id);
            toogleCancel();
        } catch (err) {
            console.log("Your System ",err);
        }
    }

    const handleSubmitCancel = async (e) => {
        e.preventDefault();

        try {
            const response = await API.patch(`/cancel-transaction/${idTransactionCancel}`);
            console.log("response cance", response);

            if (response.status == 200) {
                toogleCancel();
                loadTransaction();
            }
        } catch (err) {
            console.log("Your System ", err);
        }
        console.log("total data desc cancel", descTransactionCancel);
    }

    console.log("data transaction", transactions);

    let no = 1;//no urut untuk tabel

    return isLoading ? (<Loading className="d-flex justify-content-center align-items-center" />) 
        : (
        <Fragment>
            <Container>
                <h3 className="title-dashboard">Incoming Transaction</h3>
                
                <Table striped hover variant="light" id="table-transaction">
                    <thead className="text-danger">
                        <tr>
                        <th className="head-transactions">No</th>
                        <th className="head-transactions">Users</th>
                        <th className="head-transactions">Bukti Transfer</th>
                        <th className="head-transactions">Remaining Active</th>
                        <th className="head-transactions">Status User</th>
                        <th className="head-transactions">Status Payment</th>
                        <th className="head-transactions">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            transactions.length > 0 ? (

                                transactions.map(transaction => (
                                    <tr key={transaction.id}>
                                        <td>{no++}</td>
                                        <td>{transaction.user.fullname.charAt(0).toUpperCase() + transaction.user.fullname.slice(1)}</td>
                                        <td align="center">
                                            <img src={transaction.transferProof} alt="transfer_image" style={{cursor:"pointer"}} onClick={() => {
                                                setfileImage(transaction.transferProof);
                                                toogleImage();
                                            }} width="30px" height="30px" />
                                        </td>
                                        <td>{transaction.remainingActive} / Hari</td>
                                        <td className={transaction.userStatus == "Active" ? "text-success" : "text-danger"} >
                                            {transaction.userStatus}
                                        </td>
                                        <td className={transaction.paymentStatus == 'Approved' ? "status-payment-approve" : transaction.paymentStatus == 'Pending' ? "status-payment-pending" : "status-payment-cancel" } >
                                            {transaction.paymentStatus}
                                        </td>
                                        <td>
                                            {transaction.paymentStatus == 'Pending' ? (
                                                <NavDropdown id="basic-nav-dropdown">
                                                    <NavDropdown.Item onClick={() => {handleApprove(transaction.id)}} className="status-payment-approve">Approved</NavDropdown.Item>
                                                    
                                                    <NavDropdown.Item  className="status-payment-cancel" onClick={() => {handleCancel(transaction.id)}}>Cancel</NavDropdown.Item>
                                                </NavDropdown>
                                            ) : null}

                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan="7" align="center"><h3 className="status-payment-cancel mt-2" style={{fontFamily:"Roboto", fontWeight:"bold"}}>Data Not Found</h3></td>
                                </tr>

                            )

                        }

                    </tbody>
                </Table>

                {/* ================================== */}
                {/* modal Preview Image */}
                {/* ================================== */}
                <Modal size="lg" show={imageModal} onHide={toogleImage} className="d-flex justify-content-center align-items-center w-100">
                    <Modal.Body >
                        <img src={fileImage} alt="attach file" className="text-center img-fluid" />
                    </Modal.Body>
                </Modal>

                {/* ================================== */}
                {/* modal loading */}
                {/* ================================== */}
                <Modal size="lg" show={showModalLoading} className="d-flex justify-content-center align-items-center w-100">
                    <Modal.Body >
                        <Loading />
                    </Modal.Body>
                </Modal>

                {/* ================================== */}
                {/* modal response approved */}
                {/* ================================== */}
                <Modal size="lg" show={showModal} onHide={handleClose} className="d-flex justify-content-center align-items-center w-100">
                    <Modal.Body >
                        <p className="text-success">Approved Transaction Success</p>
                    </Modal.Body>
                </Modal>

                {/* ================================== */}
                {/* modal response CANCEL */}
                {/* ================================== */}
                <Modal size="lg" show={showModalCancel} onHide={toogleCancel} className="d-flex justify-content-center align-items-center w-100">
                    <Modal.Body >
                        <Form onSubmit={handleSubmitCancel}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Desc Cancel Transaction</Form.Label>
                                <Form.Control as="textarea" name="descCancel" rows={3} onChange={handleDescCancel} />
                            </Form.Group>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={toogleCancel}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </Fragment>
    )
}

export default Transactions
