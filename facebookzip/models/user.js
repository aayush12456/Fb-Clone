const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailorphone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: String, required: true }
})
UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', UserSchema)