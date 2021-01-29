import React, { Fragment } from 'react'
import { Container} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// components
import { Navbars, Transactions, AddBook } from '../../components'

// styling
import './Dashboard.css';

const Dashboard = () => {
    return (
        <Fragment>
            
            <Router>
                <Navbars />
                <Container className="mt-4">
                        <Switch>
                            <Route exact path="/admin/addBook"><AddBook /></Route>
                            <Route exact path="/admin/dashboard"><Transactions /></Route>
                        </Switch>
                    
                </Container>                
            </Router>
        </Fragment>
    )
}

export default Dashboard
