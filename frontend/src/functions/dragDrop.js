import midString from './ordering'

const onDragEnd = ({result,data}) => {
  // eslint-disable-next-line no-var
  var newOrder;
  const { destination, source, draggableId, type } = result;
  const {initialData,setInitialData} = data
  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  if (type === "column") {
    const listOrder = initialData.sectionOrder;
    if (destination.index === 0) {
      newOrder = midString("", initialData.sections[listOrder[0]].order);
    } else if (destination.index === listOrder.length - 1) {
      newOrder = midString(
        initialData.sections[listOrder[destination.index]].order,
        ""
      );
    } else if (destination.index < source.index) {
      newOrder = midString(
        initialData.sections[listOrder[destination.index - 1]].order,
        initialData.sections[listOrder[destination.index]].order
      );
    } else {
      newOrder = midString(
        initialData.sections[listOrder[destination.index]].order,
        initialData.sections[listOrder[destination.index + 1]].order
      );
    }
    const newListOrder = Array.from(initialData.sectionOrder);
    const destinationColumn = initialData.sections[draggableId];
    destinationColumn.order = newOrder;
    newListOrder.splice(source.index, 1);
    newListOrder.splice(destination.index, 0, draggableId);
    console.log("New Order ", newOrder);
    const newData = {
      ...initialData,
      sectionOrder: newListOrder,
      sections: {
        ...initialData.sections,
        [draggableId]: destinationColumn
      }
    };
    setInitialData(newData);
    return {order:newOrder};
  }
  const startList = initialData.sections[source.droppableId];
  const endList = initialData.sections[destination.droppableId];
  if (startList === endList) {
    const section = startList;

    if (destination.index === 0)
      newOrder = midString("", initialData.tasks[section.taskIds[0]].order);
    else if (destination.index === section.taskIds.length - 1)
      newOrder = midString(
        initialData.tasks[section.taskIds[destination.index]].order,
        ""
      );
    else if (destination.index < source.index)
      newOrder = midString(
        initialData.tasks[section.taskIds[destination.index - 1]].order,
        initialData.tasks[section.taskIds[destination.index]].order
      );
    else
      newOrder = midString(
        initialData.tasks[section.taskIds[destination.index]].order,
        initialData.tasks[section.taskIds[destination.index + 1]].order
      );

    
    const newTaskIds = Array.from(section.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const destinationTask = initialData.tasks[draggableId];
    destinationTask.order = newOrder;
    const newColumn = {
      ...section,
      taskIds: newTaskIds
    };
    const newData = {
      ...initialData,
      sections: {
        ...initialData.sections,
        [newColumn._id]: newColumn
      },
      tasks: {
        ...initialData.tasks,
        [draggableId]: destinationTask
      }
    };
    setInitialData(newData);
    return {order:newOrder};
  }

  // Move from one list to another
  if (endList.taskIds.length === 0) newOrder = "n";
  else if (destination.index === 0) {
    newOrder = midString("", initialData.tasks[endList.taskIds[0]].order);
  } else if (destination.index === endList.taskIds.length)
    newOrder = midString(
      initialData.tasks[endList.taskIds[destination.index - 1]].order,
      ""
    );
  else
    newOrder = midString(
      initialData.tasks[endList.taskIds[destination.index - 1]].order,
      initialData.tasks[endList.taskIds[destination.index]].order
    );


  const startTaskIds = Array.from(startList.taskIds);
  startTaskIds.splice(source.index, 1);
  const newStartList = {
    ...startList,
    taskIds: startTaskIds
  };
  const destinationTask = initialData.tasks[draggableId];
  destinationTask.order = newOrder;
  destinationTask.section_id = destination.droppableId;
  const endTaskIds = Array.from(endList.taskIds);
  endTaskIds.splice(destination.index, 0, draggableId);
  const newEndList = {
    ...endList,
    taskIds: endTaskIds
  };
  const newData = {
    ...initialData,
    sections: {
      ...initialData.sections,
      [newStartList._id]: newStartList,
      [newEndList._id]: newEndList
    },
    tasks: {
      ...initialData.tasks,
      [draggableId]: destinationTask
    }
  };
  setInitialData(newData);
  return {
    order:newOrder, 
    section_id:newEndList._id};
};

export default onDragEnd;