const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
 

const getNotes = asyncHandler(async (req, res) => {
    console.log("getnotes")
        const notes = await Note.find( { user: req.user._id } );
        res.json(notes);
});

const createdNote = asyncHandler(async (req,res) => {
    console.log("createdNote")
    const { content } = req.body;
    
    const note_exists = await Note.findOne({user: req.user._id});

    //Check if there is already a note 
    if(note_exists){
        res.status(400)
        throw new Error('Note already created');
    }

    const note = new Note( { user: req.user._id, content } );
    const createdNote = await note.save();

    res.status(201).json(createdNote);
})

const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(note._id);
    
    if(note) {
        res.json(note);
    } else {
        res.status(404).json( { message:"Note not found" } );
    }
});

const updateNote = asyncHandler(async (req, res) => {
    console.log('test')
    const { content } = req.body;
    const note = await Note.findById(req.params.id);
  
    if (note.user.toString() !== req.user._id.toString() ) {
        res.status(401);
        throw new console.error("You can't perfrom this action");
    }

    if (note) {
        note.content = content;

        const updatedNote = await note.save();
        res.json(updatedNote)
    } else {
        res.status(404);
        throw new console.error("Note not found.");
    }
});


module.exports = { getNotes, createdNote, getNoteById, updateNote, };