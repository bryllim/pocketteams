const asyncHandler = require("express-async-handler");
const Team = require("../models/TeamModel");

const getTeam = asyncHandler(async (req, res) => {
    const team = await Team.find({owner: req.user._id}).populate("projects");
    res.json(team);
});

const createTeam = asyncHandler( async (req,res) => {
    const {team_name, team_description, owner, users} = req.body;

    if(!team_name || !team_description){
        res.status(400)
        throw new Error("Please Fill all the Fields");
    } else {
        const team = new Team({
            owner,
            team_name, 
            team_description,
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
    const {team_name, team_description} = req.body;

    const team = await team.findById(req.params.id);

    //Check if this team belongs to the user
    if(team.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if(team){
        team.team_name = team_name;
        team.team_description = team_description;

        const updatedTeam = await team.save();
        res.json(updatedTeam);
    } else {
        res.status(404);
        throw new Error("team not found");
    }
});

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

module.exports = {getTeam, createTeam, updateTeam, deleteTeam, getTeamById};