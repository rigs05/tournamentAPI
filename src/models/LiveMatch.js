const { Schema, model } = require('mongoose');

const MatchSchema = new Schema({
    Team1: [{
        team: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    Team2: [{
        team: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true,
            default: 0
        }
    }]
});

const matchCard = model('matches', MatchSchema);

module.exports = matchCard;