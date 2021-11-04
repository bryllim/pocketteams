const projectSchema = mongoose.Scema(
    {
        team_name:{
            type: String,
            required: true,
        },
        team_description: {
            type: String,
            required: true,
        },
        team_user_list:{
            type: String,
            requierd: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: TransformStreamDefaultController,
    }
);

const Team = mongoose.model("Team", projectSchema);

module.exports = Team;