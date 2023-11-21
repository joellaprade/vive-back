const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    mail: String,
    password: String,
    isUser: Boolean,
    isAdmin: Boolean
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;