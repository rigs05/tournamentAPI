const Fixture = require("../models/Fixture");

const getFixtures = async (req, res) => {
  try {
    const fixtures = await Fixture.find().populate("sport", "sportName");
    res.json(fixtures);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch fixtures" });
  }
};

const addFixture = async (req, res) => {
  try {
    const { sport, date, teams } = req.body;
    const fixture = new Fixture({ sport, date, teams });
    await fixture.save();
    res.json({ message: "Fixture added successfully", fixture });
  } catch (err) {
    res.status(500).json({ error: "Could not add a new fixture" });
  }
};

const updateFixture = async (req, res) => {
  try {
    const { fixtureId } = req.params;
    const { sport, date, teams } = req.body;
    const fixture = await Fixture.findByIdAndUpdate(
      fixtureId,
      { sport, date, teams },
      { new: true }
    );
    if (!fixture) {
      return res.status(404).json({ error: "Fixture not found" });
    }
    res.json({ message: "Fixture updated successfully", fixture });
  } catch (err) {
    res.status(500).json({ error: "Could not update fixture" });
  }
};

module.exports = {
  getFixtures,
  addFixture,
  updateFixture,
};