const taskRename = ({sectionId, sections, setSections, name,index}) => {
    const newSections = [...sections];
    newSections.forEach(section => {
      return section._id === sectionId ? section.tasks[index].task_name = name : null
    })
    console.log('newSections')
    console.log(newSections)
    setSections(newSections)
}

const taskRemove = ({sectionId, sections, setSections, index}) => {
    const newSections = [...sections];
    newSections.forEach(section => {
      return section._id === sectionId ? section.tasks.splice(index, 1) : null
    })
    setSections(newSections)
}

const taskCreate = ({sectionId, sections, setSections}) => { //change to section index
  const newSections = [...sections];
  newSections.forEach(section => {
    return section._id === sectionId ? section.tasks.push({task_name:'',_id:'123'}) : null
  })
  setSections(newSections)
}

const taskUpdate = ({ sections, setSections,createdTask}) => {
  console.log('taskUpdate3')
  const newTask = createdTask.data
  const sectionId = newTask.section_id
  const section = sections.find(section => section._id === sectionId)
  const newTaskList = [...section.tasks]
  newTaskList.at(-1)._id = newTask._id
  newTaskList.at(-1).task_name = newTask.task_name
  setSections([...sections.map(section => section._id === sectionId ? {...section,tasks:newTaskList} : section)])
}

module.exports = {taskRename,taskRemove,taskCreate,taskUpdate}