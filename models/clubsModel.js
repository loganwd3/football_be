const mongoose = require("mongoose");

const clubSchema = mongoose.Schema({
  name: String,
  league_titles: Number,
  champions_league_titles: Number,
  domestic_titles: Number,
  logo_url: String,
});

const clubModel = mongoose.model("clubs", clubSchema);

module.exports = clubModel;
