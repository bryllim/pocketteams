const onDragEnd = (result, sections) => {
    const { source, destination, type } = result;
    // console.log(destination)
    // console.log(result.destination)
    console.log(source)
    console.log(destination)
    console.log(sections)
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
      const sourceSection= sections[source.index];
      const destSection= sections[destination.index];
      const sourceTasks = [...sourceSection.tasks];
      const destTasks = [...destSection.tasks];
      console.log("Before");
      console.log(sourceSection)
      console.log(destSection)
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      console.log("After");
      console.log(sourceTasks)
      console.log(destTasks)
      // setSections({
      //   ...sections,
      //   [source.droppableId]: {
      //     ...sourceSection,
      //     items: sourceTasks
      //   },
      //   [destination.droppableId]: {
      //     ...destSection,
      //     items: destTasks
      //   }
      // });
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