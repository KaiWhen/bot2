const mongo = require('mongodb').MongoClient;
var dbo = db.db("bot2yep");

dbo.createCollection("muteReport", {
    _id: mongo.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reason: String,
    mUser: String,
    mID: String,
    Time: String

});

