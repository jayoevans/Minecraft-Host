const express = require("express");
const axios = require("axios");

const router = express.Router();

let data = {
  "Username" : "fr0stieee",
  "id": "12nsdfdfdf"
  };
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

// router.get("/:id", (req, res) => {
//   const query = req.params.id;
//   const currentTime = Date.now();
//   const URL = `https://api.mojang.com/users/profiles/minecraft/${query}?at=${currentTime}`;
//   axios
//     .get(URL)
//     .then(function (response) {
//       res.json(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

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

router.get("/test", (req, res) => {
  res.json(data);
});
module.exports = router;
