import React, { useState } from "react";
import {
  Form,

  Modal,
  Button,
} from "react-bootstrap";

const Addmember = ({ showModal, hideModal }) => {
  return (
    <>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header>
          <h5>Add Member</h5>
          <button
            type="button"
            class="btn-close me-2"
            onClick={hideModal}
            aria-label="Close"
          ></button>
        </Modal.Header>

        <Modal.Body>
          <div className="col">
            <div className="d-flex">
              <div class="d-flex flex-column mb-3 mx-1 flex-fill">
                <p>
                  Add to Team
                </p>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </div>

              <div class="d-flex flex-column mb-3 mx-1 flex-fill">
                <p>
                  Add to Project
                </p>

                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </div>
            </div>

            <p>Emails</p>

            <textarea
              class="form-control"
              placeholder="add emails here"
              id="floatingTextarea2"
              style={{ height: "100px" }}
            ></textarea>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="theme-btn theme-btn-modal mx-0"
            onClick={hideModal}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Addmember;
