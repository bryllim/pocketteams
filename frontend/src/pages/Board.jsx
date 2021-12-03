import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import SectionCard from "../components/Cards/SectionCard";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState, useContext} from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TaskContext } from "../contexts/SectionContext";
import { SocketContext } from "../contexts/SocketContext";
import {
  updateSectionTask,
  createSection,
  updateSectionOrder,
} from "../actions/sectionActions";
import onDragEnd from '../functions/dragDrop2';
import { orderSections } from "../functions/dragDropFunctions";
import { sectionCreate,sectionUpdate } from "../functions/sectionFunctions";
import {taskUpdate} from '../functions/taskFunctions';
import { listSectionByProjectId, updateSection} from "../actions/sectionActions";
import {listTaskByProjectId,updateTask} from '../actions/taskActions'
import SkeletonSectionCard from "../components/Cards/SkeletonSectionCard";
import { ObjectID } from "bson";
import midString from "../functions/ordering";
import "../css/board.css";
import { set } from "mongoose";

const addSection = async ({
  dispatch,
  initialData,
  setInitialData,
  projectId
}) => {
  const sectionOrder = initialData.sectionOrder;
  const sections = initialData.sections;
  const totalSections = sectionOrder.length;
  const newSection = {
    _id: new ObjectID().toHexString(),
    section_name: "New Section",
    order: totalSections === 0 ? 'n' : midString(sections[sectionOrder[totalSections - 1]].order, ''),
    project_id: projectId,
    taskIds: [],
  }
  sectionCreate({
    initialData,
    setInitialData,
    newSection
  });
  dispatch(
    createSection(newSection)
  );
  return;
};

const onDrag = ({result,data,dispatch}) => {
  const newData = onDragEnd({result,data});
  if(newData && result.type === 'column') dispatch(updateSection({
    params:newData,
    sectionId:result.draggableId
  }));
  else if(newData) dispatch(updateTask({
    params:newData,
    taskId:result.draggableId
  }));
  else{
    console.log('error');
  };
  return
}
  

const Board = (props) => {
  const { projectId } = props.location || {};
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  // const dataList = useSelector((state) => state.sectionList);
  const {loading:sectionLoading, data:sectionList} = useSelector((state) => state.sectionList);
  const {loading:taskLoading, data:taskList} = useSelector((state) => state.taskList);
  const {loading:sectionUpdateLoading, data:sectionUpdateData} = useSelector((state) => state.sectionUpdate);
  const {loading:taskUpdateLoading, data:taskUpdateData} = useSelector((state) => state.taskUpdate);

  const [initialData, setInitialData] = useState({});
  console.log("🚀 ~ file: Board.jsx ~ line 83 ~ Board ~ initialData", initialData)
 
  const [initDone, setInitDone] = useState(false);

  const [sections, setSections] = useState(null);
  const [sectionOrder, setSectionOrder] = useState(null);
  const { userInfo } = userLogin;
  const socket = useContext(SocketContext);
  
  useEffect(() => {
    socket.emit("Join_Board", projectId);
    //subscribe to board events
    socket.on("New_User_Joined" , (data)=>{
      console.log("new user joined")
    })
    return () => {
      socket.off("Join_Board");
      console.log("unsubscribe to board events")
    };
  }, [socket,projectId]);

  useEffect(() => {
    socket.on("New_Section_Update" , (data)=>{
      sectionUpdate({sections,setSections, sectionOrder, setSectionOrder,sectionData:data})
    })
    return () => {
      socket.off("New_Section_Update");
    };
  }, [socket,sections,sectionOrder]);

  useEffect(() => {
    socket.on("New_Board_Update", (data)=>{
      console.log("🚀 ~ file: Board.jsx ~ line 123 ~ Board ~ data", data)
      setInitialData(data);
    })
    return () => {
      socket.off("New_Task_Update");
    };
  }, [socket,initialData]);

  // useEffect(() => {
  //   if (!sectionUpdateLoading && sectionUpdateData) {
  //     socket.emit("Update_Section", sectionUpdateData);
  //   }
  // }, [sectionUpdateData,socket,sectionUpdateLoading]);

  useEffect(() => {
    if (!taskUpdateLoading && !sectionUpdateLoading) {
      if(!taskUpdateData || !sectionUpdateData) return;
      console.log("🚀 ~ file: Board.jsx ~ line 133 ~ Board ~ taskUpdateData", taskUpdateData)
      socket.emit("Update_Board", {initialData,projectId});
    }
  }, [taskUpdateData,socket,taskUpdateLoading,sectionUpdateLoading,sectionUpdateData]);

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
        const filteredTasks = taskList.filter(task => task.section_id === id );
        filteredTasks.sort((a, b) =>{
          let orderA = a.order
          let orderB = b.order
          return orderA.localeCompare(orderB)//using String.prototype.localCompare()
        });
        const taskIds = [];
        filteredTasks.forEach((task) => taskIds.push(task._id));
        return taskIds;
      };
        

      const setContent = () => {
        taskList.forEach((task) => (prevState.tasks[task._id] = task));
        const newSectionList = JSON.parse(JSON.stringify(sectionList));
        const sortedSectionList = newSectionList.sort((a, b) =>{
          let orderA = a.order
          let orderB = b.order
          return orderA.localeCompare(orderB)//using String.prototype.localCompare()
        });
      
        
        sortedSectionList.forEach((section) => {
          prevState.sections[section._id] = {
            ...section,
            taskIds: getTaskIds(section._id),
          }
          prevState.sectionOrder.push(section._id);
        });
      }
      setContent()
      setInitialData({ ...prevState });
      setInitDone(true);
    }
  }, [sectionList, taskList, sectionLoading, taskLoading]);

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
        <Container fluid className="board-container">
          <Row className="h-100">
            <Col
              xl="3"
              className="d-flex flex-column h-100 d-none d-md-block d-md-none d-lg-block  d-lg-none d-xl-block"
            >
              <Sidebar />
            </Col>
            <Col xl="9" className="d-flex flex-column h-100 col-md-12 ">
              <h3>
                <Breadcrumb>
                  <Breadcrumb.Item href="/project">Projects</Breadcrumb.Item>
                  <Breadcrumb.Item href="/board" active>
                    Board
                  </Breadcrumb.Item>
                </Breadcrumb>
              </h3>
              <div className="d-flex scrolling-wrapper-x flex-nowrap flex-grow-1 task-board-wrapper my-3">
                <DragDropContext
                  onDragEnd={(result) => {
                    const data = {}
                    // data.sections = sections;
                    // data.sectionOrder = sectionOrder;
                    // data.setSections = setSections;
                    // data.setSectionOrder = setSectionOrder;
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

                          
                            : initialData.sectionOrder.map((sectionId, index) => {
                                const section = initialData.sections[sectionId];
                                const tasks = section.taskIds.map((taskId) => initialData.tasks[taskId]);
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
                              })}
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
                        projectId
                
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
    </>
  );
};

export default Board;
