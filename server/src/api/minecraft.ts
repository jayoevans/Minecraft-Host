import express from "express";
import axios from "axios";

export const minecraft = express.Router();

minecraft.get("/chizzy", (req, res) => 
{
  res.send("working");
    axios.get("https://status.mojang.com/check")
    .then(function (response) 
    {
      res.json(response.data);
    })
    .catch(function (error) 
    {
      console.log(error);
    });
});

minecraft.get("/minecraft/user/:id",(req: express.Request, res: express.Response) => 
{
    let query: string = req.params.id;
    let currentTime: number = Date.now();
    const URL: string = `https://api.mojang.com/users/profiles/minecraft/${query}?at=${currentTime}`;
    axios.get(URL)
    .then(function(response)
    {
        res.json(response.data);
    })
    .catch(function (error)
    {
        console.log(error);
    });
});



//Doesnt need to be accessed by webpage, use base for getting user data.
// router.get("/previous/:id", (req, res) => {
//     const query = req.params.id;
//     const URL = `https://api.mojang.com/user/profiles/${query}/names`;
//     axios
//       .get(URL)
//       .then(function (response) {
//         res.json(response.data);
//       })
//       .catch(function (error) {
//           console.log(error)
//       });
//   });