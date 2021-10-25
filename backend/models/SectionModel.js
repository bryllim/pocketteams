const mongoose = require("mongoose");

const SectionSchema = mongoose.Schema(
    {
        section_name:{
            type: String,
            required: true,
        },
        section_description:{
            type: String,
        },
        section_start_date:{
            type: Date,
        },
        section_end_date:{
            type: Date,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        tasks:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        }]
    
    },
    {
        timestamps: true,
    }
);

const Section = mongoose.model("Section", SectionSchema);

module.exports = Section;