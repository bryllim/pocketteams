import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import SectionCard from "../components/Cards/SectionCard";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {TaskContext}  from "../contexts/SectionContext"
import { updateSectionTask,createSection, updateSectionOrder,} from "../actions/sectionActions";
import {onDragEnd,orderSections} from "../functions/dragDropFunctions"
import {sectionCreate} from "../functions/sectionFunctions"
import {listSection} from "../actions/sectionActions"
import SkeletonSectionCard from "../components/Cards/SkeletonSectionCard"
import { ObjectID } from 'bson';
import "../css/board.css"

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
  const { projectId} = (props.location) || {};
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const dataList = useSelector((state) => state.sectionList);
  const [sections, setSections] = useState(null);
  const [sectionOrder,setSectionOrder] = useState(null);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
        history.push('/');
    }
    dispatch(listSection({project_id:projectId})); 
  },[history, userInfo, dispatch, projectId]);

  useEffect(() => {
    if(dataList.loading  === false && dataList.data !== undefined){
      const sectionDataList= dataList.data.sectionDataList;
      const sectionOrderList = dataList.data.sectionOrderList;
      setSections(sectionDataList)
      setSectionOrder(sectionOrderList)
    }
  },[dataList])
  
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
                      onDrag({result,dispatch,sectionOrder,setSectionOrder,projectId,sections,setSections})
                    }
                  }
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
                            : (                           
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
