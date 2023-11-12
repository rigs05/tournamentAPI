const { Schema, model } = require('mongoose');

const TeamSchema = new Schema({
    teamId: {
        type: Number,
        required: true
    },
    teamMembers: {
        type: Array,
    }
});

const TeamModel = model('teams', TeamSchema);

module.exports = TeamModel;