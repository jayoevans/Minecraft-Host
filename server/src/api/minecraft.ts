import express from "express";
import axios from "axios";
import base64 from "js-base64";

export const minecraft = express.Router();

class User {
    username: string;
    uuid: string;
    previousUserNames: any;
    skin: any;
}

minecraft.get("/status", (req, res) => {
    axios
        .get("https://status.mojang.com/check")
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
});

minecraft.get(
    "/user/:id",
    async (req: express.Request, res: express.Response) => {
        let query: string = req.params.id;
        let currentTime: number = Date.now();
        let newUser = new User();
        let errorCheck:Boolean = false;
        let URL: string = `https://api.mojang.com/users/profiles/minecraft/${query}?at=${currentTime}`;
        await axios
            .get(URL)
            .then(function (response) {
                if (response.data) {
                    newUser.username = response.data.name;
                    newUser.uuid = response.data.id;
                } else {
                    res.json({ Error: "Doesn't exist" });
                    errorCheck = true;
                }
            })
            .catch(function (error) {
                console.log(error);
                res.json({ Error: "Something went wrong" });
                errorCheck = true;
            });
            
            if(!errorCheck)
            {
              newUser.skin = await getSkin(newUser.uuid);
              newUser.previousUserNames = await getUsernames(newUser.uuid);
              
              res.json(JSON.parse(JSON.stringify(newUser)));
              console.log(newUser.username);
              console.log(newUser.uuid);
              console.log(newUser.skin);
              console.log(newUser.previousUserNames);
            }
    }
);
async function getSkin(uuid: String):Promise<String> {
    let URL = `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`;
    let skin:String = "";
    await axios
        .get(URL)
        .then(function (response) {
                let test = response.data.properties[0].value;
                let skinTexture = JSON.parse(base64.decode(test));
                
                console.log(skinTexture);
                skin = skinTexture.textures.SKIN.url;
        })
        .catch(function (error) {
            console.log(error);
        });
        return skin;
}

async function getUsernames(uuid: String):Promise<JSON>
{
    let URL = `https://api.mojang.com/user/profiles/${uuid}/names`;
    let names:any = "";
    await axios
        .get(URL)
        .then(function (response) 
        {
          names = response.data;
          //returns a millisecond timestamp.
          //Convert to seconds -> display conversion to show date of name change?
        })
        .catch(function (error) 
        {
          console.log(error);
        });
        return names;
}
