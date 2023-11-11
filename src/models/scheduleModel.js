const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
    PoolName: {
        type: String,
        required: true
    },
    Teams: [{
        team1: {
            type: String,
            required: true
        }, 
        team2: {
            type: String,
            required: true
        }
    }],
    Sports: {
        type: String,
        required: true
    },
    DateTime: {
        type: Date,
        required: true
    },
    Venue: {
        type: String,
        default: "TBA"
    }
});

const scheduleModel = model('matchSchedule', scheduleSchema);

module.exports = scheduleModel;