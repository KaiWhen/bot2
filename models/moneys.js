const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const money = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    serverID: String,
    money: Number,
    daily: Schema.Types.Mixed
});

module.exports = mongoose.model("moneydata", money);