const mongo = require('mongodb').MongoClient;


const muteSchema = mongo.Schema({
    _id: mongo.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reason: String,
    mUser: String,
    mID: String,
    Time: String

})

module.exports = mongo.model("muteReport". muteSchema);