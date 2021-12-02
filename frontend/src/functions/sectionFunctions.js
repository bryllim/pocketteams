//create section on frontend
const sectionCreate = ({sectionOrder,setSectionOrder,sections,setSections,newSection}) =>{
  const cloneSection  = JSON.parse(JSON.stringify(sections))
  const newOrder  = JSON.parse(JSON.stringify(sectionOrder))
  cloneSection.push(newSection)
  newOrder.push(newSection._id)
  setSections([
    ...cloneSection
  ])
  setSectionOrder([
    ...newOrder
  ])
}


//delete only the sectionid on sectionOrder
const sectionDelete = ({sectionOrder,setSectionOrder,sectionOrderIndex}) =>{
  const newOrder  = JSON.parse(JSON.stringify(sectionOrder))
  newOrder.splice(sectionOrderIndex,1)
  setSectionOrder([
    ...newOrder
  ])
  return
}

//rename section on frontend
const sectionRename = ({sectionTitle,sections,setSections,index}) =>{ //change to sectionRename or sectionUpdate
  const newSections  = JSON.parse(JSON.stringify(sections))
  newSections[index].section_name = sectionTitle
  setSections([
    ...newSections
  ])
}

const sectionTaskUpdate = ({sections,setSections,task,dragProps}) =>{
  const newSections  = JSON.parse(JSON.stringify(sections))
  const sectionId = task.section_id
  const sourceSectionId = dragProps.sourceSectionId
  const sourceDragindex = dragProps.sourceDragindex
  const destinationDragindex = dragProps.destinationDragindex
  newSections.forEach(section => {
    return section._id === sourceSectionId ? section.tasks.splice(sourceDragindex,1) : null
  })
  newSections.forEach(section => {
    return section._id === sectionId ? section.tasks[destinationDragindex] = task : null
  })
  setSections(newSections)
}

const sectionUpdate = ({sections,setSections, sectionOrder, setSectionOrder,sectionData}) =>{
  console.log("sectionData",sectionData.order)
  const newSections  = JSON.parse(JSON.stringify(sections))
  const newSectionOrder  = JSON.parse(JSON.stringify(sectionOrder))
  newSections.find((section,index) => section._id === sectionData._id ? section.order=sectionData.order:null)
  newSections.sort((a, b) =>{
    let orderA = a.order
    let orderB = b.order
    return orderA.localeCompare(orderB)//using String.prototype.localCompare()
  });

  const sectionIds = newSections.map((section) => section._id);
  setSections(newSections)
  setSectionOrder(sectionIds);
  console.log("newSections", newSections)
  console.log("newSectionOrder", newSectionOrder)
  return
}

module.exports = {sectionDelete,sectionRename,sectionCreate,sectionTaskUpdate,sectionUpdate}