


const addColumn =(order,setOrder,columns,setColumns) => {
    const colName = 'test' + Math.floor((Math.random() * 10) + 1);
    setColumns({
        ...columns,
        [colName]:{
        name:colName,
        items: []
        }
    })
    setOrder([
        ...order,
        colName
    ])
}


const editTitle = ({index, name, id,columnId, tasks,columns, setTask, setColumns}) =>{ 
    const sourceTask = tasks.find(x => x.id === id)
    if(name === ''){
      const sourceColumn = columns[columnId];
      const sourceItems = [...sourceColumn.items];
      sourceItems.splice(index, 1);
      setColumns({
        ...columns,
        [columnId]: {
          ...sourceColumn,
          items: sourceItems
        },
      });
      return
    }
    sourceTask.content = name
    setTask([
      ...tasks
    ])
    return
  }

module.exports = {addColumn,editTitle}