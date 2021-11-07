const asyncHandler = require("express-async-handler");
const Task = require("../models/TaskModel");
const Section = require("../models/SectionModel");


const createTask = asyncHandler( async (req,res) => {
    const {task_name, task_description, section_id} = req.body;
    console.log(task_name)
    console.log(task_description)
    console.log(section_id)
    try{
        if(!task_name || !task_description || !section_id){
            throw new Error("Please Fill all the Fields");
        } else {
            try{
                const task = new Task({user: req.user._id, task_name, task_description, section_id});
                const createdtask = await task.save()
                sectionResponse = await Section.findByIdAndUpdate(
                    section_id,
                    { $push: { tasks: createdtask} },
                    { new: true, useFindAndModify: false },
                );
                if(sectionResponse === null){
                    throw new Error("sectionResponse");
                }
                res.status(201).json(createdtask._id);
                console.log('done')

            }catch (err) {
                console.log('er2')
                res.status(500).json(err);
            }
        }
    }
    catch (err) {
        res.status(400).json(err);
        console.log('er3')

    }
});

const getTasks = asyncHandler( async (req,res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

const getTasksBySection = asyncHandler( async (req,res) => {

    const sectionId = req.params.sectionid;
    const tasks = await Task.find({section:sectionId});
    console.log(tasks)
    res.json(tasks);
});


const deleteTaskById = asyncHandler( async (req,res) => {
    console.log('deleteTaskById')
    try{
        const taskId = req.params.id
        if(!taskId){
            throw new Error("Please Fill all the Fields");
        }
        const task = await Task.findById(taskId)
        const section = await Section.findById(task.section_id)
        if(task && section){
            await task.remove().then(
                taskIndex = section.tasks.indexOf(taskId),
                section.tasks.splice(taskIndex,1),
                await section.save()
            );
            res.json({message: "task Removed"});
        }   
        else{
            res.status(404).json({message: "Request not found"});
            throw new Error("Request not found");
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});

const updateTaskById = asyncHandler( async (req,res) => {
    try{
        console.log('updateTaskById')
        const {task_name,task_description} = req.body;
        const taskId = req.params.id
        if(!taskId){
            throw new Error("Please Fill all the Fields");
        }
        const task = await Task.findById(taskId)
        if(!task_description){
            task.task_name = task_name;
            await task.save();
            res.json({message: "task renamed"});
        }
        else if(!task_name){
            task.task_description = task_description;
            await task.save();
            res.json({message: "task description updated"});
        }
        else{
            res.status(404).json({message: "Request not found"});
            throw new Error("Request not found");
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
});


module.exports = {createTask, getTasks,getTasksBySection,deleteTaskById,updateTaskById};