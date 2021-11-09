const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        team_name:{
            type: String,
            required: true,
        },
        team_description: {
            type: String,
            required: true,
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        }],
        projects:[{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Project",
        }]
    },
    {
        timestamps: true,
    }
);

const Team = mongoose.model("Team", projectSchema);

module.exports = Team;