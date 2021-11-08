


// const addColumn =(order,setOrder,columns,setColumns) => {
//     const colName = 'test' + Math.floor((Math.random() * 10) + 1);
//     setColumns({
//         ...columns,
//         [colName]:{
//         name:colName,
//         items: []
//         }
//     })
//     setOrder([
//         ...order,
//         colName
//     ])
// }


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

module.exports = {taskRename,taskRemove,taskCreate}