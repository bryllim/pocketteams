import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import SectionCard from "../components/Cards/SectionCard";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import "../css/board.css"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {TaskContext}  from "../contexts/SectionContext"
import { updateSectionTask,createSection, updateSectionOrder,} from "../actions/sectionActions";
import {onDragEnd,orderSections} from "../functions/dragDropFunctions"
import {sectionCreate,sectionUpdate} from "../functions/sectionFunctions"
import { taskUpdate } from "../functions/TaskFunctions"

const addSection = async ({dispatch,projectId,sectionOrder,setSectionOrder,sections,setSections})=>{
 sectionCreate({sectionOrder,setSectionOrder,sections,setSections})
 dispatch(createSection({section_name: 'New Section',project_id:projectId}))
 return
}

const onDrag = ({result,dispatch,sectionOrder,setSectionOrder,projectId,sections,setSections}) =>{ //transfer outside function component
  const itemType = result.type
  console.log('result', result)
  if(itemType === 'column'){
    if(result.destination.index === result.source.index ) return
    const {sectionId,sourceDragIndex,destinationDragIndex} = orderSections({result,sectionOrder,setSectionOrder})
    dispatch(updateSectionOrder({sectionId,sourceDragIndex,destinationDragIndex,project_id: projectId}));
  }
  else{
    if (!result.destination) return;
    const {sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type} = onDragEnd({result,sections, sectionOrder, setSections,setSectionOrder})
    dispatch(updateSectionTask({sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type}));
  }
  return
}

const Board = (props) => {
  const {sectionList, projectId} = (props.location) || {};
  const sectionOrderList = sectionList.map(order =>{
    return order._id
  })
  const dispatch = useDispatch();
  const history = useHistory();
  const createdSection = useSelector((state) => state.sectionCreate)
  const createdTask = useSelector((state) => state.taskCreate)
  const userLogin = useSelector((state) => state.userLogin);
  const [sections, setSections] = useState(sectionList);
  const [sectionOrder,setSectionOrder] = useState(sectionOrderList);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
        history.push('/');
    } 
  },[history, userInfo, dispatch])

  useEffect(() => {
    if(createdSection.loading  === false && createdSection.data !== undefined){
      sectionUpdate({sectionOrder,setSectionOrder,sections,setSections,createdSection})
    }
  },[createdSection])

  useEffect(() => {
    if(createdTask.loading  === false && createdTask.data !== undefined){
      taskUpdate({createdTask,sections,setSections})
    }
  },[createdTask])

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
                    onDragEnd={result => onDrag({result,dispatch,sectionOrder,setSectionOrder,projectId,sections,setSections})}
                  >
                    <Droppable 
                      droppableId="all-columns" direction="horizontal" type="column"
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
                           
                           {(sectionOrder && sections)?(sectionOrder.map((sectionId,index)=>{

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
                              
                            })):<></>}
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
