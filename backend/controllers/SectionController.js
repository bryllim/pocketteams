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
        console.log('getSectionByProjectId');
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
            console.log(sections);
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
        const {sourceSectionId, destinationSectionId,sourceDragindex,destinationDragindex,type} = req.body;
        const taskId = req.params.id
        
        console.log("sourceSectionId",sourceSectionId);
        console.log("destinationSectionId",destinationSectionId);

        //Check if this Section belongs to the user
        // if(sectionSource.user.toString() !== req.user._id.toString()){
        //     res.status(401);
        //     throw new Error("You can't perform this action");
        // }

        const task = await Task.findByIdAndUpdate(taskId, {section_id: destinationSectionId}, {new: true});
        // if (err) return handleError(err);
        // if(task.section_id.toString() !== sourceSectionId.toString()) return handleError(err);
        // task.section_id = destinationSectionId;
        // task.save(function (err, updatedTask) {
        //     if (err) return handleError(err);
        //     console.log('Task updated!');
        // });
        if(task){
            console.log('verified');

            if(sourceSectionId === destinationSectionId){
                await Section.findByIdAndUpdate(
                    {_id:sourceSectionId},
                    { $pull: { tasks: taskId } },
                );
                await Section.findByIdAndUpdate(
                    {_id:sourceSectionId},
                    { $push:{tasks:{
                        $each:[taskId],
                        $position:destinationDragindex
                    }}},
                );
            }
            else{
                await Section.findByIdAndUpdate(
                    {_id: sourceSectionId},
                    { $pull: { tasks: taskId } },
                );
                await Section.findByIdAndUpdate(
                    {_id: destinationSectionId},
                    { $push: { tasks:{
                        $each: [taskId],
                        $position: destinationDragindex
                    }}}
                );
            }



            // const sourceTasks = [...sectionSource.tasks]
            // const destinationTasks = [...sectionDestination.tasks]
            // task.section_id = destinationSectionId;
            // await task.save();
            // const sectionSource = await Section.findById(sourceSectionId).exec();
            // const sectionDestination = await Section.findById(destinationSectionId).exec();
            // console.log(sectionSource.section_name,  sectionSource.tasks)
            // console.log(sectionDestination.section_name, sectionDestination.tasks)
            console.log('task updated')
            res.status(200);
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