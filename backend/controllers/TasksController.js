const asyncHandler = require("express-async-handler");
const Task = require("../models/TaskModel");
const Section = require("../models/SectionModel");


const createTask = asyncHandler( async (req,res) => {
    const {task_name, task_description, section_id} = req.body;
    if(!task_name || !task_description || !section_id){
        res.status(400)
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
                throw "Section doesn't exists"
            }
            res.status(201).json(createdtask._id);

        }catch (err) {
            res.status(500).json(err);
        }

        
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
module.exports = {createTask, getTasks,getTasksBySection};