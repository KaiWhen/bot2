const mongo = require('mongodb').MongoClient;


db.createCollection("muteReport", {
    _id: mongo.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reason: String,
    mUser: String,
    mID: String,
    Time: String

});

