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
    copper: {ore: Number, bar: Number, weapon: Number, pick: Number, axe: Number},
    iron: {ore: Number, bar: Number, weapon: Number, pick: Number, axe: Number},
    silver: {ore: Number, bar: Number, weapon: Number, pick: Number, axe: Number},
    nickel: {ore: Number, bar: Number, weapon: Number, pick: Number, axe: Number},
    gold: {ore: Number, bar: Number, weapon: Number, pick: Number, axe: Number},
    platinum: {ore: Number, bar: Number, weapon: Number, pick: Number, axe: Number},
    ruthenium: {ore: Number, bar: Number, weapon: Number, pick: Number, axe: Number},
    titanium: {ore: Number, bar: Number, weapon: Number, pick: Number, axe: Number},
    molybdenum: {ore: Number, bar: Number, weapon: Number, pick: Number, axe: Number},
    rhenium: {bar: Number, weapon: Number, pick: Number, axe: Number},
    iridium: {bar: Number, weapon: Number, pick: Number, axe: Number},
    osmium: {bar: Number, weapon: Number, pick: Number, axe: Number},
    diamond: {bar: Number, weapon: Number, pick: Number, axe: Number}
});

module.exports = mongoose.model("invData", invData);