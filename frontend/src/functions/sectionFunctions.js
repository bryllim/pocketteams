//create section on frontend
const sectionCreate = ({
  initialData,
  setInitialData,
  newSection}) =>{
  const sections = JSON.parse(JSON.stringify(initialData.sections))
  const sectionOrder = JSON.parse(JSON.stringify(initialData.sectionOrder))
  sections[newSection._id] = newSection
  sections[newSection._id].taskIds = [] //taskIds should be created here, not outside the function
  sectionOrder.push(newSection._id)
  setInitialData({
    ...initialData,
    sectionOrder: sectionOrder,
    sections: sections,
  })
}


//delete only the sectionid on sectionOrder, should delete tasks alsos
const sectionDelete = ({
  initialData,
  setInitialData,
  sectionId,
  index}) =>{
  const sections = JSON.parse(JSON.stringify(initialData.sections))
  const sectionOrder = JSON.parse(JSON.stringify(initialData.sectionOrder))
  sectionOrder.splice(index,1)
  delete sections[sectionId]
  setInitialData({
    ...initialData,
    sectionOrder: sectionOrder,
    sections: sections
  })
  return
}

//rename section on frontend
const sectionRename = ({
  sectionTitle,
  initialData,
  setInitialData,
  sectionId,
}) =>{ //change to sectionRename or sectionUpdate
  const sections = JSON.parse(JSON.stringify(initialData.sections))
  sections[sectionId].section_name = sectionTitle
  setInitialData({
    ...initialData,
    sections: sections
  })
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