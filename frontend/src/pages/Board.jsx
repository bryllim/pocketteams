import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import SectionCard from "../components/Cards/SectionCard";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TaskContext } from "../contexts/SectionContext";
import { SocketContext } from "../contexts/SocketContext";
import { createSection } from "../actions/sectionActions";
import onDragEnd from "../functions/dragDrop";
import { sectionCreate, sectionDelete } from "../functions/sectionFunctions";
import { taskCreate, taskRemove } from "../functions/taskFunctions";
import {
  listSectionByProjectId,
  updateSection,
} from "../actions/sectionActions";
import { listTaskByProjectId, updateTask } from "../actions/taskActions";
import SkeletonSectionCard from "../components/Cards/SkeletonSectionCard";
import { ObjectID } from "bson";
import midString from "../functions/ordering";
import "../css/board.css";
import Footer from "../components/Footer";
import ProfileCard from "../components/Cards/ProfileCard";

const addSection = async ({
  dispatch,
  initialData,
  setInitialData,
  projectId,
}) => {
  const sectionOrder = initialData.sectionOrder;
  const sections = initialData.sections;
  const totalSections = sectionOrder.length;
  const newSection = {
    _id: new ObjectID().toHexString(),
    section_name: "New Section",
    order:
      totalSections === 0
        ? "n"
        : midString(sections[sectionOrder[totalSections - 1]].order, ""),
    project_id: projectId,
    taskIds: [],
  };
  sectionCreate({
    initialData,
    setInitialData,
    newSection,
  });
  dispatch(createSection(newSection));
  return;
};

const onDrag = ({ result, data, dispatch }) => {
  const newData = onDragEnd({ result, data });
  if (newData && result.type === "column")
    dispatch(
      updateSection({
        params: newData,
        sectionId: result.draggableId,
      })
    );
  else if (newData)
    dispatch(
      updateTask({
        params: newData,
        taskId: result.draggableId,
      })
    );
  else {
    console.log("error");
  }
  return;
};

