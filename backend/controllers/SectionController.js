const asyncHandler = require("express-async-handler");
const Section = require("../models/SectionModel");
const Task = require("../models/TaskModel");
const SectionOrder = require("../models/SectionOrderModel");

const createSection = asyncHandler( async (req,res) => {
    const {section_name, section_description, section_order_id} = req.body;
    //need to validate first if user belongs to section order id
    if(!section_name || !section_description){ 
        res.status(400)
        throw new Error("Please Fill all the Fields");
    } else {
        const section = new Section({user: req.user._id, section_name, section_description, section_order_id});
        const createdSection = await section.save();
        sectionOrderResponse = await SectionOrder.findByIdAndUpdate(
            section_order_id,
            { $push: { items: createdSection} },
            { new: true, useFindAndModify: false },
        );
        res.status(201).json(createdSection);
    }
});

const getSections = asyncHandler( async (req,res) => {
    const sections = await Section.find().populate('tasks');
    res.json(sections);
});

const getSectionById = asyncHandler( async (req,res) => {
    const section = await Section.findById(req.params.id)

    if(section){
        res.json(section);
    } else {
        res.status(404).json({message: "section not found"});
    }
    res.json(section);
});

const updateSection = asyncHandler(async (req,res) => {
    const {section_name} = req.body;
    console.log("Updated Section")

    const section = await Section.findById(req.params.id);

    //Check if this Section belongs to the user
    if(section.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if(section){
        section.section_name = section_name;
        const updatedSection = await section.save();
        res.json(updatedSection);
    } else {
        res.status(404);
        throw new Error("Section not found");
    }
});

const deleteSection = asyncHandler(async (req,res) => {
    const section = await Section.findById(req.params.id);

    if(section.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");   
    }

    if(section){
        await section.remove();
        res.json({message: "Section Removed"});
    }
    
});


const updateSectionOrder = asyncHandler(async (req,res) => {
    const sectionNewIndex = req.params.newindex
    const sectionOldIndex = req.params.oldindex

    const section = await Section.findById(req.params.id);
    const sections = await Section.find()

    //Check if this Section belongs to the user
    if(section.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }


  

    sections.splice(sectionOldIndex, 1);
    sections.splice(sectionNewIndex, 0, section);

    if(section){
        const updatedSection = await sections.save();
        res.json(updatedSection);
    } else {
        res.status(404);
        throw new Error("Section not found");
    }
});

const updateSectionTask = asyncHandler(async (req,res) => {
    console.log("Updat Section Task")

    const {sourceSectionId, destinationSectionId,sourceDragindex,destinationDragindex,type} = req.body;
    const taskId = req.params.id
    // console.log(taskId)
    // console.log(sourceSectionId)
    // console.log(destinationSectionId)
    const task = await Task.findById(taskId);
    const sectionSource = await Section.findById(sourceSectionId);
    const sectionDestination = await Section.findById(destinationSectionId);


    //Check if this Section belongs to the user
    if(sectionSource.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if(type === 'column'){
        const sourceData = await Section.findById(taskId)

        .remove()

    }

    if(task && sectionSource && sectionDestination){
        const sourceTasks = [...sectionSource.tasks]
        const destinationTasks = [...sectionDestination.tasks]
        task.section_id = destinationSectionId;

        

        // const filteredTasks = sourceTasks.filter(obj => 
        //     obj._id === taskId
        // )
        if(sourceSectionId === destinationSectionId){
            destinationTasks.splice(sourceDragindex,1)
            destinationTasks.splice(destinationDragindex,0,taskId)
            sectionDestination.tasks = destinationTasks
            await sectionDestination.save();
        }
        
        else{
            sourceTasks.splice(sourceDragindex,1)
            destinationTasks.splice(destinationDragindex,0,taskId)
            sectionSource.tasks = sourceTasks
            sectionDestination.tasks = destinationTasks
            await sectionSource.save();
            await sectionDestination.save();
        }

        
 


        console.log(sectionDestination.tasks)
        console.log(sectionSource.tasks)
        console.log(sourceSectionId)
        console.log(destinationSectionId)
        // console.log(sourceTasks)
        // console.log(destinationTasks)
     


        await task.save();
  
    
    
      
        res.json(sectionDestination);

    } else {
        res.status(404);
        throw new Error("Section not found");
    }
});

module.exports = {createSection, getSections,getSectionById, updateSection, deleteSection,updateSectionOrder,updateSectionTask};