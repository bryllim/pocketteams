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


// const taskDescriptionUpdate = ({sections, setSections, taskDescription, index, sectionId}) => {
//   const newSections = [...sections];
//   newSections.forEach((section) => {
//     return section._id === sectionId
//       ? (section.tasks[index].task_description = taskDescription)
//       : null;
//   });

//   setSections(newSections);
// };


const taskDescriptionUpdate = ({
  initialData,
  setInitialData,
  taskDescription,
  taskId}) => {
  const tasks = JSON.parse(JSON.stringify(initialData.tasks))
  tasks[taskId].task_description = taskDescription
  setInitialData({
    ...initialData,
    tasks:tasks
  })
  // return {task_name:taskName}
};




// const taskPriorityUpdate = ({
//   sections,
//   setSections,
//   taskNewPriority,
//   index,
//   sectionId,
// }) => {
//   console.log("sections",sections)
//   const newSections = [...sections];
//   newSections.forEach((section) => {
//     return section._id === sectionId
//       ? (section.tasks[index].task_priority = taskNewPriority)
//       : null;
//   });
//   setSections(newSections);
// };

const taskPriorityUpdate = ({
  taskNewPriority,
  initialData,
  setInitialData,
  taskId
}) => {
  const tasks = JSON.parse(JSON.stringify(initialData.tasks))
  tasks[taskId].task_priority = taskNewPriority
  setInitialData({
    ...initialData,
    tasks:tasks
  })
};

const taskUpdate =({
  initialData, 
  setInitialData,
  newTask,
}) => {
  console.log("taskUpdate",newTask)
  console.log("initialData",initialData)
  const newInitialData = JSON.parse(JSON.stringify(initialData))
  const getTaskIds = (id) => {
    const tasks = JSON.parse(JSON.stringify(newInitialData.tasks));
    const newTasks = Object.values(tasks).map((task) => task)
    const filteredTasks = newTasks.filter((task) => task.section_id === id)
    console.log("filteredTasks",filteredTasks)
    filteredTasks.sort((a, b) =>{
      let orderA = a.order
      let orderB = b.order
      return orderA.localeCompare(orderB)//using String.prototype.localCompare()
    });
    const taskIds = [];
    filteredTasks.forEach((task) => taskIds.push(task._id));
    console.log("taskIds",taskIds)
    return taskIds;
  };
  
  const setContent = () => {
    newInitialData.tasks[newTask._id] = newTask;
    // newInitialData.tasks[newTask._id] = newTask
    // const newSectionList = JSON.parse(JSON.stringify(initialData.sections));
    // console.log("newSectionList",newSectionList)
    // const sortedSectionList = newSectionList.sort((a, b) =>{
    //   let orderA = a.order
    //   let orderB = b.order
    //   return orderA.localeCompare(orderB)//using String.prototype.localCompare()
    // });
    const newSections = JSON.parse(JSON.stringify(newInitialData.sections));
    console.log("newSections",newSections)
    // eslint-disable-next-line array-callback-return
    Object.values(newSections).map((section) => { 
      newInitialData.sections[section._id] = {
        ...section,
        taskIds: getTaskIds(section._id),
      }
  })
}
setContent()
console.log("newInitialData",newInitialData)
setInitialData({ ...newInitialData });
}




module.exports = {
  taskRename,
  taskRemove,
  taskCreate,
  taskDescriptionUpdate,
  taskPriorityUpdate,
  taskUpdate,
};
