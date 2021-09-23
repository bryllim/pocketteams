import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import SectionCard from "../components/SectionCard";
import { Col, Container, Row } from "react-bootstrap";
import { v4 as uuid } from 'uuid';
import TaskCard from "../components/TaskCard";


import { useState } from "react";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  const { source, destination } = result;


  if (!result.destination) return;
  
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

const Board = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <>
      <Navigation />
        <Container fluid>
          <Row>
              <Col xxl="3">
              <Sidebar />
              </Col>
              <Col md="9" className="board-container">
                  <div class="section-title mb-60">
                    <h1>Project</h1>
                  </div>
                  <div className="d-flex scrolling-wrapper-x flex-nowrap">
                  <DragDropContext
                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
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
                            }}
                          >
                            {Object.entries(columns).map(([columnId, column], index) => {
                              return (
                                      <div                                
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center"
                                        }}
                                        key={columnId}
                                      >
                                        <div style={{ margin: 8 }}>
                                          <SectionCard
                                          provided={provided}
                                          column={column}
                                          columnId={columnId}
                                          index={index}
                                          />
                                        </div>
                                      </div>
                              )
                            })}
                          </div> 
                      )}}
                    </Droppable> 
                  </DragDropContext>
                
                 
                    <div className="">
                        <div className="btn d-flex align-items-center border rounded-pill px-5 py-2 text-nowrap">
                            <i class="lni lni-plus"></i>
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
