

const sectionDelete = ({sectionOrder,setSectionOrder,sectionOrderIndex}) =>{
  const newOrder = [...sectionOrder]
  newOrder.splice(sectionOrderIndex,1)
  setSectionOrder([
    ...newOrder
  ])
  return
}


const renameSection = ({sectionTitle,sections,setSections,index}) =>{ //change to sectionRename or sectionUpdate
  const newSections = [...sections]
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
}

const sectionUpdate = ({sectionOrder,setSectionOrder,sections,setSections,createdSection}) =>{
  const newSection = createdSection.data
  const sectionId = newSection._id
  const newSections = [...sections]
  const newSectionOrder = [...sectionOrder]
  newSections.at(-1)._id = sectionId
  newSectionOrder.pop()
  newSectionOrder.push(sectionId)
  setSections(newSections)
  setSectionOrder(newSectionOrder)
}

module.exports = {sectionDelete,renameSection,sectionCreate,sectionUpdate}