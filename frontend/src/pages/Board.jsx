import SideBar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import SectionCard from "../components/Cards/SectionCard";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { v4 as uuid } from 'uuid';
import TaskCard from "../components/Cards/TaskCard";
import { useEffect, useState } from "react";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {TaskContext}  from "../contexts/SectionContext"
import "../css/board.css"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const itemsFromBackend = [
  { id: uuid(), content: "First task", description: "this is desc", date: "10/13/2021" },
  { id: uuid(), content: "Second task", description: "this is desc", date: "10/13/2021" },
  { id: uuid(), content: "Third task", description: "this is desc", date: "10/13/2021" },
  { id: uuid(), content: "Fourth task", description: "this is desc", date: "10/13/2021" },
  { id: uuid(), content: "Fifth task", description: "this is desc", date: "10/13/2021" },
  { id: uuid(), content: "Sixth task", description: "this is desc", date: "10/13/2021" },
  { id: uuid(), content: "Seventh task", description: "this is desc", date: "10/13/2021" },
  { id: uuid(), content: "Eighth task", description: "this is desc", date: "10/13/2021" },
  { id: uuid(), content: "Ninth task", description: "this is desc", date: "10/13/2021" },
];


const columnsFromBackend = {
  'col1': {
    name: "Requested",
    items: itemsFromBackend
  },
  'col2': {
    name: "To do",
    items: []
  },
};

const columnOrder = ['col1', 'col2']

const onDragEnd = (result, columns, setColumns,order, setOrder) => {
  const { source, destination, type } = result;


  if (!result.destination) return;

  //if dragging in column
  if(type==="column"){
    //insert the source index to destination index

    const columnList = order
    const movedColumn = columnList.splice(source.index, 1)
    columnList.splice(destination.index,0, movedColumn[0])

    setOrder([
     ...order
    ])
    return
  }


  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const addColumn =(order,setOrder,columns,setColumns) => {
  const colName = 'test' + Math.floor((Math.random() * 10) + 1);
  setColumns({
    ...columns,
      [colName]:{
      name:colName,
      items: []
    }
  })

  
  setOrder([
    ...order,
    colName
   ])
}


const Board = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [order,setOrder] = useState(columnOrder)
  const [tasks, setTask] = useState(itemsFromBackend)


  const editTitle = (index, name, id,columnId) =>{ 
    const sourceTask = tasks.find(x => x.id === id)
    console.log(name)
    console.log(id)
    console.log(sourceTask)
    console.log(tasks)
    if(name === ''){
      const sourceColumn = columns[columnId];
      const sourceItems = [...sourceColumn.items];
      sourceItems.splice(index, 1);
      setColumns({
        ...columns,
        [columnId]: {
          ...sourceColumn,
          items: sourceItems
        },
      });
      return
    }
    sourceTask.content = name
    setTask([
      ...tasks
    ])
    return
  }

  const addTask = (columnId,columns,setColumns) => {
    const sourceColumn = columns[columnId]
    const sourceItems = [...sourceColumn.items];
    sourceItems.push({ id: uuid(), content: "" })
    console.log(sourceItems)
    setColumns({
      ...columns,
      [columnId]: {
        ...sourceColumn,
        items: sourceItems
      },
    })

    setTask([
      ...tasks,
      ...sourceItems

    ])

    // console.log(tasks)
    return
  }

  const removeSection = (columnId,index) =>{
    const columnObject = columns;
    delete  columnObject[columnId];
    const columnList = order
    columnList.splice(index,1)

    setColumns({
      ...columnObject
    })

    setOrder([
     ...columnList
    ])
    console.log(index)
    console.log(columnList)
    console.log(order)

    return
    //will the task also deleted when col deleted?
  }

  const changeSectionTitle =(props) => {
    if(props.sectionTitle !== ''){
      const columnObject = columns;
      columnObject[props.columnId].name = props.sectionTitle
      setColumns({
        ...columnObject
      })
    }
    else{
      removeSection(props.columnId,props.index)
    }
  }

  
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push('/');
          } 
    },[history, userInfo])

  return (
    <>
    <TaskContext.Provider value={{addTask,columns,setColumns,editTitle,removeSection,changeSectionTitle}}>
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
                    onDragEnd={result => onDragEnd(result, columns, setColumns,order,setOrder)}
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
                            {order.map((columnId,index)=>{
                              const column = columns[columnId]
                              return (
                                      <div                                
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          height:'100%'
                                        }}
                                        key={columnId}
                                       
                                      >
                                          <SectionCard
                                          provided={provided}
                                          column={column}
                                          columnId={columnId}
                                          index={index}
                                          />
                                      </div>
                              )
                              
                            })}
                            {provided.placeholder}
                          </div> 
                          
                      )}}
                      
                    </Droppable> 
                  </DragDropContext>
                
                 
                    <div className="">
                        <div className=" d-flex align-items-center justify-content-between border rounded-pill px-5 py-2 text-nowrap btn btn-outline-secondary" 
                          onClick={() =>addColumn(order,setOrder,columns,setColumns)}>
                            <i class="lni lni-plus me-2" ></i>
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
