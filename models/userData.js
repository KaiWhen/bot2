const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userData = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    money: Number,
    exp: Number,
    lvl: Number,
    prevDaily: Schema.Types.Mixed
});

module.exports = mongoose.model("userData", userData);