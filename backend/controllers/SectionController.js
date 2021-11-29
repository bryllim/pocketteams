const asyncHandler = require("express-async-handler");
const Section = require("../models/SectionModel");
const Task = require("../models/TaskModel");
const Project = require("../models/ProjectModel");

const createSection = asyncHandler( async (req,res) => {
    const {section_name, project_id,section_id} = req.body;
    //need to validate first if user belongs to section order id
    try {
        if(!section_name || !project_id){ 
            res.status(400)
            throw new Error("Please Fill all the Fields");
        } else {
            console.log("section_id",section_id);
            const section = new Section({user: req.user._id,_id:section_id, section_name, project_id });
            const createdSection = await section.save();
            console.log("createdSection", createdSection);
            await Project.findByIdAndUpdate(
                project_id,
                { $push: { sections: createdSection} },
                { new: true, useFindAndModify: false },
            );
            res.status(201).json(createdSection);
        }
    }
    catch(e) {
        console.log(e);
    // [Error: Uh oh!]
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

const getSectionByProjectId = asyncHandler( async (req,res) => {
    try {
        const project_id = req.params.id;
        if (!project_id) return
      
        const project   = await Project.findById(project_id).populate({
            path: 'sections',
            populate: {
                path: 'tasks',
            }
        });
        if(project){
            const sections = project.sections
            res.json(sections);
        } else {
            res.status(404);
            throw new Error("Section not found");
        }
    }
    catch(e) {
        console.log(e);
    }
});

const updateSection = asyncHandler(async (req,res) => {

    try{
        const {section_name} = req.body;
        const section = await Section.findById(req.params.id);
        console.log(section_name)
        //Check if this Section belongs to the user
        if(section.user.toString() !== req.user._id.toString()){
            res.status(401);
            throw new Error("You can't perform this action");
        }

        if(section){
            section.section_name = section_name;
            const updatedSection = await section.save();
            res.json(updatedSection);
        } 
    }
    catch(e) {
        console.log(e);
    // [Error: Uh oh!]
    }



});

const deleteSection = asyncHandler(async (req,res) => {
    try{
        const section = await Section.findById(req.params.id);
        const project = await Project.findById(section.project_id);
        const tasks = await Task.find({section_id: section._id});
        if(!section){
            res.status(404);
            throw new Error("Please Fill all the Fields");
        }
        if(section.user.toString() !== req.user._id.toString()){
            res.status(401);
            throw new Error("You can't perform this action");   
        }
        else{
            await section.remove()
            await project.sections.pull(section._id)
            await project.save()
            //remove all tasks associated with this section
            for(let i = 0; i < tasks.length; i++){
                await tasks[i].remove()
            } 
            console.log('section deleted')
            res.json({message: "Section Removed"});
        }
    }
    catch(e) {
        console.log(e);
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
    console.log('updateSectionTask');
    try{
        const {sourceSectionId, destinationSectionId,sourceDragindex,destinationDragindex,task} = req.body;
        const taskId = req.params.id
        const currentTask = await Task.findById(taskId);
        if(currentTask.__v !== task.__v || currentTask.section_id.toString() !== task.section_id.toString()){
            res.status(400);
            throw new Error("Task has been modified");
        }
       
        if(currentTask){
            console.log('verified');
            if(sourceSectionId === destinationSectionId){
                await Promise.all([
                    Section.findByIdAndUpdate(
                        {_id:sourceSectionId},
                        { $pull: { tasks: taskId } },
                        { new: true}
                    ).lean(),
                    Section.findByIdAndUpdate(
                        {_id:sourceSectionId},
                        { $push:{tasks:{
                            $each:[taskId],
                            $position:destinationDragindex
                        }}},
                    ).lean()
                ]);
            }
            else{
                await Promise.all([
                    Section.findByIdAndUpdate(
                        {_id: destinationSectionId},
                        { $push: { tasks:{
                            $each: [taskId],
                            $position: destinationDragindex
                        }}},
                    ).lean(),
                    Section.findByIdAndUpdate(
                        {_id: sourceSectionId},
                        { $pull: { tasks: taskId } },
                    ).lean()
                ])
            }
            currentTask.section_id = destinationSectionId;
            let newTask  = await currentTask.save();
            const dragProps = {
                sourceSectionId,
                destinationSectionId,
                sourceDragindex,
                destinationDragindex
            }
            res.status(200);
            res.json({newTask,dragProps});
        } else{
            res.status(404);
            throw new Error("Section not found");
        }
    }
    catch(e) {
        console.log(e);
        res.status(500);
        throw new Error("Uknown error");
    }
    
});

module.exports = {createSection, getSections,getSectionById, updateSection, deleteSection,updateSectionOrder,updateSectionTask,getSectionByProjectId};