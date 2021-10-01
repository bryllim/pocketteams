import React,{useContext,useState} from "react";
import TaskCard from './TaskCard'
import { Droppable, Draggable} from 'react-beautiful-dnd' 
import {TaskContext} from "../../contexts/SectionContext"
import AddTaskModal from "../Modals/AddTaskModal";

const SectionCard = ({ provided,snapshot,column,columnId,index, }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <p
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </p>
));

  const {addTask,columns,setColumns} = useContext(TaskContext)

  return (
    <>
      <Draggable draggableId={columnId} index={index} >
        {provided => {
          return(
            <div 
              {...provided.draggableProps}
              ref={provided.innerRef}
              className="d-flex flex-column section-wrapper mx-2"
            >
              
              <div className="d-flex justify-content-between align-items-center ps-3 pe-2 py-2">
                <h5 className="text-white"
                  {...provided.dragHandleProps}
                >{column.name}</h5>
                <div>
                  <button class="btn text-white" type="button">
                    <i class="lni lni-plus fs-5"></i>
                  </button>
              
                  <button class="btn text-white" type="button">
                    <i class="lni lni-more-alt fs-5 "></i>
                  </button>
                </div>
              </div>
              <Droppable droppableId={columnId} key={columnId} type="task">
                {(provided,snapshot) => {
                  return(
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className=" section-wrapper-internal scrolling-wrapper-y flex-nowrap pt-4 basecard"
                    >
                      {column.items.map((item, index) => {
                        return (
                          <>
                            <TaskCard
                              provided={provided}
                              snapshot={snapshot}
                              item={item}
                              index={index}
                            />
                          </>
                        )})}
                      {provided.placeholder}
                        <div class="d-flex justify-content-center align-items-center theme-btn mx-auto my-4"  
                          onClick={() => addTask(columnId,columns,setColumns)} style={{width:"250px", height:"50px"}}>
                          <button class="btn" type="button">
                              <i class="lni lni-plus text-white"></i>
                          </button>
                          <h6 class="text-white">Add Another</h6>
                        </div>
                        
                    </div> 
                  )
                }}  
              </Droppable> 
            </div>
          )
        }}
         {/* MODALS */}
        
    </Draggable> 
    <AddTaskModal showModal={show} hideModal={handleClose} />
    </>
  )}

export default SectionCard;