


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


const taskRename = ({sectionId, sections, setSections, taskName,index}) => {
    const newSections = [...sections];
    newSections.forEach(section => {
      return section._id === sectionId ? section.tasks[index].task_name = taskName : null
    })
    setSections(newSections)
}

module.exports = {taskRename}