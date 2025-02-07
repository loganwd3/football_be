const mongoose = require("mongoose");

const managerSchema = mongoose.Schema({
  name: String,
  champions_league: Number,
  league_title: Number,
  domestic_title: Number,
  world_cup: Number,
  image: String,
});

const managersModel = mongoose.model("managers", managerSchema);

module.exports = managersModel;
