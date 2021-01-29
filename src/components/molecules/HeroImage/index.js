import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap';

// images
import {TitleHero} from '../../../assets'

// fake data
import {Books} from '../../../FakeData';

// styling
import "./HeroImage.css";

const HeroImage = () => {
    return (
        <Fragment>
            <Row>
                <Col md="12">
                    <div className="hero-image">
                        <Row className="p-5 d-flex align-items-center justify-content-center">
                            <Col md="8">
                                <img src={TitleHero} alt="title Hero" className="img-fluid " />
                            </Col>
                            <Col md="4" >
                                <img src={Books[Books.length - 1].image} alt="Hero" className="img-fluid hero-book" />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default HeroImage
