var router = require("express").Router();
var path = require("path");

router.all("*", (_, response) =>
  response.sendFile(path.resolve(__dirname, "../front-end/build", "index.html"))
);

module.exports = router;
