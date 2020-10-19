import express from "express";
import axios from "axios";

export const login = express.Router();
let users =  [
    {
      id: 1,
      username: "ben",
      password: "123",
    },
    {
      id: 2,
      username: "jay",
      password: "123",
    },
    {
        id: 3,
        username: "user1",
        password: "123",
      },
      {
        id: 4,
        username: "user2",
        password: "123",
      }
  ];

login.post("/", (req: express.Request, res: express.Response) => 
{
    let sentData = req.body.data;
    let loggedIn:Boolean = false;
    for(let key in users)
    {
        if(users.hasOwnProperty(key) && loggedIn == false)
        {
            if(users[key].username == sentData.username)
            {
                console.log("Same usernames")
                if(users[key].password == sentData.password)
                {
                    loggedIn = true;
                }
                else
                {
                    loggedIn=false;
                }
            }
        }
    }
    
    if(loggedIn)
    {
        res.sendStatus(200);
    }
    else
    {
        res.sendStatus(401);
    }
    
});
