const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mReport = new Schema({
    _id: mongo.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reason: String,
    mUser: String,
    mID: String,
    Time: String

});

module.exports = mongoose.model("mReport", mReport);