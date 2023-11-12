const teams = require('../models/Teams');

const getTeamData = async (req, res) => {
    try {
        const { teamId } = req.params;
        const teamExist = await teams.findOne({ teamId });
        if (!teamExist) {
            return res.status(404).json({ message: "Teams not found in db." });
        }
        res.status(200).send(teamExist.teamMembers);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to fetch the teams." });
    }
};

const addTeamData = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { members } = req.body;
        let teamExist = await teams.findOne({ teamId });
        
        if (!teamExist) {
            teamExist = new teams({ teamId, teamMembers: members });
            await teamExist.save();
            return res.status(200).json({ message: `TeamId created with members ${members}.` });
        }

        teamExist.teamMembers.push(...members);
        await teamExist.save();
        res.status(200).json({ message: `Members' list of team-id ${teamId} updated successfully.` });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to fetch the teams." });
    }
};

module.exports = {
    getTeamData,
    addTeamData
}