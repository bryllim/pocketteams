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
import { listSection, updateSection, updateSectionOrder} from "../actions/sectionActions";
// import { onDragEnd,addColumn, editTitle} from "../functions/TaskFunctions";
import {onDragEnd,orderSections} from "../functions/dragDropFunctions"


const Board = () => {

  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.sectionList);
  // const {sections,loading, error} = sectionList;
  // const dataList = sectionData.sections.data; //change this
  const sectionDataList= dataList.data.sectionDataList;
  const sectionOrderList = dataList.data.sectionOrderList;
  const sectionOrderId = dataList.data.sectionOrderId;
  
  const [sections, setSections] = useState(sectionDataList);
  const [sectionOrder,setSectionOrder] = useState(sectionOrderList);


  const onDrag = ({result}) =>{
    const itemType = result.type
    if(itemType === 'column'){
      const {sectionId,sourceDragIndex,destinationDragIndex} = orderSections({result,sectionOrder,setSectionOrder})
      console.log("before Dispatch")
      dispatch(updateSectionOrder({sectionId,sourceDragIndex,destinationDragIndex,sectionOrderId}));
      console.log("after Dispatch")
    }
    else{
      const {sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type} = onDragEnd({result,sections, sectionOrder, setSections,setSectionOrder})
      dispatch(updateSection({sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type}));
    }
  }

  // const [order,setOrder] = useState(columnOrder)
  // const [tasks, setTask] = useState(itemsFromBackend)
  // const columnOrderList = useSelector(state => state.columnOrderList);

  

  // const taskList = useSelector(state => state.taskList);
  // const {order} = columnOrderList;
 
 
  // const {tasks} = taskList;
 

  // useEffect(() => {
  //   // if(taskList){
  //   //     history.push('/project');
  //   // }
  
  //   // console.log(columnss)
  // }, [dispatch]);

  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   dispatch(updateSections({sourceSectionId,destinationSectionId,taskId}));
  // },[sections])


  useEffect(() => {
      setSections(sectionDataList)
      setSectionOrder(sectionOrderList)
  },[sectionDataList,sectionOrderList])

  useEffect(() => {
    if (!userInfo) {
        history.push('/');
    } 
    dispatch(listSection());
  },[history, userInfo, dispatch])

    
  


  // const addTask = (columnId,columns,setColumns) => {
  //   const sourceColumn = columns[columnId]
  //   const sourceItems = [...sourceColumn.items];
  //   sourceItems.push({ id: uuid(), content: "" })
  //   console.log(sourceItems)
  //   setColumns({
  //     ...columns,
  //     [columnId]: {
  //       ...sourceColumn,
  //       items: sourceItems
  //     },
  //   })

  //   setTask([
  //     ...tasks,
  //     ...sourceItems

  //   ])

  //   // console.log(tasks)
  //   return
  // }

  // const removeSection = (columnId,index) =>{
  //   const columnObject = columns;
  //   delete  columnObject[columnId];
  //   const columnList = order
  //   columnList.splice(index,1)

  //   setColumns({
  //     ...columnObject
  //   })

  //   setOrder([
  //    ...columnList
  //   ])
  //   console.log(index)
  //   console.log(columnList)
  //   console.log(order)

  //   return
  //   //will the task also deleted when col deleted?
  // }

  // const changeSectionTitle =(props) => {
  //   if(props.sectionTitle !== ''){
  //     const columnObject = columns;
  //     columnObject[props.columnId].name = props.sectionTitle
  //     setColumns({
  //       ...columnObject
  //     })
  //   }
  //   else{
  //     removeSection(props.columnId,props.index)
  //   }
  // }

  
  

  return (
    <>
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
                             console.log("first")

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
                                        key={index}
                                       
                                      >
                             
                                          <SectionCard
                                          section = {section}
                                          index={index}
                                          provided={provided}
                                          columnId={sectionId}
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
                        >
                            <i className="lni lni-plus me-2" ></i>
                            <h5>Add Section</h5>
                        </div>
                    </div>
                  </div>
              </Col>
          </Row>
        </Container>
    </>
  );
};

export default Board;
