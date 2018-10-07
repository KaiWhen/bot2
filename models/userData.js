const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userData = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    //serverID: String,
    money: Number,
    prevDaily: Schema.Types.Mixed
});

module.exports = mongoose.model("userData", userData);