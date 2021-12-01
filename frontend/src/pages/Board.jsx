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
import onDragEnd from '../functions/dragDrop';
import { orderSections } from "../functions/dragDropFunctions";
import { sectionCreate } from "../functions/sectionFunctions";
import { listSectionByProjectId, updateSection} from "../actions/sectionActions";
import {listTaskByProjectId} from '../actions/taskActions'
import SkeletonSectionCard from "../components/Cards/SkeletonSectionCard";
import { ObjectID } from "bson";
import midString from "../functions/ordering";
import "../css/board.css";

const addSection = async ({
  dispatch,
  projectId,
  sectionOrder,
  setSectionOrder,
  sections,
  setSections,
}) => {
  const totalSections = sections.length;
  const newSection = {
    _id: new ObjectID().toHexString(),
    section_name: "New Section",
    order: totalSections === 0 ? 'n' : midString(sections[totalSections - 1].order, ''),
    project_id: projectId,
    tasks: [],
  }
  sectionCreate({
    sectionOrder,
    setSectionOrder,
    sections,
    setSections,
    newSection
  });
  dispatch(
    createSection(newSection)
  );
  return;
};

const onDrag = ({result,data,dispatch}) => {
  const newData = onDragEnd({result,data});
  if(newData) dispatch(updateSection({
    params:newData,
    sectionId:result.draggableId
  }));
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
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off("Join_Board");
      console.log("unsubscribe to board events")
    };
  }, [socket,projectId]);


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
      console.log('sectionList',sectionList);
      if (sectionList.length === 0 || taskList.length === 0){
        setSections(sectionList);
        setSectionOrder(sectionList);
        return;
      }

      sectionList.sort((a, b) =>{
          let orderA = a.order
          let orderB = b.order
          return orderA.localeCompare(orderB)//using String.prototype.localCompare()
        }
      );
      const sectionIds = sectionList.map((section) => section._id);

      taskList.sort((a, b) =>{
          let orderA = a.order
          let orderB = b.order
          return orderA.localeCompare(orderB)//using String.prototype.localCompare()
        } 
      );
      sectionList.forEach((section) => {
        section.tasks = taskList.filter((task) => task.section_id === section._id);
        section.tasks = section.tasks.sort((a, b) =>{
            let orderA = a.order
            let orderB = b.order
            return orderA.localeCompare(orderB)//using String.prototype.localCompare()
        });
      });
      setSectionOrder(sectionIds)
      setSections(sectionList);
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
                    const data ={}
                    data.sections = sections;
                    data.sectionOrder = sectionOrder;
                    data.setSections = setSections;
                    data.setSectionOrder = setSectionOrder;
                    onDrag({
                      result,
                      dispatch,
                      data
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
                          {!sections
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
                            : sectionOrder?.map((sectionId, index) => {
                                const section = sections.filter((obj) => {
                                  return obj._id === sectionId;
                                })[0];
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
                                      section={section}
                                      index={index}
                                      provided={provided}
                                      sectionId={sectionId}
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
                        projectId,
                        sectionOrder,
                        setSectionOrder,
                        sections,
                        setSections,
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
