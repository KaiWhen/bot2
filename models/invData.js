const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invData = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    username: String,
    minelvl: Number,
    minexp: Number,
    pick: String,
    axe: String,
    weapon: [{
        copper: String, damage: Number
    }],
    pickdur: Number,
    axedur: Number,
    weapondam: Number,
    copper: Number,
    iron: Number,
    silver: Number,
    nickel: Number,
    gold: Number,
    platinum: Number,
    ruthenium: Number,
    titanium: Number,
    molybdenum: Number,
    rhenium: Number,
    iridium: Number, 
    osmium: Number, 
    diamond: Number
});

module.exports = mongoose.model("invData", invData);