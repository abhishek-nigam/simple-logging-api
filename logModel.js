const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    user: { type: Number, required: true },
    userId: { type: String, required: false },
    action: { type: String, required: true },
    message: { type: String, required: true },
    logLevel: { type: Number, required: true }
})

module.exports = mongoose.model('Log', logSchema);