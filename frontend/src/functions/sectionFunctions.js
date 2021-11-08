

const sectionDelete = ({sectionOrder,setSectionOrder,sectionOrderIndex}) =>{
  const newOrder = [...sectionOrder]
  newOrder.splice(sectionOrderIndex,1)
  setSectionOrder([
    ...newOrder
  ])
  console.log(newOrder)
  return
}


const renameSection = ({sectionTitle,sections,setSections,index}) =>{ //change to sectionRename or sectionUpdate
  const newSections = [...sections]
  console.log(sections)
  newSections[index].section_name = sectionTitle
  setSections([
    ...newSections
  ])
}

const sectionCreate = ({sectionOrder,setSectionOrder,sections,setSections}) =>{
  const newSections = [...sections]
  const newOrder = [...sectionOrder]
  newSections.push({section_name:'New Section',_id:'123',section_order_id: '6179228d94d94e1c2c6c21e3',tasks: []})
  newOrder.push('123')
  setSections([
    ...newSections
  ])
  setSectionOrder([
    ...newOrder
  ])
  console.log('newSections')
}




module.exports = {sectionDelete,renameSection,sectionCreate}