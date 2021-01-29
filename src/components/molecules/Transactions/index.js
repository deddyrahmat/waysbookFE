import React, { Fragment } from 'react'
import { Table, NavDropdown } from 'react-bootstrap'
import {Link} from 'react-router-dom';

const Transactions = () => {
    return (
        <Fragment>
            <h3 className="title-dashboard">Income Transaction</h3>
            
            <Table striped hover variant="light">
                    <thead className="text-danger">
                        <tr>
                        <th>No</th>
                        <th>Users</th>
                        <th>Bukti Transfer</th>
                        <th>Remaining Active</th>
                        <th>Status User</th>
                        <th>Status Payment</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Dinda Ramadhani</td>
                            <td>bca.jpg</td>
                            <td>26 / Hari</td>
                            <td className="text-success">Active</td>
                            <td className="text-success">Approve</td>
                            <td>
                                <NavDropdown id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.3" className="text-success">Approved</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" className="text-danger">Cancel</NavDropdown.Item>
                                </NavDropdown>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Budi Sudarso</td>
                            <td>bni.jpg</td>
                            <td>0 / Hari</td>
                            <td className="text-danger">Not Active</td>
                            <td className="text-danger">Cancel</td>
                            <td>
                                <NavDropdown id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.3" className="text-success">Approved</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" className="text-danger">Cancel</NavDropdown.Item>
                                </NavDropdown>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Fatimah Zahra</td>
                            <td>bri.jpg</td>
                            <td>0 / Hari</td>
                            <td className="text-danger">Not Active</td>
                            <td className="text-warning">Pending</td>
                            <td>
                                <NavDropdown id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.3" className="text-success">Approved</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4" className="text-danger">Cancel</NavDropdown.Item>
                                </NavDropdown>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
        </Fragment>
    )
}

export default Transactions
