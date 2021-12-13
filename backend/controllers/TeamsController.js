const asyncHandler = require("express-async-handler");
const Team = require("../models/TeamModel");
const { getSections } = require("./SectionController");

const getTeam = asyncHandler(async (req, res) => {
    const team = await Team.find({owner: req.user._id}).populate('users','-password').populate('projects');
    res.json(team);
});

const createTeam = asyncHandler( async (req,res) => {
    const {team_name, team_description, team_access, owner, users, projects} = req.body;

    if(!team_name || !team_description){
        res.status(400)
        throw new Error("Please Fill all the Fields");
    } else {
        const team = new Team({
            team_name, 
            team_description,
            team_access,
            owner,
            users,
            projects,
        });
        const createdTeam = await team.save();
        res.status(201).json(createdTeam);
    }
});

const getTeamById = asyncHandler( async (req,res) => {
    const team = await Team.findById(req.params.id);

    if(team){
        res.json(team);
    } else {
        res.status(404).json({message: "Team not found"});
    }
    res.json(team);
});

const updateTeam = asyncHandler(async (req,res) => {
    const {team_name, team_description, team_access} = req.body;

    const team = await Team.findById(req.params.id);

    //Check if this team belongs to the user
    if(team.owner.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if(team){
        team.team_name = team_name;
        team.team_description = team_description;
        team.team_access = team_access;

        const updatedTeam = await team.save();
        res.json(updatedTeam);
    } else {
        res.status(404);
        throw new Error("team not found");
    }
});

const updateTeamUser = asyncHandler(async (req,res) => {
    const team = await Team.findById(req.params.id);
    const {users} = req.body;

    //Check if this team belongs to the user
    if(team.owner.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this aciton");
    }

    if(team){
        //Edit the array here
        team.users = users 
        const updatedTeam = await team.save();
        res.json(updatedTeam);
    } else {
        res.status(404);
        throw new Error("Section not found");
    }
})

const updateTeamProject = asyncHandler(async (req,res) => {
    const team = await Team.findById(req.params.id);
    console.log("Owner: " + team.owner.toString());
    const {projects} = req.body;
    console.log("projects: " + projects);

    //Check if this team belongs to the user
    if(team.owner.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this aciton");
    }

    if(team){
        //Edit the array here
        team.projects = projects 
        const updatedTeam = await team.save();
        res.json(updatedTeam);
    } else {
        res.status(404);
        throw new Error("Section not found");
    }
})

const deleteTeam = asyncHandler(async (req,res) => {
    const team = await Team.findById(req.params.id);
    const teamID = team._id;
    if(team.owner.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");   
    }

    if(team){
        await team.remove();
        res.json(teamID);
    }
});

const deleteUser = asyncHandler(async (req,res) => {
    const team = await Team.findById(req.params.id);
    const {user_id} = req.body;

    if(team.owner.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");   
    }

    console.log("USER ID: " + user_id);

    //remove the matching user_id from the users array inside team
    if(team){
        const updatedTeam = await Team.findByIdAndUpdate(
            {_id:team._id},
            { $pull: {users: user_id} },
            { new: true},
        );
        res.json(updatedTeam);
    }
});

const removeProject = asyncHandler(async (req,res) => {
    const team = await Team.findById(req.params.id);
    const {project_id} = req.body;

    if(team.owner.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");   
    }

    console.log("project id: " + project_id);

    //remove the matching user_id from the users array inside team
    if(team){
        const updatedTeam = await Team.findByIdAndUpdate(
            {_id:team._id},
            { $pull: {projects: project_id} },
            { new: true},
        );
        res.json(updatedTeam);
    }
});

module.exports = {getTeam, createTeam, updateTeam, deleteTeam, getTeamById, updateTeamUser, updateTeamProject, deleteUser, removeProject};