import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import SectionCard from "../components/Cards/SectionCard";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState, useContext,useCallback} from "react";
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {TaskContext}  from "../contexts/SectionContext"
import { updateSectionTask,createSection, updateSectionOrder,} from "../actions/sectionActions";
import {onDragEnd,orderSections} from "../functions/dragDropFunctions"
import {sectionCreate,sectionTaskUpdate} from "../functions/sectionFunctions"
import {listSection} from "../actions/sectionActions"
import SkeletonSectionCard from "../components/Cards/SkeletonSectionCard"
import useInterval from "../components/useInterval"
import { ObjectID } from 'bson';
import "../css/board.css"
import { SocketContext } from "../contexts/SocketContext";


const addSection = async ({dispatch,projectId,sectionOrder,setSectionOrder,sections,setSections})=>{
  const sectionId =  new ObjectID().toHexString()
  const sectionName = "New Section";
  sectionCreate({sectionOrder,setSectionOrder,sections,setSections,sectionId,projectId,sectionName})
  dispatch(createSection({section_name: sectionName,project_id:projectId,section_id:sectionId}))
  return
}

const onDrag = ({result,dispatch,sectionOrder,setSectionOrder,projectId,sections,setSections}) =>{ //transfer outside function component
  const itemType = result.type
  if(itemType === 'column'){
   
    if(result.destination === null || result.destination.index === result.source.index ) return
    const {sectionId,sourceDragIndex,destinationDragIndex} = orderSections({result,sectionOrder,setSectionOrder})
    dispatch(updateSectionOrder({sectionId,sourceDragIndex,destinationDragIndex,project_id: projectId}));
    console.log("drag column",result)
    console.log("drag",result.destination === null )
  }
  else{
    if (!result.destination) return;
    const {sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type,task} = onDragEnd({result,sections, sectionOrder, setSections,setSectionOrder})
    dispatch(updateSectionTask({sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type,task}));
  }
  return
}

const Board = (props) => {
  console.log("board")
  const { projectId} = (props.location) || {};
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const dataList = useSelector((state) => state.sectionList);
  const sectionTasksUpdate = useSelector((state) => state.sectionTasksUpdate);
  const [sections, setSections] = useState(null);
  const [sectionOrder,setSectionOrder] = useState(null);
  const [dragging,setDragging] = useState(false)
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
    socket.on("New_Section_Update" , (data)=>{
      console.log("update section task ", data)
      const dragProps = data.data.dragProps
      const task = data.data.newTask
      sectionTaskUpdate({sections,setSections,task,dragProps})
    })
    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off("New_Section_Update");
      console.log("unsubscribe to board events")
    };
  });


  useEffect(() => {
    if (!userInfo) {
        history.push('/');
    }
  },[history, userInfo]);

  useEffect(() => {
    dispatch(listSection({project_id:projectId}));
  }, []);

  useEffect(() => {
    if(sectionTasksUpdate.loading === false && sectionTasksUpdate.data !== undefined){
      const data = sectionTasksUpdate.data
      const dragProps = data.dragProps
      const task = data.newTask
      console.log('new data',data)
      socket.emit("Update_Section_Task",{data,projectId})
      sectionTaskUpdate({sections,setSections,task,dragProps})
    }
    
  }, [sectionTasksUpdate]);

  useEffect(() => {
    if( dataList.loading  === false && dataList.data !== undefined){
      const sectionDataList= dataList.data.sectionDataList;
      const sectionOrderList = dataList.data.sectionOrderList;
      setSections(sectionDataList)
      setSectionOrder(sectionOrderList)
      console.log("set new data")
    }
  },[dataList]);
  
  return (
    <>  
     <TaskContext.Provider value={{sections,setSections,sectionOrder,setSectionOrder,dispatch}}>
      <Navigation />
        <Container fluid className="board-container">
          <Row className="h-100">
              <Col xl="3" className="d-flex flex-column h-100 d-none d-md-block d-md-none d-lg-block  d-lg-none d-xl-block">
                <Sidebar/>
              </Col>
              <Col xl="9" className="d-flex flex-column h-100 col-md-12 ">
              <h3><Breadcrumb>
              <Breadcrumb.Item href="/project">Projects</Breadcrumb.Item>
              <Breadcrumb.Item href="/board" active>Board</Breadcrumb.Item>
            </Breadcrumb></h3>
                  <div className="d-flex scrolling-wrapper-x flex-nowrap flex-grow-1 task-board-wrapper my-3" >
                  <DragDropContext
                    onDragEnd={result => {
                      setDragging(false)
                      onDrag({result,dispatch,sectionOrder,setSectionOrder,projectId,sections,setSections})
                    }}
                    onDragStart={()=>{
                      setDragging(true)
                    }}
                  >
                    <Droppable 
                      droppableId="all-columns" direction="horizontal" type="column"
                      key="all-columns"
                    >
                      {provided => {
                        return(
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height:"100%"
                            }}
                            className="pb-3"
                          >                            
                            {!sections ?(
                              Array.from(Array(Math.floor(Math.random() * 6))).map((item,index) => {
                                return(
                                <div                          
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  height:'100%',
                                }}
                                className = "py-2"
                                >
                                <SkeletonSectionCard/>
                              </div>)
                            }))                           
                            : 
                            (                           
                              sectionOrder?.map((sectionId,index)=>{
                              const section = sections.filter(obj => {
                                return obj._id === sectionId
                              })[0]
                                return (                                
                                  <div                                
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      height:'100%',
                                    }}
                                    className = "py-2"
                                    key={sectionId}
                                  >
                                    <SectionCard
                                    section = {section}
                                    index={index}
                                    provided={provided}
                                    sectionId={sectionId}
                                    />                                          
                                  </div>
                                )                               
                              })                     
                            )}
                            {provided.placeholder}                     
                          </div>                          
                      )}}                     
                    </Droppable> 
                  </DragDropContext>                           
                    <div className="pt-2">
                        <div className=" d-flex align-items-center justify-content-between border rounded-pill px-5 py-2 text-nowrap btn btn-outline-secondary" 
                          onClick={() => addSection({dispatch,projectId,sectionOrder,setSectionOrder,sections,setSections})}
                        >
                            <i className="lni lni-plus me-2" ></i>
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
