//add the task on frontend
const taskCreate = ({
  initialData,
  setInitialData,
  sectionId,
  newTask}) => { //change to section index
    console.log("newTask")
  const sections = JSON.parse(JSON.stringify(initialData.sections))
  const tasks = JSON.parse(JSON.stringify(initialData.tasks))
  tasks[newTask._id] = newTask
  sections[sectionId].taskIds.push(newTask._id)
  setInitialData({
    ...initialData, 
    sections:sections,
    tasks:tasks
  })
  console.log("newTaskend")
}

//rename task on frontend
const taskRename = ({
  initialData,
  setInitialData,
  taskName,
  taskId}) => {
  const tasks = JSON.parse(JSON.stringify(initialData.tasks))
  tasks[taskId].task_name = taskName
  setInitialData({
    ...initialData,
    tasks:tasks
  })
  return {task_name:taskName}
}

//remove the task on frontend
const taskRemove = ({  
  initialData,
  setInitialData,
  taskId,
  sectionId,
  index}) => {
  const tasks = JSON.parse(JSON.stringify(initialData.tasks))
  const sections = JSON.parse(JSON.stringify(initialData.sections))
  delete tasks[taskId]
  sections[sectionId].taskIds.splice(index, 1)
  setInitialData({
    ...initialData,
    tasks:tasks,
    sections:sections
  })
};


const taskDescriptionUpdate = ({sections, setSections, taskDescription, index, sectionId}) => {
  const newSections = [...sections];
  newSections.forEach((section) => {
    return section._id === sectionId
      ? (section.tasks[index].task_description = taskDescription)
      : null;
  });

  setSections(newSections);
};

const taskPriorityUpdate = ({
  sections,
  setSections,
  taskNewPriority,
  index,
  sectionId,
}) => {
  const newSections = [...sections];
  newSections.forEach((section) => {
    return section._id === sectionId
      ? (section.tasks[index].task_priority = taskNewPriority)
      : null;
  });
  setSections(newSections);
};

const taskUpdate =({
  initialData, 
  setInitialData,
  newTask
}) => {
  const newInitialData = JSON.parse(JSON.stringify(initialData))
  const getTaskIds = (id) => {
    const filteredTasks = newInitialData.tasks.filter(task => task.section_id === id );
    filteredTasks.sort((a, b) =>{
      let orderA = a.order
      let orderB = b.order
      return orderA.localeCompare(orderB)//using String.prototype.localCompare()
    });
    const taskIds = [];
    filteredTasks.forEach((task) => taskIds.push(task._id));
    return taskIds;
  };
  
  const setContent = () => {
    newInitialData.tasks[newTask._id] = newTask
    const newSectionList = JSON.parse(JSON.stringify(initialData.sections));
    const sortedSectionList = newSectionList.sort((a, b) =>{
      let orderA = a.order
      let orderB = b.order
      return orderA.localeCompare(orderB)//using String.prototype.localCompare()
    });
  
    sortedSectionList.forEach((section) => {
      newInitialData.sections[section._id] = {
        ...section,
        taskIds: getTaskIds(section._id),
      }
      newInitialData.sectionOrder.push(section._id);
    });
  }
  setContent()
  setInitialData({ ...newInitialData });
  // setInitDone(true);
  
}



module.exports = {
  taskRename,
  taskRemove,
  taskCreate,
  taskDescriptionUpdate,
  taskPriorityUpdate,
  taskUpdate,
};
