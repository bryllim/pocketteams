import midString from './ordering'

const onDragEnd = ({
  result,
  data
}) => {
    const {sections,setSections,sectionOrder,setSectionOrder} = data
    const newSections = [...sections]
    console.log("sections", newSections);
    const newSectionOrder = JSON.parse(JSON.stringify(sectionOrder))
    var newOrder;
    const { destination, source, draggableId, type } = result;
    console.log("result", result)
    
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === "column") {
      if (draggableId !== sectionOrder[source.index]) return
      if (destination.index === 0) {
        newOrder = midString("", newSections[0].order);
      } else if (destination.index === newSectionOrder.length - 1) {
        newOrder = midString(
          newSections[destination.index].order,
          ""
        );
      } else if (destination.index < source.index) {
        newOrder = midString(
          newSections[destination.index - 1].order,
          newSections[destination.index].order
        );
      } else {
        newOrder = midString(
          newSections[destination.index].order,
          newSections[destination.index + 1].order
        );
      }
      newSections.map((section, index) =>  section._id === draggableId ? newSections[index].order = newOrder : null)
      newSections.sort((a, b) =>{
        let orderA = a.order
        let orderB = b.order
        return orderA.localeCompare(orderB)//using String.prototype.localCompare()
      }
    );
      newSectionOrder.splice(source.index, 1);
      newSectionOrder.splice(destination.index, 0, draggableId);
      setSectionOrder(newSectionOrder);
      setSections(newSections)
      return {order:newOrder};
    }
  
    const startList = newSections.find(section => section._id === source.droppableId);
    const endList = newSections.find(section => section._id === destination.droppableId);
    if (startList.droppableId === endList.droppableId) {
      const section = startList;
      if (destination.index === 0)
        newOrder = midString("", section.tasks[1].order);
      else if (destination.index === section.tasks.length - 1)
      {
      console.log("destination.index", destination.index)
        newOrder = midString(
          section.tasks[section.tasks.length - 1].order,
          ""
        );}
      else if (destination.index < source.index)
        newOrder = midString(
          section.tasks[destination.index - 1].order,
          section.tasks[destination.index].order
        );
      else
        newOrder = midString(
          section.tasks[destination.index].order,
          section.tasks[destination.index + 1].order
        );

      const newTaskOrders = [...section.tasks];
      newTaskOrders.map((task, index) =>  task._id === draggableId ? newTaskOrders[index].order = newOrder : null)
      newTaskOrders.sort((a, b) =>{
        let orderA = a.order
        let orderB = b.order
        return orderA.localeCompare(orderB)//using String.prototype.localCompare()
      });
      
      newSections.map((section, index) =>  section._id === source.droppableId ? newSections[index].tasks = newTaskOrders : null)
      console.log("newSections", newSections);
      setSections(newSections);
      return {order:newOrder};
    }
  }
  //   // Move from one list to another
  //   if (endList.taskIds.length === 0) newOrder = "n";
  //   else if (destination.index === 0) {
  //     newOrder = midString("", initialData.tasks[endList.taskIds[0]].order);
  //   } else if (destination.index === endList.taskIds.length)
  //     newOrder = midString(
  //       initialData.tasks[endList.taskIds[destination.index - 1]].order,
  //       ""
  //     );
  //   else
  //     newOrder = midString(
  //       initialData.tasks[endList.taskIds[destination.index - 1]].order,
  //       initialData.tasks[endList.taskIds[destination.index]].order
  //     );
  //   dispatch(
  //     updateCardById(draggableId, { order: newOrder, listId: endList._id })
  //   );
  //   const text = `${user.username} moved ${initialData.tasks[draggableId].name} from ${startList.name} to ${endList.name}`;
  //   const recentActivity = activities[activities.length - 1];
  //   if (
  //     recentActivity.text ===
  //       `${user.username} moved ${initialData.tasks[draggableId].name} from ${endList.name} to ${startList.name}` &&
  //     moment(recentActivity.createdAt).fromNow().includes("second")
  //   ) {
  //     dispatch(deleteActivityById(recentActivity._id));
  //   } else dispatch(createNewActivity({ text, boardId: currBoard._id }, token));

  //   const startTaskIds = Array.from(startList.taskIds);
  //   startTaskIds.splice(source.index, 1);
  //   const newStartList = {
  //     ...startList,
  //     taskIds: startTaskIds
  //   };
  //   const destinationTask = initialData.tasks[draggableId];
  //   destinationTask.order = newOrder;
  //   const endTaskIds = Array.from(endList.taskIds);
  //   endTaskIds.splice(destination.index, 0, draggableId);
  //   const newEndList = {
  //     ...endList,
  //     taskIds: endTaskIds
  //   };
  //   const newData = {
  //     ...initialData,
  //     columns: {
  //       ...newSections,
  //       [newStartList._id]: newStartList,
  //       [newEndList._id]: newEndList
  //     },
  //     tasks: {
  //       ...initialData.tasks,
  //       draggableId: destinationTask
  //     }
  //   };
  //   setInitialData(newData);
  export default onDragEnd;