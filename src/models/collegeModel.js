const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        lowercase : true,
        trim: true,
    },
    fullName : {
        type: String,
        required: true,
        trim: true
    },
    isDeleted : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("College",collegeSchema)