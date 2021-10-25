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
import { listSection } from "../actions/sectionActions";
// import { onDragEnd,addColumn, editTitle} from "../functions/TaskFunctions";
import {onDragEnd} from "../functions/dragDropFunctions"



// const itemsFromBackend = [
//   { id: uuid(), content: "First task", description: "this is desc", date: "10/13/2021" },
//   { id: uuid(), content: "Second task", description: "this is desc", date: "10/13/2021" },
//   { id: uuid(), content: "Third task", description: "this is desc", date: "10/13/2021" },
//   { id: uuid(), content: "Fourth task", description: "this is desc", date: "10/13/2021" },
//   { id: uuid(), content: "Fifth task", description: "this is desc", date: "10/13/2021" },
//   { id: uuid(), content: "Sixth task", description: "this is desc", date: "10/13/2021" },
//   { id: uuid(), content: "Seventh task", description: "this is desc", date: "10/13/2021" },
//   { id: uuid(), content: "Eighth task", description: "this is desc", date: "10/13/2021" },
//   { id: uuid(), content: "Ninth task", description: "this is desc", date: "10/13/2021" },
// ];


// const columnsFromBackend = {
//   'col1': {
//     name: "Requested",
//     items: itemsFromBackend
//   },
//   'col2': {
//     name: "To do",
//     items: []
//   },
// };

// const columnOrder = ['col1', 'col2']






const Board = () => {

  const dispatch = useDispatch();
  const sectionList = useSelector((state) => state.sectionList);
  // const {sections,loading, error} = sectionList;
  const sections = sectionList;
  // const [columns, setColumns] = useState(columnList);
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

  useEffect(() => {
      console.log(sections.sections)
  },[sections])

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
                    onDragEnd={result => onDragEnd(result, sections.sections)}
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
                           
                           {sections.sections?(sections.sections.map((section,index)=>{
                              // const column = columns[columnId]
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
                                          // column={column}
                                          // columnId={columnId}
                                          // index={index}
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
