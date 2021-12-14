const onDragEnd = ({result, sections, sectionOrder, setSections, setSectionOrder}) => {
    if (!result.destination) return;

    const { source, destination, type } = result;
    const newSections = JSON.parse(JSON.stringify(sections));
    const sourceSectionId = source.droppableId
    const destinationSectionId = destination.droppableId
    const taskId = result.draggableId
    const sourceIndex = newSections.findIndex(section => section._id === sourceSectionId)
    const destinationIndex = newSections.findIndex(section => section._id === destinationSectionId)
    const sourceSection = newSections[sourceIndex]
    const destinationSection = newSections[destinationIndex]
    const sourceDragindex = source.index;
    const destinationDragindex = destination.index;
    let task = null
  
    if (source.droppableId !== destination.droppableId) {
      const sourceTasks = JSON.parse(JSON.stringify(sourceSection.tasks));
      const destTasks = JSON.parse(JSON.stringify(destinationSection.tasks));
      const [removed] = sourceTasks.splice(source.index, 1); 
      destTasks.splice(destination.index, 0, removed);
      newSections[sourceIndex] = {...sourceSection,tasks:sourceTasks}
      newSections[destinationIndex] = {...destinationSection,tasks:destTasks}
      task = removed
      setSections(newSections);
    } else {
      const sourceSection = newSections[sourceIndex];
      const sourceTasks = JSON.parse(JSON.stringify(sourceSection.tasks));
      const [removed] = sourceTasks.splice(source.index, 1);
      sourceTasks.splice(destination.index, 0, removed);
      newSections[sourceIndex] = {...sourceSection,tasks:sourceTasks}
      task = removed
      setSections(newSections);
    }
    return {sourceSectionId,destinationSectionId,taskId,sourceDragindex,destinationDragindex,type,task}
  };
  
  const orderSections = ({result,sectionOrder,setSectionOrder}) => {
    if (!result.destination) {
      return;
    }
    const { source, destination , draggableId} = result;
    const sectionId = draggableId;
    const sourceDragIndex = source.index;
    const destinationDragIndex = destination.index;
    const newSectionOrder = JSON.parse(JSON.stringify(sectionOrder))
    const [removed] = newSectionOrder.splice(sourceDragIndex, 1)
    newSectionOrder.splice(destinationDragIndex,0,removed)
    setSectionOrder(newSectionOrder)
    return {sectionId, sourceDragIndex, destinationDragIndex}
  }
  
  module.exports = {onDragEnd,orderSections}