const Board = (props) => {
  const { projectId } = props.location || {};
  const { projectName } = props.location || {};
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  // const dataList = useSelector((state) => state.sectionList);
  const { loading: sectionLoading, data: sectionList } = useSelector(
    (state) => state.sectionList
  );
  const { loading: taskLoading, data: taskList } = useSelector(
    (state) => state.taskList
  );
  const { loading: sectionUpdateLoading, data: sectionUpdateData } =
    useSelector((state) => state.sectionUpdate);
  const { loading: taskUpdateLoading, data: taskUpdateData } = useSelector(
    (state) => state.taskUpdate
  );
  const { loading: taskCreateLoading, data: taskCreateData } = useSelector(
    (state) => state.taskCreate
  );
  const { loading: sectionCreateLoading, data: sectionCreateData } =
    useSelector((state) => state.sectionCreate);
  const {
    //error: sectionDeleteError,
    data: sectionDeleteData,
    loading: sectionDeleteLoading,
  } = useSelector((state) => state.sectionDelete);
  const {
    //error: taskDeleteError,
    data: taskDeleteData,
    loading: taskDeleteLoading,
  } = useSelector((state) => state.taskDelete);

  const [initialData, setInitialData] = useState({});

  const [initDone, setInitDone] = useState(false);

  const [sections, setSections] = useState(null);
  const [sectionOrder, setSectionOrder] = useState(null);
  const { userInfo } = userLogin;
  const socket = useContext(SocketContext);

  // titlebar
  useEffect(() => {
    document.title = `${projectName} - PocketTeams`;
  }, [projectName]);

  useEffect(() => {
    socket.emit("Join_Board", projectId);
    //subscribe to board events
    socket.on("New_User_Joined", (data) => {
      console.log("new user joined", data);
    });
    console.log("Test1");
  }, [socket, projectId]);

  useEffect(() => {
    socket.on("New_Board_Update", (data) => {
      setInitialData(data);
      // return
    });
    socket.on("New_Create_Task", (data) => {
      taskCreate({
        initialData,
        setInitialData,
        newTask: data,
        sectionId: data.section_id,
      });
    });

    socket.on("New_Create_Section", (data) => {
      sectionCreate({
        initialData,
        setInitialData,
        newSection: data,
      });
    });

    socket.on("New_Delete_Section", (data) => {
      const index = initialData.sectionOrder.indexOf(data);
      sectionDelete({
        initialData,
        setInitialData,
        sectionId: data,
        index,
      });
    });

    socket.on("New_Delete_Task", (data) => {
      console.log("New_Delete_Task", data);
      const index = initialData.sections[data.section_id].taskIds.indexOf(
        data._id
      );
      taskRemove({
        initialData,
        setInitialData,
        taskId: data,
        sectionId: data.section_id,
        index,
      });
    });

    return () => {
      socket.off("New_Board_Update");
      socket.off("New_Create_Task");
      socket.off("New_Create_Section");
      socket.off("New_Delete_Section");
      socket.off("New_Delete_Task");
    };
  }, [socket, initialData]);

  useEffect(() => {
    if (taskUpdateLoading === true) return;
    if (!taskUpdateData) return;
    if (initialData && !(Object.keys(initialData).length === 0)) {
      console.log("taskUpdateLoading", initialData);
      socket.emit("Update_Board", { initialData, projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskUpdateLoading]);

  useEffect(() => {
    if (sectionUpdateLoading === true) return;
    if (!sectionUpdateData) return;
    if (initialData && !(Object.keys(initialData).length === 0)) {
      console.log("sectionUpdateLoading");
      socket.emit("Update_Board", { initialData, projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionUpdateLoading]);

  useEffect(() => {
    if (taskCreateLoading === true) return;
    if (!taskCreateData) return;
    if (!(Object.keys(taskCreateData).length === 0)) {
      socket.emit("Create_Task", { taskCreateData, projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskCreateLoading, taskCreateData]);

  useEffect(() => {
    if (sectionCreateLoading === true) return;
    if (!sectionCreateData) return;
    if (!(Object.keys(sectionCreateData).length === 0)) {
      socket.emit("Create_Section", { sectionCreateData, projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionCreateLoading, sectionCreateData]);

  useEffect(() => {
    if (sectionDeleteLoading === true) return;
    if (!sectionDeleteData) return;
    if (!(Object.keys(sectionDeleteData).length === 0)) {
      console.log("sectionDeleteData", sectionDeleteData);
      socket.emit("Delete_Section", { sectionDeleteData, projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionDeleteLoading, sectionDeleteData]);

  useEffect(() => {
    if (taskDeleteLoading === true) return;
    if (!taskDeleteData) return;
    if (!(Object.keys(taskDeleteData).length === 0)) {
      socket.emit("Delete_Task", { taskDeleteData, projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskDeleteLoading, taskDeleteData]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    dispatch(listSectionByProjectId({ project_id: projectId }));
    dispatch(listTaskByProjectId({ project_id: projectId }));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (!sectionLoading && !taskLoading && sectionList && taskList) {
      const prevState = { tasks: {}, sections: {}, sectionOrder: [] };
      const getTaskIds = (id) => {
        const filteredTasks = taskList.filter((task) => task.section_id === id);
        filteredTasks.sort((a, b) => {
          let orderA = a.order;
          let orderB = b.order;
          return orderA.localeCompare(orderB); //using String.prototype.localCompare()
        });
        const taskIds = [];
        filteredTasks.forEach((task) => taskIds.push(task._id));
        return taskIds;
      };
      const setContent = () => {
        taskList.forEach((task) => (prevState.tasks[task._id] = task));
        const newSectionList = JSON.parse(JSON.stringify(sectionList));
        const sortedSectionList = newSectionList.sort((a, b) => {
          let orderA = a.order;
          let orderB = b.order;
          return orderA.localeCompare(orderB); //using String.prototype.localCompare()
        });

        sortedSectionList.forEach((section) => {
          prevState.sections[section._id] = {
            ...section,
            taskIds: getTaskIds(section._id),
          };
          prevState.sectionOrder.push(section._id);
        });
      };
      setContent();
      setInitialData({ ...prevState });
      setInitDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionLoading, taskLoading]);
  // console.log("initial", initialData.sections);
  return (
    <>
      <TaskContext.Provider
        value={{
          sections,
          setSections,
          sectionOrder,
          setSectionOrder,
          dispatch,
          initialData,
          setInitialData,
        }}
      >
        <Navigation />
        <Container className="board-container">
          <Row className="h-100">
            <Col md="4" className="d-flex flex-column h-100 d-none d-lg-block">
              <Sidebar />
            </Col>
            <Col md={8} className="d-flex flex-column h-100">
            <Row className="sidebar-wrapper d-md-block d-lg-none">
            <Col className="">
              <ProfileCard />{" "}
            </Col>
          </Row>

              <h4>
                <Breadcrumb>
                  <Breadcrumb.Item href="/project">Projects</Breadcrumb.Item>
                  <Breadcrumb.Item href="/board" active>
                    {projectName}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </h4>
              <div className="d-flex scrolling-wrapper-x flex-nowrap flex-grow-1 task-board-wrapper my-3">
                <DragDropContext
                  onDragEnd={(result) => {
                    const data = {};
                    data.initialData = initialData;
                    data.setInitialData = setInitialData;
                    onDrag({
                      result,
                      dispatch,
                      data,
                    });
                  }}
                >
                  <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                    key="all-columns"
                  >
                    {(provided) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "100%",
                          }}
                          className="pb-3"
                        >
                          {!initDone
                            ? Array.from(
                                Array(Math.floor(Math.random() * 6))
                              ).map((item, index) => {
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      height: "100%",
                                    }}
                                    className="py-2"
                                  >
                                    <SkeletonSectionCard />
                                  </div>
                                );
                              })
                            : initialData.sectionOrder.map(
                                (sectionId, index) => {
                                  const section =
                                    initialData.sections[sectionId];
                                  console.log("section", section);
                                  const tasks = section.taskIds.map(
                                    (taskId) => initialData.tasks[taskId]
                                  );
                                  return (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        height: "100%",
                                      }}
                                      className="py-2"
                                      key={sectionId}
                                    >
                                      <SectionCard
                                        sectionId={section._id}
                                        section={section}
                                        tasks={tasks}
                                        index={index}
                                      />
                                    </div>
                                  );
                                }
                              )}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </DragDropContext>
                <div className="pt-2">
                  <div
                    className=" d-flex align-items-center justify-content-between border rounded-pill px-5 py-2 text-nowrap btn btn-outline-secondary"
                    onClick={() =>
                      addSection({
                        dispatch,
                        initialData,
                        setInitialData,
                        projectId,
                      })
                    }
                  >
                    <i className="lni lni-plus me-2"></i>
                    <h5>Add Section</h5>
                  </div>
                </div>
              </div>
              
            </Col>
            
          </Row>
        </Container>
      </TaskContext.Provider>
      <Row className="d-block d-lg-none">
            <Sidebar />
        </Row>
      <Footer/>
    </>
  );
};

export default Board;
