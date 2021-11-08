const onDragEnd = ({result, sections, sectionOrder, setSections, setSectionOrder}) => {
    console.log('onDragEnd')
    const { source, destination, type } = result;
    const newSections = [...sections]
    const sourceSectionId = source.droppableId
    const destinationSectionId = destination.droppableId
    const taskId = result.draggableId
    const sourceIndex = newSections.findIndex(section => section._id === sourceSectionId)
    const destinationIndex = newSections.findIndex(section => section._id === destinationSectionId)
    const sourceSection = newSections[sourceIndex]
    const destinationSection = newSections[destinationIndex]
    const sourceDragindex = source.index;
    const destinationDragindex = destination.index;
    if (!result.destination) {
      console.log('error')
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const sourceTasks = [...sourceSection.tasks];
      const destTasks = [...destinationSection.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      
      destTasks.splice(destination.index, 0, removed);
      
      newSections[sourceIndex] = {...sourceSection,tasks:sourceTasks}
      newSections[destinationIndex] = {...destinationSection,tasks:destTasks}
      console.log('newSections',newSections)
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
    return {sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type}
  };
  
  const orderSections = ({result,sectionOrder,setSectionOrder}) => {
    console.log('orderSections')
    if (!result.destination) {
      console.log('error2')
      return;
    }
    const { source, destination , draggableId} = result;
    const sectionId = draggableId;
    const sourceDragIndex = source.index;
    const destinationDragIndex = destination.index;
    const newSectionOrder = [...sectionOrder]
    const [removed] = newSectionOrder.splice(sourceDragIndex, 1)
    newSectionOrder.splice(destinationDragIndex,0,removed)
    setSectionOrder(newSectionOrder)
    return {sectionId, sourceDragIndex, destinationDragIndex}
  }



  module.exports = {onDragEnd,orderSections}


  // export default onDragEnd;