const express = require("express");
const dbConn = require("./dbConn");

const app = express();
const routes = require("./routes/router.js");
const cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json());

//db connection
dbConn();

//router
app.use(routes);

//server connection
app.listen(process.env.PORT, () => {
  console.log("Server connected");
});
