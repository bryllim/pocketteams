const asyncHandler = require("express-async-handler");
const Section = require("../models/SectionModel");
const Task = require("../models/TaskModel");
const Project = require("../models/ProjectModel");

const createSection = asyncHandler( async (req,res) => {
    const {newSection} = req.body;
    //need to validate first if user belongs to section order id
    try {
        if(!newSection){ 
            res.status(400)
            throw new Error("Please Fill all the Fields");
        } else {
            newSection.user = req.user.id;
            const section = new Section(newSection);
            const createdSection = await section.save();
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
        const sections = await Section.find({project_id: req.params.id})
        if(sections){
            res.status(200).json(sections);
        }
        else {
            res.status(500)
           throw new Error("No Sections Found");
        }
    } catch(e) {
        console.log(e);
        res.status(500)
        throw new Error(e);
    }
});

const updateSection = asyncHandler(async (req,res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body);
    const allowedUpdates = ['section_name', 'order']
    const isValidOperation = updates.every(
        (update) => allowedUpdates.includes(update))
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates!' })
    try{
        const section = await Section.findByIdAndUpdate(_id, req.body, {
            new: true});
        if(!section)
            return res.status(404).json({message: "Section not found"});
        res.status(200).json(section);
    }
    catch(e) {
        console.log(e);
        res.status(500)
    }
});

const deleteSection = asyncHandler(async (req,res) => {
    try{
        const sectionId = req.params.id
        Promise.all([
        await Section.deleteOne({_id:sectionId}),
        await Task.deleteMany({section_id: req.params.id})
        ]).then(() => {
            console.log("Deleted ", req.params.id);
            res.status(200).json(sectionId);
        })
    }
    catch(e) {
        console.log(e);
        res.status(500)
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