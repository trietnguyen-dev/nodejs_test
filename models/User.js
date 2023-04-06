var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({


    firstname: {
        type: String,
        required: true

    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    id: {
        type: String,
    },
    coordinate: {
        type: String,

    },


}, { timestamps: true });

var User = mongoose.model("User", userSchema);

module.exports = User;
