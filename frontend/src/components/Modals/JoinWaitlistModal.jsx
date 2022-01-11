import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { joinWaitlistAction } from "../../actions/waitlistAction";
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";


const JoinWaitlistModal = ({ showModal, hideModal }) => {

  // const [show, setShow] = useState(showModal);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  
  const joinWaitlist = async(e) => {
    e.preventDefault();
    if (name.length && email.length !== 0) {
      const result = await Swal.fire({
        title: "Congratulations!",
        html: "<h4>You have joined the waitlist.</h4>",
        icon: "success",
        reverseButtons: true,
        showDenyButton: true,
        denyButtonText: `Cancel`,
        confirmButtonText: "Okay",
        confirmButtonColor: "#dc3741",
        denyButtonColor: "#6c757d",
      })
      //close the Modal together with sweet alert
      if (result.isConfirmed) {
        hideModal()
        setName("")
        setEmail("")
      }
      //Post in the database
      dispatch(joinWaitlistAction( name,email ));
    } 
  }

  return (
    <Modal size="md" centered show={showModal} onHide={hideModal}>
      <Modal.Header className="p-3">
        <h5 >Join the Waitlist!</h5>
        <button
          type="button"
          className="btn-close me-2"
          onClick={hideModal}
          aria-label="Close"
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className="my-auto p-3">
          <label for="formGroupExampleInput" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control border-top-0 border-end-0 border-start-0 border-bottom"
            id="formGroupExampleInput"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-auto p-3">
          <label for="formGroupExampleInput" className="form-label">
            Email:
          </label>
          <input 
           type="email"
           required
           className="form-control border-top-0 border-end-0 border-start-0 border-bottom"
           id="formGroupExampleInput"
           defaultValue={email}
           onChange={(e) => setEmail(e.target.value)}
           />
        </div>
        <div className="px-3 py-2 d-flex justify-content-end">
          <button className="theme-btn theme-btn-modal mx-0" type="submit" onClick={joinWaitlist}>Notify Me!</button>
        </div>
        <div className="mt-4 mx-auto">
              <p className="text-center">
                Copyright © 2022 | Powered by&nbsp;
                <a
                  href="https://pocketdevs.ph"
                  className="fw-bold"
                  rel="nofollow"
                >
                  PocketDevs
                </a>
              </p>
      </div>
      </Modal.Body>
      {/* <Modal.Footer>
     
      </Modal.Footer> */}
    </Modal>
  );
};

export default JoinWaitlistModal;
