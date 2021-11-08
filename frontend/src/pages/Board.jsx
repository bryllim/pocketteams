import SideBar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import SectionCard from "../components/Cards/SectionCard";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import "../css/board.css"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { listTasks } from "../actions/taskActions";
import {TaskContext}  from "../contexts/SectionContext"
import { listSection, updateSectionTask,createSection, updateSectionOrder,} from "../actions/sectionActions";
// import { onDragEnd,addColumn, editTitle} from "../functions/TaskFunctions";
import {onDragEnd,orderSections} from "../functions/dragDropFunctions"
import {sectionCreate} from "../functions/sectionFunctions"

const addSection = async ({dispatch,section_order_id,sectionOrder,setSectionOrder,sections,setSections})=>{
 sectionCreate({sectionOrder,setSectionOrder,sections,setSections})
 dispatch(createSection({section_name: 'New Section',section_order_id}))
 return
}


const Board = () => {
  const section_order_id = '6179228d94d94e1c2c6c21e3'
  const dispatch = useDispatch();
  const onDrag = ({result}) =>{ //transfer outside function component
    const itemType = result.type
    console.log('result', result)
    if(itemType === 'column'){
      if(result.destination.index === result.source.index ) return
      const {sectionId,sourceDragIndex,destinationDragIndex} = orderSections({result,sectionOrder,setSectionOrder})
      dispatch(updateSectionOrder({sectionId,sourceDragIndex,destinationDragIndex,sectionOrderId}));
    }
    else{
      if (!result.destination) return;
      const {sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type} = onDragEnd({result,sections, sectionOrder, setSections,setSectionOrder})
      dispatch(updateSectionTask({sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type}));
    }
    return
  }

  const createdSection = useSelector((state) => state.sectionCreate)
  const createdTask = useSelector((state) => state.taskCreate)
  
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
        history.push('/');
    } 
    dispatch(listSection());
  },[history, userInfo, dispatch])

  const dataList = useSelector((state) => state.sectionList);
  const sectionDataList= dataList.data.sectionDataList;
  const sectionOrderList = dataList.data.sectionOrderList;
  const sectionOrderId = dataList.data.sectionOrderId;
  const [sections, setSections] = useState(sectionDataList);
  const [sectionOrder,setSectionOrder] = useState(sectionOrderList);


  useEffect(()=>{
    if(dataList.loading === false){
      setSections(sectionDataList)
      setSectionOrder(sectionOrderList)
    }
},[dataList,])

useEffect(() => {
  if(createdSection.loading  === false && createdSection.data !== undefined){
    const newSection = createdSection.data
    const sectionId = newSection._id
    const newSections = [...sections]
    const newSectionOrder = [...sectionOrder]
    newSections.at(-1)._id = sectionId
    newSectionOrder.pop()
    newSectionOrder.push(sectionId)
    setSections(newSections)
    setSectionOrder(newSectionOrder)
  }
  if(createdTask.loading === false && createdTask.data !== undefined){
    const newTask = createdTask.data
    const sectionId = newTask.section_id
    const section = sections.find(section => section._id === sectionId)
    const newTaskList = [...section.tasks]
    newTaskList.at(-1)._id = newTask._id
    newTaskList.at(-1).task_name = newTask.task_name
    setSections([...sections.map(section => section._id === sectionId ? {...section,tasks:newTaskList} : section)])
  }
},[createdSection,createdTask])
console.log(sectionOrder)
  return (
    <>
     <TaskContext.Provider value={{sections,setSections,sectionOrder,setSectionOrder,dispatch}}>
      <Navigation />
        <Container fluid className="board-container">
          <Row className="h-100">
              <Col xl="3" className="d-flex flex-column h-100 d-none d-md-block d-md-none d-lg-block  d-lg-none d-xl-block">
                <SideBar/>
              </Col>
              <Col xl="9" className="d-flex flex-column h-100 col-md-12 ">
              <h3><Breadcrumb>
              <Breadcrumb.Item href="/project">Projects</Breadcrumb.Item>
              <Breadcrumb.Item href="/board" active>Board</Breadcrumb.Item>
            </Breadcrumb></h3>
                  <div className="d-flex scrolling-wrapper-x flex-nowrap flex-grow-1 task-board-wrapper my-3" >
                  <DragDropContext
                    onDragEnd={result => onDrag({result})}
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
                            // console.log('sections')
                            // console.log(sections)
                            // console.log(sectionOrder)
                            // console.log(sectionId)
                            // console.log(section)
                        
                           



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
                          onClick={() => addSection({dispatch,section_order_id,sectionOrder,setSectionOrder,sections,setSections})}
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
