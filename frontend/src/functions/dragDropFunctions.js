const onDragEnd = ({result, sections, sectionOrder, setSections}) => {
  
    const { source, destination, type } = result;
    

    const newSections = [...sections]
    // console.log(destination)
    // console.log(result.destination)
    // console.log(source)
    // console.log(destination)
    // console.log(result)
    // console.log(sections)

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
      const sourceSectionId = source.droppableId
      const destinationSectionId = destination.droppableId
      const taskId = result.draggableId

      const sourceIndex = sectionOrder.indexOf(source.droppableId)
      const destinationIndex = sectionOrder.indexOf(destination.droppableId)
      const sourceSection = newSections[sourceIndex];
      const destSection= newSections[destinationIndex];
      const sourceTasks = [...sourceSection.tasks];
      const destTasks = [...destSection.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      
      newSections[sourceIndex] = {...sourceSection,tasks:sourceTasks}
      newSections[destinationIndex] = {...destSection,tasks:destTasks}
      // console.log('newSection')
      console.log(result)

      setSections([
        ...newSections,
       
        // sections[sourceIndex]:{

        // }
        // {
        //   ...sourceSection,
        //     tasks: sourceTasks
        // },
        // sections[destinationIndex] = {
        //     ...destSection,
        //     tasks: destTasks
        // }
       
        // sections[destinationIndex]({
        //   ...destSection,
        //   tasks: destTasks
        // })
        // [sourceIndex]: {
        //   ...sourceSection,
        //   tasks: sourceTasks
        // },
        // [destinationIndex]: {
        //   ...destSection,
        //   tasks: destTasks
        // }
      ]);

      return {sourceSectionId,destinationSectionId,taskId}

    } else {
      const column = sections[source.droppableId];
      const copiedTasks = [...column.items];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);
      // setSections({
      //   ...sections,
      //   [source.droppableId]: {
      //     ...column,
      //     items: copiedTasks
      //   }
      // });
    }
  };
  
  module.exports = {onDragEnd}


  // export default onDragEnd;