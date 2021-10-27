const asyncHandler = require("express-async-handler");
const Project = require("../models/ProjectModel");

const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({user: req.user._id});
    res.json(projects);
});

const createProject = asyncHandler( async (req,res) => {
    const {project_name, project_description, project_status} = req.body;

    if(!project_name || !project_status || !project_description){
        res.status(400)
        throw new Error("Please Fill all the Fields");
    } else {
        const project = new Project({user: req.user._id, project_name, project_status, project_description});

        const createdProject = await project.save();

        res.status(201).json(createdProject);
    }
});

const getProjectById = asyncHandler( async (req,res) => {
    const project = await Project.findById(req.params.id);

    if(project){
        res.json(project);
    } else {
        res.status(404).json({message: "Project not found"});
    }
    res.json(project);
});

const updateProject = asyncHandler(async (req,res) => {
    const {project_name, project_status, project_description} = req.body;

    const project = await Project.findById(req.params.id);

    //Check if this project belongs to the user
    if(project.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if(project){
        project.project_name = project_name;
        project.project_description = project_description;
        project.project_status = project_status;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error("Project not found");
    }
});

const deleteProject = asyncHandler(async (req,res) => {
    const project = await Project.findById(req.params.id);

    if(project.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");   
    }

    if(project){
        await project.remove();
        res.json({message: "Project Removed"});
    }
    
});

module.exports = {getProjects, createProject, updateProject, deleteProject, getProjectById};