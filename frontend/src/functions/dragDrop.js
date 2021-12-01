import midString from './ordering'

const onDragEnd = ({
  result,
  data
}) => {
    const {sections,setSections,sectionOrder,setSectionOrder} = data
    const newSections = JSON.parse(JSON.stringify(sections))
    const newSectionOrder = JSON.parse(JSON.stringify(sectionOrder))
    var newOrder;
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === "column") {
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
      const destinationColumn = newSections[destination.index];
      destinationColumn.order = newOrder;
      newSectionOrder.splice(source.index, 1);
      newSectionOrder.splice(destination.index, 0, draggableId);
      setSections([...newSections],
        {[destination.index]:{
          ...destinationColumn,
          order:newOrder
        }}
      )
      setSectionOrder(newSectionOrder);
      return {order:newOrder};
    }
    return
  }

  export default onDragEnd;


    // const startList = newSections[source.droppableId];
    // const endList = newSections[destination.droppableId];

  //   if (startList === endList) {
  //     const column = startList;
  //     console.log("column", column);
  //     if (destination.index === 0)
  //       newOrder = midString("", initialData.tasks[column.taskIds[0]].order);
  //     else if (destination.index === column.taskIds.length - 1)
  //       newOrder = midString(
  //         initialData.tasks[column.taskIds[destination.index]].order,
  //         ""
  //       );
  //     else if (destination.index < source.index)
  //       newOrder = midString(
  //         initialData.tasks[column.taskIds[destination.index - 1]].order,
  //         initialData.tasks[column.taskIds[destination.index]].order
  //       );
  //     else
  //       newOrder = midString(
  //         initialData.tasks[column.taskIds[destination.index]].order,
  //         initialData.tasks[column.taskIds[destination.index + 1]].order
  //       );

  //     dispatch(updateCardById(draggableId, { order: newOrder }));
  //     const newTaskIds = Array.from(column.taskIds);
  //     newTaskIds.splice(source.index, 1);
  //     newTaskIds.splice(destination.index, 0, draggableId);
  //     const destinationTask = initialData.tasks[draggableId];
  //     destinationTask.order = newOrder;
  //     const newColumn = {
  //       ...column,
  //       taskIds: newTaskIds
  //     };
  //     const newData = {
  //       ...initialData,
  //       columns: {
  //         ...newSections,
  //         [newColumn._id]: newColumn
  //       },
  //       tasks: {
  //         ...initialData.tasks,
  //         draggableId: destinationTask
  //       }
  //     };
  //     setInitialData(newData);
  //     return;
  //   }

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
