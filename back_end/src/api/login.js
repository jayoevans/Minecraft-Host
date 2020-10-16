const express = require("express");
const axios = require("axios");


const router = express.Router();
router.post("/", (req, res) => {
  try {
      console.log(req.body);
      //TODO: hit database, check for entries
      //Return 200 or 500 depending on result.
      //Fuck hashing
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
  }
});
module.exports = router;
