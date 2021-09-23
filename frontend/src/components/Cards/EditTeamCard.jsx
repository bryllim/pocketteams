import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'

const EditTeamCard = (props) => {
    return (

            <div className="sidebar-wrapper mt-10 mb-10">
                <div className="sidebar-box">
                  <Row className="mb-20">
                    <Image
                      src={props.logo}
                      roundedCircle
                      className="edit-modal"
                    ></Image>
                  </Row>
                  <Row>
                    <Col>
                      <small><p>Sebastian Ceblano</p></small>
                      <small><p>Member</p></small>
                    </Col>
                  </Row>
                </div>
              </div>
    )
}

export default EditTeamCard
