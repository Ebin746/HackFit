const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    location: {
        latitude: { type: Number },
        longitude: { type: Number }
    },
     comments: { type: String},
     voteType: { type: String, enum: ['upvote', 'downvote'] }

});

module.exports = mongoose.model("User", userSchema);
