const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemData = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    amount: Number,
    description: String
});

module.exports = mongoose.model("itemData", itemData);