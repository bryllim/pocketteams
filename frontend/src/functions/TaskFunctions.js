//rename task on frontend
const taskRename = ({ sectionId, sections, setSections, name, index }) => {
  const newSections = [...sections];
  newSections.forEach((section) => {
    return section._id === sectionId
      ? (section.tasks[index].task_name = name)
      : null;
  });
  setSections(newSections);
};

//remove the task on frontend
const taskRemove = ({ sectionId, sections, setSections, index }) => {
  const newSections = [...sections];
  newSections.forEach((section) => {
    return section._id === sectionId ? section.tasks.splice(index, 1) : null;
  });
  setSections(newSections);
};
//add the task on frontend
const taskCreate = ({ sectionId, sections, setSections }) => {
  //change to section index
  const newSections = [...sections];
  newSections.forEach((section) => {
    return section._id === sectionId
      ? section.tasks.push({
          task_name: "",
          _id: "123",
          task_description: "tempdescription",
        })
      : null;
  });
  setSections(newSections);
};

//update the task on frontend using data from backend
const taskUpdate = ({ sections, setSections, createdTask }) => {
  const newTask = createdTask.data;
  const sectionId = newTask.section_id;
  const section = sections.find((section) => section._id === sectionId);
  const newTaskList = [...section.tasks];
  newTaskList.at(-1)._id = newTask._id;
  newTaskList.at(-1).task_name = newTask.task_name;
  setSections([
    ...sections.map((section) =>
      section._id === sectionId ? { ...section, tasks: newTaskList } : section
    ),
  ]);
};

const taskDescriptionUpdate = ({
  sections,
  setSections,
  taskDescription,
  index,
  sectionId,
}) => {
  const newSections = [...sections];
  newSections.forEach((section) => {
    return section._id === sectionId
      ? (section.tasks[index].task_description = taskDescription)
      : null;
  });

  setSections(newSections);
};

module.exports = {
  taskRename,
  taskRemove,
  taskCreate,
  taskUpdate,
  taskDescriptionUpdate,
};
