const asyncHandler = require("express-async-handler");
const Team = require("../models/TeamModel");
const { getSections } = require("./SectionController");

const getTeam = asyncHandler(async (req, res) => {
    const team = await Team.find({owner: req.user._id}).populate('users','-password').populate('projects');
    res.json(team);
});

const createTeam = asyncHandler( async (req,res) => {
    const {team_name, team_description, team_access, owner, users} = req.body;

    if(!team_name || !team_description){
        res.status(400)
        throw new Error("Please Fill all the Fields");
    } else {
        const team = new Team({
            team_name, 
            team_description,
            team_access,
            owner,
            users});
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
    console.log("Update Team Users");

    const team = await Team.findById(req.params.id);
    console.log("Owner: " + team.owner.toString());
    const {userId} = req.body;

    //Check if this team belongs to the user
    if(team.owner.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this aciton");
    }

    if(team){
        //Edit the array here
        const updatedTeam = await team.update({$push: { users: userId}});
        console.log("update: " + updatedTeam);
        res.json(updatedTeam);
    } else {
        res.status(404);
        throw new Error("Section not found");
    }
})

const deleteTeam = asyncHandler(async (req,res) => {
    const team = await Team.findById(req.params.id);

    if(team.owner.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");   
    }

    if(team){
        await team.remove();
        res.json({message: "Team Removed"});
    }
});

const deleteUser = asyncHandler(async (req,res) => {
    const team = await Team.findById({users: req.params.userId});

    if(team.owner.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");   
    }

    if(team){
        await team.remove();
        res.json({message: "Team Removed"});
    }
});

module.exports = {getTeam, createTeam, updateTeam, deleteTeam, getTeamById, updateTeamUser, deleteUser};