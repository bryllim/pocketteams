const onDragEnd = ({result, sections, sectionOrder, setSections, setSectionOrder}) => {
  
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
    
    return {sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type}
  };
  
  const orderSections = ({result,sectionOrder,setSectionOrder}) => {

    if (!result.destination) return;

    const { source, destination , draggableId} = result;

    const sectionId = draggableId;
    const sourceDragIndex = source.index;
    const destinationDragIndex = destination.index;

    const newSectionOrder = [...sectionOrder]
    const [removed] = newSectionOrder.splice(sourceDragIndex, 1)
    newSectionOrder.splice(destinationDragIndex,0,removed)

    setSectionOrder([
      ...newSectionOrder
    ])

    console.log('orderSections')

    console.log(result)
    console.log(newSectionOrder)


    return {sectionId, sourceDragIndex, destinationDragIndex}
  }



  module.exports = {onDragEnd,orderSections}


  // export default onDragEnd;