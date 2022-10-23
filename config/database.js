const mongoose = require("mongoose");
require("dotenv").config();
//establish our application connection with the database
module.exports.connect = function () {
  mongoose.connect(
    `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWD}@cluster0.v6x9g.mongodb.net/?retryWrites=true&w=majority`,
    (err) => {
      console.log(err ? err : "Connection is made sucessfully");
    }
  );
};
