

const sectionDelete = ({sectionOrder,setSectionOrder,sections,setSections,sectionId,sectionOrderIndex}) =>{
  // console.log('sectionDelete')
  // console.log(sections)
  // console.log(sectionOrder)
  // console.log(sectionId)
  // const newSections = [...sections]
  const newOrder = [...sectionOrder]
  // const sectionIndex = sections.indexOf(sectionId)
  // console.log(sectionIndex)
  // newSections.splice(sectionIndex,1)
  newOrder.splice(sectionOrderIndex,1)
  // setSections([
  //   ...newSections
  // ])
  setSectionOrder([
    ...newOrder
  ])

  // console.log(newSections)
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