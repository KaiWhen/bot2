const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const charData = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    username: String,
    charxp: Number,
    charlvl: Number,
    strength: Number,
    defence: Number,
    time: String,
    park: Boolean,
    gym: Boolean,
    dojo: Boolean,
    wood: Number,
    woodexp: Number,
    woodlvl: Number,
    woodact: Boolean
});

module.exports = mongoose.model("charData", charData);