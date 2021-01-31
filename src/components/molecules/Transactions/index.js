import React, { Fragment } from 'react'
import { Table, NavDropdown } from 'react-bootstrap'

import "./Transactions.css";

const Transactions = () => {
    return (
        <Fragment>
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
                        <tr>
                            <td>1</td>
                            <td>Dinda Ramadhani</td>
                            <td>bca.jpg</td>
                            <td>26 / Hari</td>
                            <td className="text-success">Active</td>
                            <td className="status-payment-approve">Approve</td>
                            <td>
                                <NavDropdown id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.3" className="status-payment-approve">Approved</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" className="status-payment-cancel">Cancel</NavDropdown.Item>
                                </NavDropdown>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Budi Sudarso</td>
                            <td>bni.jpg</td>
                            <td>0 / Hari</td>
                            <td className="text-danger">Not Active</td>
                            <td className="status-payment-cancel">Cancel</td>
                            <td>
                                <NavDropdown id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.3" className="status-payment-approve">Approved</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" className="status-payment-cancel">Cancel</NavDropdown.Item>
                                </NavDropdown>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Fatimah Zahra</td>
                            <td>bri.jpg</td>
                            <td>0 / Hari</td>
                            <td className="text-danger">Not Active</td>
                            <td className="status-payment-pending">Pending</td>
                            <td>
                                <NavDropdown id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.3" className="status-payment-approve">Approved</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" className="status-payment-cancel">Cancel</NavDropdown.Item>
                                </NavDropdown>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
        </Fragment>
    )
}

export default Transactions
