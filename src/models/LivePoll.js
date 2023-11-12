const { Schema, model } = require('mongoose');

const PollSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        optionA: {
            type: String,
            required: true
        },
        optionB: {
            type: String,
            required: true
        }
    }]
});

const Polls = model('polls', PollSchema);

module.exports = Polls;