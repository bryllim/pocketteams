const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        project_name:{
            type: String,
            required: true,
        },
        project_status:{
            type: String,
            required: true,
        },
        project_image:{
            data: Buffer,
            contentType: String,
        },
        project_description:{
            type: String,
        },
        project_start_date:{
            type: Date,
        },
        project_end_date:{
            type: Date,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;