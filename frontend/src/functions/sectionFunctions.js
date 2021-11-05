

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

const sectionCreate = ({sectionOrder,setSectionOrder,sections,setSections,createdSection}) =>{
  const newSections = [...sections]
  const newOrder = [...sectionOrder]
  newSections.push(createdSection)
  newOrder.push(createdSection._id)
  setSections([
    ...newSections
  ])
  setSectionOrder([
    ...newOrder
  ])
}




module.exports = {sectionDelete,renameSection,sectionCreate}