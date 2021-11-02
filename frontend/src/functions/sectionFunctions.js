

const deleteSection = (columnId,index) =>{
  // const columnObject = columns;
  // delete  columnObject[columnId];
  // const columnList = order
  // columnList.splice(index,1)

  // setColumns({
  //   ...columnObject
  // })

  // setOrder([
  //  ...columnList
  // ])

  // return
  // //will the task also deleted when col deleted?
}

const renameSection = ({sectionTitle,sections,setSections,index}) =>{
  const newSections = [...sections]
  console.log(sections)
  newSections[index].section_name = sectionTitle
  setSections([
    ...newSections
  ])
}


module.exports = {deleteSection,renameSection}