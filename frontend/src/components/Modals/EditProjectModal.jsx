import React, { useCallback, useState } from "react";
import { Form, Modal, Col, Row, Dropdown } from "react-bootstrap";
import AddMemberModal from "./AddMemberModal";

const EditProjectModal = ({ showModal, hideModal }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <p
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </p>
  ));

  return (
    <Modal size="lg" centered show={showModal} onHide={hideModal}>
      <Modal.Header>
        <h5>Edit Project</h5>
        <button
          type="button"
          class="btn-close me-2"
          onClick={hideModal}
          aria-label="Close"
        ></button>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <div
            className="d-flex flex-column  align-items-center "
            style={{ width: "500px" }}
          >
            <img
              src="https://via.placeholder.com/150"
              alt=""
              className="rounded"
              style={{ height: "150px", width: "150px" }}
            />

            <div class="mb-3">
              <input
                type="text"
                class="form-control text-center border-top-0 border-end-0 border-start-0 border-bottom  "
                id="formGroupExampleInput"
                placeholder="Title"
              />
            </div>

            <div class="mb-3 align-self-stretch">
              <label for="formGroupExampleInput" class="form-label">
                Description
              </label>
              <input
                type="text"
                class="form-control border-top-0 border-end-0 border-start-0 border-bottom"
                id="formGroupExampleInput"
                placeholder="Example input placeholder"
              />
            </div>

            <div class="mb-3 align-self-stretch">
              <label for="formGroupExampleInput2" class="form-label">
                Dates
              </label>
              <div class="d-flex justify-content-between">
                <input type="date" class=" d-inline" id="date" name="date" />
                <span className="m-2">to</span>
                <input type="date" class=" d-inline" id="date" name="date" />
              </div>
            </div>

            <div className="sidebar-wrapper">
              <div
                className="d-flex flex-row basecard align-items-center align-self-stretch sidebar-box search-form-box"
                style={{ height: "115px" }}
              >
                <button type="d-flex button" class="btn">
                  <i class="bi bi-caret-right-fill" />
                </button>

                <img
                  src="https://via.placeholder.com/100"
                  alt=""
                  className="rounded-circle"
                  style={{ width: "auto", height: "60px" }}
                />
                <img
                  src="https://via.placeholder.com/100"
                  alt=""
                  className="rounded-circle"
                  style={{ width: "auto", height: "60px" }}
                />
                <img
                  src="https://via.placeholder.com/100"
                  alt=""
                  className="rounded-circle"
                  style={{ width: "auto", height: "60px" }}
                />

                <button type="button" class="btn ms-auto align-self-start">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      <i className="bi bi-three-dots" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={null}>Remove</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </button>
              </div>
              <AddMemberModal showModal={show} hideModal={handleClose} />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="theme-btn theme-btn-modal mx-0" onClick={hideModal}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
