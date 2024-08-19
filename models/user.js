const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String},
    password: { type: String },
    phoneNumber: { type: String},
    location: {
        latitude: { type: Number },
        longitude: { type: Number }
    }
});

module.exports = mongoose.model("User", userSchema);
