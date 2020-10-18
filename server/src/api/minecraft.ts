import express, { response } from "express";
import axios from "axios";
import base64 from "js-base64";

let userData:any;

export const minecraft = express.Router();

class User
{
  username:string;
  uuid:string;
  previousUsernames:any;
  skin:any;
}


minecraft.get("/status", (req, res) => {
  axios.get("https://status.mojang.com/check")
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

minecraft.get("/user/:id", async (req: express.Request, res: express.Response) => {
  let query: string = req.params.id;
  let currentTime: number = Date.now();
  let userId;
  let newUser = new User();
  let URL: string = `https://api.mojang.com/users/profiles/minecraft/${query}?at=${currentTime}`;
  await axios.get(URL)
    .then(function (response) {
      if (response.data) {
        // userData = response.data.id;
        res.json(response.data);
        userId = response.data.id;
        newUser.username = response.data.name;
        newUser.uuid = response.data.id;
      }
      else {
        res.json({ "Error": "Doesn't exist" });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    URL = `https://api.mojang.com/user/profiles/${userId}/names`;
    await axios.get(URL)
    .then(function (response) 
    {
      if (response.data) {
        newUser.previousUsernames = response.data;
      }
      else {
        res.json({ "Error": "Doesn't exist" });
      }
    })
    .catch(function (error) 
    {
      console.log(error);
    });

    

    //Testing uuid -> profile + skin/cape

    URL = `https://sessionserver.mojang.com/session/minecraft/profile/${userId}`;
    await axios.get(URL)
    .then(function (response) 
    {
      if (response.data) {
        // console.log(response.data);
        let test = response.data.properties[0].value;
        let skinTexture = JSON.parse(base64.decode(test));
        newUser.skin = skinTexture.textures.SKIN.url;
      }
      else {
        res.json({ "Error": "Doesn't exist" });
      }
    })
    .catch(function (error) 
    {
      console.log(error);
    });


    console.log(newUser.username);
    console.log(newUser.uuid);
    console.log(newUser.previousUsernames);
    console.log(newUser.skin);

    //TODO: Store the newUser into 
});