const mongoose = require("mongoose");

let schema = new mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        target: {
            type: String,
            required: true,
        },
        email: {
            type: mongoose.SchemaTypes.Email,
            unique: true,
            lowercase: true,
            required: true,
        },
        amount: {
            type: Number,
            required: true,

        }
    },{collection: "pitch_ideas"}
);

module.exports = mongoose.model("pitchIdea", schema);
