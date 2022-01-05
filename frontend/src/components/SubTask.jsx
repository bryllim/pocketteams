import React, { useState, useEffect } from "react";
// import Preload from "../components/Preload";
// import ErrorMessage from "../components/ErrorMessage";
import {
  createSubtask,
  listSubtasks,
  updateSubtask,
  subtask_updateTaskStatus,
  deleteSubtask,
} from "../actions/subtaskActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ErrorMessage from "./ErrorMessage";
import Preload from "./Preload";

const SubTask = (taskId) => {
  const dispatch = useDispatch();

  const subtaskList = useSelector((state) => state.subtaskList);
  const { loading, subtasks, error } = subtaskList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  useEffect(() => {
    dispatch(listSubtasks());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo]);

  const taskID = taskId.taskId;
  const [subtask, setSubtask] = useState("");
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    if (counter >= 1) return;
    setCounter(counter + 1);
  };

  const giveSubtask = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
      if (subtask.length === 0) return;
      if (subtask.length >= 1) {
        dispatch(createSubtask(subtask, taskID));
        setSubtask("");
        window.location.reload(false);
      }
    }
  };



  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className="theme-btn theme-btn-sm"
      >
        + Add subtask
      </button>

      {Array.from(Array(counter))
        .reverse()
        ?.map((c, index) => {
          return (
            <div key={c} className="d-flex align-items-center my-3 px-3">
              <i className="lni lni-checkmark-circle pe-2"></i>
              <input
                name="subtask"
                className="full input-border label-font form-control px-1"
                type="text"
                defaultValue={subtask}
                onChange={(e) => setSubtask(e.target.value)}
                onKeyDown={giveSubtask}
              />
            </div>
          );
        })}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Preload />}
      {subtasks
        ?.filter((item) => Object.values(item).includes(taskID))
        .reverse()
        ?.map((subtasked) => (
          <div className="d-flex align-items-center my-3 px-3">
            <i
              defaultValue={subtasked.subtask_isComplete}
              onClick={(e) => {
                subtasked.subtask_isComplete = !subtasked.subtask_isComplete;
                dispatch(
                  subtask_updateTaskStatus(
                    subtasked._id,
                    subtasked.subtask_isComplete
                  )
                );
                e.preventDefault();
                e.stopPropagation();
              }}
              className={
                !subtasked.subtask_isComplete
                  ? "lni lni-checkmark-circle pe-2"
                  : "lni lni-checkmark pe-2"
              }
            ></i>
            <input
              name="subtask"
              className="full input-border label-font form-control px-1"
              type="text"
              defaultValue={subtasked.subtask_content}
              onChange={(e) => setSubtask(e.target.value)}
              onKeyDown={(e) => {
                console.log(e.key)
                if (e.key === "Delete") {
                    dispatch(deleteSubtask (subtasked._id));
                }
                if (e.key === "Enter" || e.key === "Escape") {
                  e.preventDefault();
                  if (subtask.length >= 1) {
                    dispatch(updateSubtask(subtasked._id, subtask));
                  }
                }
              }}
            />

          </div>
        ))}
    </div>
  );
};

export default SubTask;
