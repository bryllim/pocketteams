import React, { useState, useEffect, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import SubTask from "../components/SubTask";
import { TaskContext } from "../contexts/SectionContext";
import { useSelector } from "react-redux";
import Preload from "../components/Preload";
import ErrorMessage from "../components/ErrorMessage";
import {
  taskRename,
  taskRemove,
  taskDescriptionUpdate,
  taskPriorityUpdate,
} from "../functions/TaskFunctions";
import {
  deleteTask,
  updateTask,
  createTask,
  updateTaskDescription,
  updateTaskPriority,
  updateTaskStatus,
} from "../actions/taskActions";
import { listComments, createComments, updateComments, deleteComment} from "../actions/commentActions";

const updateTaskName = ({
  sectionId,
  sections,
  setSections,
  index,
  taskId,
  taskName,
  dispatch,
}) => {
  if (taskName === "") {
    taskRemove({ sectionId, sections, setSections, index });
    dispatch(deleteTask({ taskId }));
  } else if (taskId === "123") {
    const task_priority = "light";
    dispatch(
      createTask({
        task_name: taskName,
        task_description: "tempdescription",
        task_priority,
        section_id: sectionId,
      })
    );
  } else {
    taskRename({ sectionId, sections, setSections, taskName, index });
    dispatch(updateTask({ task_name: taskName, task_id: taskId }));
  }
};
const updateTaskEndDate = (taskId, taskEndDate) => {};
const updateTaskAssignedUsers = (taskId, taskAssignedUsers) => {};

const priorityStatus = ({
  taskNewPriority,
  taskId,
  dispatch,
  index,
  sectionId,
  sections,
  setSections,
}) => {
  // console.log("prioritystatus", taskNewPriority)
  taskPriorityUpdate({
    sections,
    setSections,
    taskNewPriority,
    index,
    sectionId,
  });
  dispatch(
    updateTaskPriority({ task_priority: taskNewPriority, task_id: taskId })
  );
};

const changeTaskDescription = ({
  sections,
  setSections,
  taskDescription,
  index,
  sectionId,
  taskId,
  dispatch,
}) => {
  taskDescriptionUpdate({
    sections,
    setSections,
    taskDescription,
    index,
    sectionId,
  });
  dispatch(
    updateTaskDescription({
      task_description: taskDescription,
      task_id: taskId,
    })
  );
};


const SideTask = ({ showed, hide, task, index, section, sectionId }) => {
  const { sections, setSections, sectionOrder, setSectionOrder, dispatch } =
    useContext(TaskContext);
  const [markTask, setMarkTask] = useState(task.isComplete);
  const [sectionName, setSectionName] = useState("set section");
  const [user, setUser] = useState("assign user");
  const [color, setColor] = useState(
    "form-select form-select-sm label-font ms-3"
  );
  const [taskName, setName] = useState(task.task_name);
  const [taskDescription, setTaskDescription] = useState(task.task_description);
  const [taskPriority, setTaskPriority] = useState(task.task_priority);
  const taskId = task._id;

  //for comments
  const commentList = useSelector((state) => state.commentList);
  const { loading, comments, error } = commentList;
  const [comment, setComment] = useState("");
  const [readOnly, setReadOnly] = useState("true");
  const [editCommentStyle, setEditCommentStyle] = useState("p-1 full label-font input-border resize-0");
  const commentCreate = useSelector((state) => state.commentCreate);
  const { success: successCreateComment } = commentCreate;
  const commentUpdate = useSelector((state) => state.commentUpdate);
  const { success: successUpdateComment } = commentUpdate;


  const giveComment = (e) => {
    // const defaultContent = "Write your note here."
    e.preventDefault(); 
    if (comment.length === 0) return; 
    if (comment.length >= 1) {
      dispatch(createComments ( taskId, comment ));
      window.location.reload(false)
      }
}


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
  
  
  //useEffect to fetch comments
  useEffect(() => {
    if (readOnly === false) {
      setEditCommentStyle("p-1 full label-font input-border resize-0 form-control")
    } else {
      setEditCommentStyle("p-1 full label-font input-border resize-0")
    }
    dispatch(listComments(taskId ));
  }, [dispatch, taskId, successCreateComment,successUpdateComment,readOnly]);

  //useEffect to check/show the color of Priority
  useEffect(() => {
    if (taskPriority === "light") {
      setColor("form-select form-select-sm label-font ms-3 light");
    } else if (taskPriority === "medium") {
      setColor("form-select form-select-sm label-font ms-3 medium");
    } else if (taskPriority === "heavy") {
      setColor("form-select form-select-sm label-font ms-3 heavy");
    } else if (taskPriority === "select priority") {
      setColor("form-select form-select-sm label-font ms-3");
    }
  },[taskPriority]);
// function for priority
  const reClass = (e) => {
    let taskNewPriority = "";

    if (e.target.value === "light") {
      setColor("form-select form-select-sm label-font ms-3 light");
      setTaskPriority("light");
      taskNewPriority = "light";
      priorityStatus({
        taskNewPriority,
        taskId,
        dispatch,
        index,
        sectionId,
        sections,
        setSections,
      });
    } else if (e.target.value === "medium") {
      setColor("form-select form-select-sm label-font ms-3 medium");
      setTaskPriority("medium");
      taskNewPriority = "medium";
      priorityStatus({
        taskNewPriority,
        taskId,
        dispatch,
        index,
        sectionId,
        sections,
        setSections,
      });
    } else if (e.target.value === "heavy") {
      setColor("form-select form-select-sm label-font ms-3 heavy");
      setTaskPriority("heavy");
      taskNewPriority = "heavy";
      priorityStatus({
        taskNewPriority,
        taskId,
        dispatch,
        index,
        sectionId,
        sections,
        setSections,
      });
    } else if (e.target.value === "Select Priority") {
      setColor("form-select form-select-sm label-font ms-3 prio");
      setTaskPriority("Select Priority");
      taskNewPriority = "Select Priority";
      priorityStatus({
        taskNewPriority,
        taskId,
        dispatch,
        index,
        sectionId,
        sections,
        setSections,
      });
    }
  };

  //function for setSections TODO send the targetvalue to backend
  const sectionSetter = (e) => {
    const selectedSection = e.target.value;
    setSectionName(selectedSection.toString())
  }

  return (
    <div
      className={
        showed ? "sidenav active sidebar-wrapper" : "sidenav sidebar-wrapper"
      }
    >
      <div className="sidebar-box py-2 px-4">
        <div className="d-flex align-items-center justify-content-between">
          <button
            complete={markTask}
            onClick={(e) => {
              setMarkTask(!markTask)
              dispatch(updateTaskStatus(taskId, markTask))
              e.preventDefault();
              e.stopPropagation();
            }}
            className="theme-btn theme-btn-md mb-2 py-1"
          >
            <i className="lni lni-checkmark-circle pe-2"></i>
            {!markTask ? "Mark as complete" : "Completed"}
          </button>
          <div className="d-flex align-items-center">
            <i className="lni lni-trash-can pointer f-dark me-2"></i>
            <i
              onClick={() => hide(!showed)}
              className="lni lni-shift-right pointer f-dark me-2"
            ></i>
          </div>
        </div>

        <hr className="default mt-0" />

        <div className="scrolling-section scrolling-wrapper-y overflow-x-hidden">
          <div className="py-2">
            <form>
              <input
                className="py-2 full border-0 h3"
                type="text"
                placeholder="Write a task name"
                value={taskName}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onBlur={(e) => {
                  updateTaskName({
                    sectionId,
                    sections,
                    setSections,
                    taskName,
                    index,
                    dispatch,
                    taskId,
                  });
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === "Escape") {
                    updateTaskName({
                      sectionId,
                      sections,
                      setSections,
                      taskName,
                      index,
                      dispatch,
                      taskId,
                    });
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
              ></input>
              <>
                <div className="row mb-1 f-dark">
                  <div className="col-xl py-2 d-flex align-items-center">
                    <label className="label-font">Section:</label>
                    <div className="d-flex align-items-center mx-2">
                      <Dropdown>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id="dropdown-custom-components"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5rem"
                            fill="currentColor"
                            type="button"
                            className="bi btn-outline-secondary bi-plus-circle-dotted rounded-circle ms-3 me-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <>
                            {sections?.map((section) => (
                              <Dropdown.Item
                                className="label-font-fw"
                                value={section.section_name}
                                onClick={(e) => setSectionName(e.target.outerText)}
                              >
                                {section.section_name}
                              </Dropdown.Item>
                            ))}
                          </>
                        </Dropdown.Menu>
                      </Dropdown>
                      <p className="label-font">{sectionName}</p>
                    </div>
                  </div>

                  <div className="col-xl py-2 d-flex align-items-center">
                    <label className="label-font">Assigned: </label>
                    <div className="d-flex align-items-center">
                      <Dropdown>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id="dropdown-custom-components"
                        >
                          <i class="lni lni-user mx-2 line-icon p-2 sidetask-btn"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            className="label-font-fw"
                            onClick={(e) => setUser("User 1")}
                          >
                            User 1
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="label-font-fw"
                            onClick={(e) => setUser("User 2")}
                          >
                            User 2
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <p className="label-font">{user}</p>
                    </div>
                  </div>
                </div>
                <div className="row f-dark">
                  <div className="col-xl py-2 d-flex align-items-center">
                    <label className="label-font">Date:</label>
                    <div className="d-flex align-items-center">
                      <input
                        className="label-font border border-0 date-btn form-control p-0"
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="col-xl py-2 d-flex align-items-center">
                    <label className="label-font me-2">Priority: </label>
                    <select
                      className={color}
                      onChange={reClass}
                      aria-label="form-select-sm example"
                      value={taskPriority}
                    >
                      <option
                        className="form-select-option label-font-fw prio"
                        aria-label="form-select-sm example"
                      >
                        Select Priority
                      </option>
                      <option className="light" value="light">
                        🟡 - Light
                      </option>
                      <option className="medium" value="medium">
                        🟠 - Medium
                      </option>
                      <option className="heavy" value="heavy">
                        🔴 - Heavy
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col py-2 h6 f-dark">
                    <label className="label-font">Description:</label>
                    <div className="px-2">
                      <textarea
                        placeholder="Describe Task."
                        value={taskDescription}
                        className="mt-3 radius px-3 form-control py-2 label-font resize-0"
                        onChange={(e) => {
                          setTaskDescription(e.target.value);
                        }}
                        onBlur={(e) => {
                          changeTaskDescription({
                            sections,
                            setSections,
                            taskDescription,
                            index,
                            sectionId,
                            taskId,
                            dispatch,
                          });
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === "Escape") {
                            changeTaskDescription({
                              sectionId,
                              sections,
                              setSections,
                              taskDescription,
                              index,
                              dispatch,
                              taskId,
                            });
                            event.preventDefault();
                            event.stopPropagation();
                          }
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <SubTask taskId={taskId}/>
                </div>
              </>
            </form>
          </div>
          <hr className="default my-1" />

          {/* -----COMMENT SECTION----- */}
          <div className="full">
            { error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            { loading && <Preload/> }
            {comments?.filter(item => Object.values(item).includes(taskId))?.map((comment) => (
              <div className="d-flex align-items-center p-2">
                <i className="lni lni-user mx-2 fas-icon"></i>
                <input
                  className={editCommentStyle}
                  type="text"
                  readOnly={readOnly}
                  defaultValue={comment.Comment_context}
                  onChange={(e) => comment.Comment_context = e.target.value}
                  onKeyDown={
                    (e) => {
                      if (e.key === "Enter" || e.key === "Escape") {
                        dispatch(updateComments (comment._id, comment.Comment_context))
                        setReadOnly(true)
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }
                  }
                >
                </input>
                <Dropdown>
                    <Dropdown.Toggle 
                      as={CustomToggle} 
                      id="dropdown-custom-components">
                        <button className="btn p-0" type="button">
                          {/* <i className="lni lni-pencil p-2"></i> */}
                          <i className="bi bi-three-dots fs-5 ms-1" />
                        </button>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => {
                        setReadOnly(false);
                        }}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {
                          e.preventDefault(); 
                          dispatch(deleteComment( comment._id ));
                        }}>Remove</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 d-flex align-items-start">
          <i className="lni lni-user mx-2 line-icon"></i>
          <textarea
            className="mx-2 px-3 py-1 full form-control resize-0 radius label-font"
            placeholder="Write a comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
        </div>
        <div className="d-flex justify-content-end me-2">
          <button 
          className="theme-btn theme-btn-sm py-1 my-1"
          onClick={giveComment}
          >Comment</button>
        </div>
      </div>
    </div>
  );
};

export default SideTask;
