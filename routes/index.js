var express = require("express");
var router = express.Router();
/* GET home page. */


router.get("/", function (req, res, next) {
  res.json({ message: " welcome to my blog app see all the endpoints on my github  umakant-2113/ConduitApi " });
});
module.exports = router;
