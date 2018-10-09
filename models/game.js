const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameData = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    username: String,
    gamexp: Number,
    gamelvl: Number,
    park: Boolean,
    gym: Boolean,
    dojo: Boolean
});

module.exports = mongoose.model("gameData", gameData);