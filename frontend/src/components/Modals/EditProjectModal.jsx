import React, { useState,useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProjectAction } from "../../actions/projectActions";
import { toast } from "react-toastify";

const EditProjectModal = ({ showModal, hideModal, data}) => {
  const [projectName, setProjectName] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [projectStatus, setProjectStatus] = useState(null);

  //NOTIFICATIONS

  const notifyInfo = (msg) =>
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  const dispatch = useDispatch();

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateProjectAction(data._id, projectName, projectDescription, projectStatus));
    if(!projectName || !projectDescription || !projectStatus) return;
    resetHandler();
    hideModal();
    notifyInfo("Project Updated");
  }

  useEffect(() => {
    setProjectName(data.project_name);
    setProjectDescription(data.project_description);
    setProjectStatus(data.project_status);
  }, [data])

  const resetHandler = () => {
    setProjectName("");
    setProjectDescription("");
    setProjectStatus("");
  }


  return (
    <Modal size="md" centered show={showModal} onHide={hideModal}>
      <Modal.Header>
        <h5>Edit Project</h5>
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
                Title
              </label>
              <input
                type="text"
                className="form-control border-top-0 border-end-0 border-start-0 border-bottom"
                id="formGroupExampleInput"
                defaultValue={projectName}
                onChange={(e)=>setProjectName(e.target.value)}
              />
            </div>

            <div className="my-auto p-3">
              <label for="formGroupExampleInput" className="form-label">Description</label>
              <textarea
                className="form-control border-top-0 border-end-0 border-start-0 border-bottom"
                id="formGroupExampleInput"
                defaultValue={projectDescription}
                onChange={(e)=> setProjectDescription(e.target.value)}
              />
            </div>           
      </Modal.Body>

      <Modal.Footer>
        <button className="theme-btn theme-btn-modal mx-0" onClick={updateHandler}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
