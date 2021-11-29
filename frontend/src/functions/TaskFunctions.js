//rename task on frontend
const taskRename = ({sectionId, sections, setSections, taskName,index}) => {
    const newSections  = JSON.parse(JSON.stringify(sections))
    newSections.forEach(section => {
      return section._id === sectionId ? section.tasks[index].task_name = taskName : null
    })
    setSections(newSections)
}

//remove the task on frontend
const taskRemove = ({ sectionId, sections, setSections, index }) => {
  const newSections = [...sections];
  newSections.forEach((section) => {
    return section._id === sectionId ? section.tasks.splice(index, 1) : null;
  });
  setSections(newSections);
};
//add the task on frontend
const taskCreate = ({sectionId, sections, setSections,taskId}) => { //change to section index
  const newSections = JSON.parse(JSON.stringify(sections));
  newSections.forEach(section => {
    return section._id === sectionId ? section.tasks.push({task_name:'',_id: taskId, task_description:'tempdescription'}) : null
  })
  setSections(newSections)
}

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

module.exports = {
  taskRename,
  taskRemove,
  taskCreate,
  taskDescriptionUpdate,
  taskPriorityUpdate,
};
