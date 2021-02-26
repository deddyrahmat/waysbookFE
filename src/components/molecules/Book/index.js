import React, { Fragment, useEffect, useState } from 'react';
import { Table, NavDropdown, Container, Modal, Form, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import {
  Link
} from "react-router-dom";

// component
import {API} from '../../../configs';

import {Loading} from '../../../components';

// styling
import "./Book.css";
import { Buttons } from '../../atoms';

const Book = () => {

    const [books, setBooks] = useState([]);

    // make state for loading file
    const [isLoading, setLoading] = useState(true);

    const loadBooks = async () => {
        try {
            const response = await API('/books');

            if (response.status == 200) {
                console.log("hasil response", response.data.data.promoBooks);
                setBooks(response.data.data.promoBooks);
                setLoading(false);
            }
        } catch (err) {
            console.log("Your system error : ", err);
        }
    }

    useEffect(() => {
        loadBooks();
    }, []);


    console.log("data book", books);

    let no = 1;//no urut untuk tabel

    return isLoading ? (<Loading className="d-flex justify-content-center align-items-center" />) 
        : (
        <Fragment>
            <Container>
                <div class="d-flex justify-content-between mb-3">
                    <h3 className="title-dashboard">Books</h3>

                    <Link to="/admin/addBook">
                        <Buttons title="Add Book" className="buttons-black font-weight-bold mt-2 mb-2" />
                    </Link>
                </div>

                <Table striped hover variant="light" id="table-transaction">
                    <thead className="text-danger">
                        <tr>
                        <th className="head-transactions">No</th>
                        <th className="head-transactions">Title</th>
                        <th className="head-transactions">Author</th>
                        <th className="head-transactions">Publication Date</th>
                        <th className="head-transactions">Price</th>
                        <th className="head-transactions">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            books.length > 0 ? (

                                books.map(book => (
                                    <tr key={book.id}>
                                        <td>{no++}</td>
                                        <td className="text-capitalize">{book.title}</td>
                                        <td className="text-capitalize">{book.author}</td>
                                        <td><Moment format='MMM YYYY'>{book.publicationDate}</Moment></td>
                                        <td>
                                            <NumberFormat 
                                                value={book.price} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                prefix={'Rp. '} 
                                                renderText={
                                                    value => <small>{value}</small>
                                                } />
                                        </td>
                                        <td>
                                            <NavDropdown id="basic-nav-dropdown">
                                                <NavDropdown.Item className="status-payment-approve">Edit</NavDropdown.Item>
                                                {/*  onClick={() => {handleApprove(book.id)}}  */}
                                                
                                                <NavDropdown.Item  className="status-payment-cancel" >Delete</NavDropdown.Item> 
                                                {/* onClick={() => {handleCancel(book.id)}} */}
                                            </NavDropdown>
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

            </Container>
        </Fragment>
    )
}

export default Book
