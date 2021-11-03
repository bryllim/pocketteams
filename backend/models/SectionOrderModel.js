const mongoose = require("mongoose");

const SectionOrderSchema = mongoose.Schema(
    {
    
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        section_order_name: {
            type: String,
            required: true,
        },
        items:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }]
    
    },
    {
        timestamps: true,
    }
);

const SectionOrder = mongoose.model("SectionOrder", SectionOrderSchema);

module.exports = SectionOrder;