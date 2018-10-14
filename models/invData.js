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
    copper: [{ore: Number, bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    iron: [{ore: Number, bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    silver: [{ore: Number, bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    nickel: [{ore: Number, bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    gold: [{ore: Number, bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    platinum: [{ore: Number, bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    ruthenium: [{ore: Number, bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    titanium: [{ore: Number, bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    molybdenum: [{ore: Number, bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    rhenium: [{bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    iridium: [{bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    osmium: [{bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}],
    diamond: [{bar: Number, weapon: Boolean, pick: Boolean, axe: Boolean}]
});

module.exports = mongoose.model("invData", invData);