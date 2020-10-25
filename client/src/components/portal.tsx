import React from "react";
import axios from "axios";
import ModalPopup from "./modal-popup"
import { ServerList } from "./server/server-list";

let previousNames:any = [];
export class Portal extends React.Component<Props, State> 
{
    constructor(props: Props) 
    {
        super(props);

        this.state = {
            username: "",
            uuid: "",
            skin: ""
            // previousNames: [],
        };
    }
    async componentDidMount() 
    {
        try 
        {
            if (this.state.username) 
            {
                let uuid;
                let skin;
                let currentUrl: any = window.location.host.split(":");
                let regexp = new RegExp("^(?:[0-9]{1,3}.){3}[0-9]{1,3}");
                let URL:string = "http://localhost:5000/minecraft/user/" +this.state.username;
                if (regexp.test(currentUrl[0]) || currentUrl[0] === "localhost")
                {
                    console.log(currentUrl[0]);
                    console.log("Current url [0]");
                    URL = currentUrl[0];
                } else if (regexp.test(currentUrl[1]) || currentUrl[1] === "localhost")
                {
                    console.log(currentUrl[1]);
                    console.log("Current url [1]");
                    URL = currentUrl[1];
                } else 
                {
                    console.log("Neither " +currentUrl[0] +" or " +currentUrl[1] +" equals a valid IP");
                }
                
                await axios.get(URL)
                    .then((res) => 
                    {
                        uuid = res.data.uuid;
                        skin = res.data.skin;
                        previousNames = res.data.previousUserNames;
                        if(previousNames === undefined)
                        {
                            previousNames =[{"No data":"Soz"}];
                        }
                        console.log(res.data);
                    })
                    .catch((error) => 
                    {
                        console.log(error);
                    });

                this.setUuid(uuid);
                this.setSkin(skin);
            }
        } catch (error) 
        {
            console.log(error);
        }
    }

    render() 
    {
        return (
            
            <div id="portalContainer" className="portal">
                {/* <ModalPopup/> */}
                {/* <h1>Portal</h1> */}
                <div id="splitDiv">
                    <article id="lHalf">
                        <div id="infoDiv">
                            <h3 id="h3"> Current Minecraft name:{this.state.username}</h3>
                            <h3 id="h3">Previous names: </h3>
                            <div id="previousNames">
                                {previousNames.map(function(d, idx)
                                {
                                    return(<li key={idx}>{d.name}</li>)
                                })}
                            </div>

                            <ServerList accountId = { "dd578a4f-d35e-4fed-94db-9d5a627ff962" }></ServerList>
                            {/*<div className="savedWorlds">*/}
                            {/*    <h3 id="h3">Saved worlds</h3>*/}
                            {/*    <button>New world</button>*/}
                            {/*</div>*/}
                            {/**/}
                            {/*<div className="worldDiv">*/}
                            {/*    <div id="img-container">*/}
                            {/*        <img src={require("../images/WorldPreview.png")}/>*/}
                            {/*    </div>*/}
                            {/*    <div id="info">*/}
                            {/*        <p>*World Name*</p>*/}
                            {/*        <div id="buttonDiv">*/}
                            {/*            <button>Start</button>*/}
                            {/*            <button>Delete</button>*/}
                            {/*        </div>*/}
                            {/*        */}
                            {/*    </div>*/}
                            {/*    */}
                            {/*</div>*/}
                            {/*<button id="launchServer">*/}
                            {/*    Start my Minecraft server*/}
                            {/*</button>*/}
                        </div>
                    </article>
                    <article id="rHalf">
                        <h3 id="h3">Players skin</h3>
                        <div id="imgDiv">
                            <img
                                id="skin"
                                src={this.state.skin}
                                alt="Players minecraft skin"
                            />
                        </div>
                    </article>
                </div>
            </div>
        );
    }

    handleSubmit = (event: React.FormEvent) => 
    {
        event.preventDefault();
        this.componentDidMount();
        console.log(URL);
    };

    private setUsername(username: string) 
    {
        this.setState({ username });
    }

    private setUuid(uuid: string) 
    {
        this.setState({ uuid });
    }
    private setSkin(skin: string)
    {
        this.setState({skin});
    }
}

interface Props {}

interface State {
    username: string;
    uuid: string;
    skin: string;
    //previousNames: any;
}
