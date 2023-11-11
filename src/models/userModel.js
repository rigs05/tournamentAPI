const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        requrired: true,
        unique: true
    },

    pass: {
        type: String,
        required: true,
    }
});

const userModel = model('users', UserSchema);

module.exports = userModel;