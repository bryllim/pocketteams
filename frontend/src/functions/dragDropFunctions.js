const onDragEnd = ({result, sections, sectionOrder, setSections}) => {
  
    const { source, destination, type } = result;
    

    const newSections = [...sections]
    const sourceSectionId = source.droppableId
    const destinationSectionId = destination.droppableId
    const taskId = result.draggableId
    const sourceIndex = sectionOrder.indexOf(source.droppableId)
    const destinationIndex = sectionOrder.indexOf(destination.droppableId)
    const sourceSection = newSections[sourceIndex];
    const destSection= newSections[destinationIndex];
    const sourceDragindex = source.index;
    const destinationDragindex = destination.index;

    if (!result.destination) return;

    //if dragging in column
    // if(type==="column"){
    //   //insert the source index to destination index
    //   const columnList = order
    //   const movedSection= columnList.splice(source.index, 1)
    //   columnList.splice(destination.index,0, movedSection[0])
  
    //   setOrder([
    //    ...order
    //   ])
    //   return
    // }
    if (source.droppableId !== destination.droppableId) {
   

      const sourceTasks = [...sourceSection.tasks];
      const destTasks = [...destSection.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      
      destTasks.splice(destination.index, 0, removed);
      
      newSections[sourceIndex] = {...sourceSection,tasks:sourceTasks}
      newSections[destinationIndex] = {...destSection,tasks:destTasks}
    
      setSections([
        ...newSections,
      ]);

    } else {
      const sourceSection = newSections[sourceIndex];
      const sourceTasks = [...sourceSection.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      sourceTasks.splice(destination.index, 0, removed);

      newSections[sourceIndex] = {...sourceSection,tasks:sourceTasks}

      setSections([
        ...newSections,
      ]);
    }
    console.log(result)
    
    return {sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex}
  };
  
  module.exports = {onDragEnd}


  // export default onDragEnd;