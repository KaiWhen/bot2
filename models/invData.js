const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invData = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    username: String,
    pick: String,
    pickspeed: Number,
    axe: String,
    weapon: String,
    pickdur: Number,
    axedur: Number,
    weapondam: Number,
    ore: [],
    bar: []
});

module.exports = mongoose.model("invData", invData);