//create section on frontend
const sectionCreate = ({sectionOrder,setSectionOrder,sections,setSections,sectionId,projectId,sectionName}) =>{
  const newSections  = JSON.parse(JSON.stringify(sections))
  const newOrder  = JSON.parse(JSON.stringify(sectionOrder))
  newSections.push({section_name:sectionName,_id:sectionId, project_id: projectId, tasks: []})
  newOrder.push(sectionId)
  setSections([
    ...newSections
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

module.exports = {sectionDelete,sectionRename,sectionCreate}