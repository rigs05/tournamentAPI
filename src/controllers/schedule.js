const scheduleData = require('../models/scheduleModel');

const getSchedule = async (req, res) => {
    try {
        const schedules = await scheduleData.find();
        if (!schedules) {
            return res.send(400).json({ message: "No schedules found." });
        }
        console.log(schedules);
        const data = await schedules.map((entry) => {
            if (entry) {
                console.log(entry.Teams);
                const teamData = entry.Teams.map((team) => {
                    return {
                        team1: team.team1,
                        team2: team.team2
                    }
                });
                return {
                    pool_name: entry.PoolName,
                    teams: teamData,
                    sports: entry.Sports,
                    time: new Date(entry.DateTime).toTimeString(),
                    venue: entry.Venue,
                    date: new Date(entry.DateTime).toDateString()
                }
            }
        });
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to fetch team schedules." });
    }
};


const addSchedule = async (req, res) => {
    try {
        const { pool, teams, sports, dateTime, venue } = req.body;
        const inputDateTime = new Date(dateTime).toISOString();
        // console.log(inputDateTime);
        let scheduleExist = await scheduleData.findOne({
            PoolName: pool,
            // Teams: teams,
            Teams: { $elemMatch: { team1: teams.team1, team2: teams.team2 } },
            Sports: sports,
            DateTime: { $eq: inputDateTime }
        });
        if (scheduleExist) {
            return res.status(400).json({ message: "This Match is already scheduled." });
        }
        scheduleExist = new scheduleData({
            PoolName: pool,
            Teams: teams,
            Sports: sports,
            DateTime: inputDateTime,
            Venue: venue 
        });
        await scheduleExist.save();
        console.log(scheduleExist);
        res.status(200).json({ message: "Match scheduled successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to fill team schedules." });
    }
};

module.exports = {
    getSchedule,
    addSchedule
}