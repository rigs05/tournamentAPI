const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

const userRoutes = require('./src/routes/auth');
const pointsTableRoutes = require("./src/routes/pointsTable");
const fixtureRoutes = require("./src/routes/Fixture");
const liveStreamRoutes = require("./src/routes/LiveStream");
const liveMatchCardRoutes = require('./src/routes/LiveMatch');
const scheduleDataRoutes = require('./src/routes/ScheduleData');
const livePollRoutes = require('./src/routes/LivePoll');
const teamRoutes = require('./src/routes/Teams');

mongoose
  .connect("mongodb://127.0.0.1:27017/eshway-task", {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });



app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/points-table", pointsTableRoutes);
app.use("/api/fixtures", fixtureRoutes);
app.use("/api/live-streams", liveStreamRoutes);
app.use("/api/live-match-card", liveMatchCardRoutes);
app.use("/api/schedule", scheduleDataRoutes);
app.use("/api/live-poll", livePollRoutes);
app.use("/api/team-members", teamRoutes);


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// SOCKETS (under development)
// const io = require("socket.io")(server);

// io.of('/socket/live-poll').on('connection', (socket) => {
//   console.log("A client is connected to the live poll socket.");



//   socket.on('disconnect', () => {
//     console.log("A client has been disconnected from socket.");
//   })
// })