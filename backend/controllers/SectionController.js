const asyncHandler = require("express-async-handler");
const Section = require("../models/SectionModel");

const createSection = asyncHandler( async (req,res) => {
    const {section_name, section_description} = req.body;

    if(!section_name || !section_description){
        res.status(400)
        throw new Error("Please Fill all the Fields");
    } else {
        const section = new Section({user: req.user._id, section_name, section_description});
        const createdSection = await section.save();
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
    const {section_name, section_description} = req.body;

    const section = await Section.findById(req.params.id);

    //Check if this Section belongs to the user
    if(section.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if(section){
        section.section_name = section_name;
        section.section_description = section_description;

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


module.exports = {createSection, getSections,getSectionById, updateSection, deleteSection,updateSectionOrder};