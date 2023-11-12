const polls = require('../models/LivePoll');
// const socketIO = require('socket.io-client');

// const livePollSocket = socketIO('http://localhost:3000/socket/live-poll');


const getPollData = async (req, res) => {
    try {
        const pollData = await polls.find();
        if (!pollData || pollData.length === 0) {
            return res.status(404).json({ message: "Live Poll Data not found." });
        }
        const pollInfo = pollData.map((poll) => {
            if (poll) {
                const pollOptions = poll.options.map((choice) => {
                    if (choice) {
                        return {
                            option1: choice.optionA,
                            option2: choice.optionB
                        }
                    }
                });
                return {
                    question: poll.question,
                    options: pollOptions
                }
            }
        });
        res.status(200).json(pollInfo);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to fetch Live Poll." });
    }
};



// Sockets under development!!

// const postVote = async (req, res) => {
//     livePollSocket.emit('updateResults', )
// };

module.exports = { getPollData };