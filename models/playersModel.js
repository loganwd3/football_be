const mongoose = require("mongoose");

const PlayersSchema = mongoose.Schema({
  name: String,
  nationality: String,
  jersey_no: Number,
  ballon_dor: Number,
  golden_boot: Number,
  worldcup: Number,
  league_title: Number,
  image: String,
  assists: Number,
  goals: Number,
  position: String,
});

const playersModel = mongoose.model("players", PlayersSchema);

module.exports = playersModel;
