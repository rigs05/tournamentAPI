const mongoose = require("mongoose");

const pointsTableSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

pointsTableSchema.statics.getPointsTableData = async function () {
  return this.find().sort({ points: -1 });
};

const PointsTable = mongoose.model("PointsTable", pointsTableSchema);

module.exports = PointsTable;