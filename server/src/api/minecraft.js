const express = require("express");
const axios = require("axios");

const router = express.Router();

//localhost:5000/minecraft
router.get("/", (req, res) => {
  axios
    .get("https://status.mojang.com/check")
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
//localhost:5000/minecraft/user/<name>
router.get("/user/:id", (req, res) => {
  const query = req.params.id;
  const currentTime = Date.now();
  const URL = `https://api.mojang.com/users/profiles/minecraft/${query}?at=${currentTime}`;
  axios
    .get(URL)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

//localhost:5000/minecraft/previous/<uuid> - for bens acc = b5945414ae2740089fef96db2e1047cf
//Should show 4 name changes. Bought from friend -> hacked -> getting back
router.get("/previous/:id", (req, res) => {
  const query = req.params.id;
  const URL = `https://api.mojang.com/user/profiles/${query}/names`;
  axios
    .get(URL)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
        console.log(error)
    });
});
module.exports = router;
