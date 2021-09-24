import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'

const EditTeamCard = (props) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    return (
            <div className="sidebar-wrapper mt-10 mb-10">
                <div className="sidebar-box">
                  <div className="mb-20 navbar-brand">
                    <Image
                    //   src={user.profile_picture}
                      src={props.logo}
                      alt="Profile Picture"
                      className="profile-image hover-me"
                    ></Image>
                  </div>
                  <Row>
                      <p className="editteam-p text-center text-primary">{user.first_name + " " + user.last_name}</p>
                  </Row>
                  <Row>
                      <p className="editteam-p editteam-email text-center">{user.email_address}</p>
                  </Row>
                  <Row>
                      <p className="editteam-p editteam-email text-center">Role</p>
                  </Row>
                </div>
              </div>

    )
}

export default EditTeamCard
