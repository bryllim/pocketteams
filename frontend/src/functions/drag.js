
const onDragEnd = ({result,data}) => {
    const initialData = data.initialData;
    // eslint-disable-next-line no-var
    var newOrder;
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "list") {
      const listOrder = initialData.columnOrder;
      if (destination.index === 0) {
        newOrder = midString("", initialData.columns[listOrder[0]].order);
      } else if (destination.index === listOrder.length - 1) {
        newOrder = midString(
          initialData.columns[listOrder[destination.index]].order,
          ""
        );
      } else if (destination.index < source.index) {
        newOrder = midString(
          initialData.columns[listOrder[destination.index - 1]].order,
          initialData.columns[listOrder[destination.index]].order
        );
      } else {
        newOrder = midString(
          initialData.columns[listOrder[destination.index]].order,
          initialData.columns[listOrder[destination.index + 1]].order
        );
      }
      dispatch(updateListById(draggableId, { order: newOrder }));
      const newListOrder = Array.from(initialData.columnOrder);
      const destinationColumn = initialData.columns[draggableId];
      destinationColumn.order = newOrder;
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);
      const newData = {
        ...initialData,
        columnOrder: newListOrder,
        columns: {
          ...initialData.columns,
          draggableId: destinationColumn
        }
      };
      setInitialData(newData);
      return;
    }
    const startList = initialData.columns[source.droppableId];
    const endList = initialData.columns[destination.droppableId];

    if (startList === endList) {
      const column = startList;
      console.log("column", column);
      if (destination.index === 0)
        newOrder = midString("", initialData.tasks[column.taskIds[0]].order);
      else if (destination.index === column.taskIds.length - 1)
        newOrder = midString(
          initialData.tasks[column.taskIds[destination.index]].order,
          ""
        );
      else if (destination.index < source.index)
        newOrder = midString(
          initialData.tasks[column.taskIds[destination.index - 1]].order,
          initialData.tasks[column.taskIds[destination.index]].order
        );
      else
        newOrder = midString(
          initialData.tasks[column.taskIds[destination.index]].order,
          initialData.tasks[column.taskIds[destination.index + 1]].order
        );

      dispatch(updateCardById(draggableId, { order: newOrder }));
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const destinationTask = initialData.tasks[draggableId];
      destinationTask.order = newOrder;
      const newColumn = {
        ...column,
        taskIds: newTaskIds
      };
      const newData = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn._id]: newColumn
        },
        tasks: {
          ...initialData.tasks,
          draggableId: destinationTask
        }
      };
      setInitialData(newData);
      return;
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
    dispatch(
      updateCardById(draggableId, { order: newOrder, listId: endList._id })
    );
    const text = `${user.username} moved ${initialData.tasks[draggableId].name} from ${startList.name} to ${endList.name}`;
    const recentActivity = activities[activities.length - 1];
    if (
      recentActivity.text ===
        `${user.username} moved ${initialData.tasks[draggableId].name} from ${endList.name} to ${startList.name}` &&
      moment(recentActivity.createdAt).fromNow().includes("second")
    ) {
      dispatch(deleteActivityById(recentActivity._id));
    } else dispatch(createNewActivity({ text, boardId: currBoard._id }, token));

    const startTaskIds = Array.from(startList.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartList = {
      ...startList,
      taskIds: startTaskIds
    };
    const destinationTask = initialData.tasks[draggableId];
    destinationTask.order = newOrder;
    const endTaskIds = Array.from(endList.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEndList = {
      ...endList,
      taskIds: endTaskIds
    };
    const newData = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newStartList._id]: newStartList,
        [newEndList._id]: newEndList
      },
      tasks: {
        ...initialData.tasks,
        draggableId: destinationTask
      }
    };
    setInitialData(newData);
  };
module.exports = {onDragEnd}