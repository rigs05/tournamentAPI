const matchCard = require("../models/LiveMatch");

const getLiveCard = async (req, res) => {
    try {
        const teams = await matchCard.find();
        if (!teams) {
            return res.status(400).json({ message: "Team data not found." });
        }
        const teamData = teams.map((team) => {
            if (team) {
                const teamA = team.Team1.map((team1info) => {
                    return {
                        team: team1info.team,
                        score: team1info.score,
                    }
                });
                const teamB = team.Team2.map((team2info) => {
                    return {
                        team: team2info.team,
                        score: team2info.score,
                    }
                });
                return {
                    team1: teamA,
                    team2: teamB
                }
            }
        });
        res.status(200).send(teamData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Couldn't fetch live score." });
    }
};


const postLiveCard = async (req, res) => {
    try {
        const { team1, team2 } = req.body;
        let teamsExist = await matchCard.findOne({
            'Team1.team': team1.team,
            'Team2.team': team2.team 
        });

        if (!teamsExist) {
            teamsExist = new matchCard({ Team1: team1, Team2: team2 });
            await teamsExist.save();
            return res.status(200).json({ message: "Teams data inserted successfully." });
        }
        else {
            const team1data = teamsExist.Team1.find(data => data.team === team1.team);
            const team2data = teamsExist.Team2.find(data => data.team === team2.team);
            
            if (team1data.score === team1.score && team2data.score === team2.score) {
                return res.status(400).json({ message: "Same score, No update." });
            }
            else {
                if (team1data) {
                    team1data.score = team1.score;
                }
                if (team2data) {
                    team2data.score = team2.score;
                }
                
                await teamsExist.save();
                return res.status(200).json({ message: "Teams score updated." });
            }            
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update the team data." });
    }
};

module.exports = {
    getLiveCard,
    postLiveCard
}