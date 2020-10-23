import React from "react";
import axios from "axios";
import ModalPopup from "./modalPopup"

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
                let URL = "http://localhost:5000/minecraft/user/" +this.state.username;
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
                <ModalPopup/>
                <h1>Portal</h1>
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
                            
                            <div className="savedWorlds">
                                <h3 id="h3">Saved worlds</h3>
                                <button>New world</button>
                            </div>
                            
                            <div className="worldDiv">
                                <div id="img-container">
                                    <img src={require("../images/WorldPreview.png")}/>
                                </div>
                                <div id="info">
                                    <p>*World Name*</p>
                                    <div id="buttonDiv">
                                        <button>Start</button>
                                        <button>Delete</button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                            
                            <div>
                                <p>Enter your minecraft username here:</p>
                                <form id="loginForm" onSubmit={this.handleSubmit}>
                                    <input
                                        id="input"
                                        name="username"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange={event =>
                                            this.setUsername(event.target.value)
                                        }
                                    />
                                    <button id="btn" type="submit">
                                        Submit
                                    </button>
                                </form>
                            </div>
                            <button id="launchServer">
                                Start my Minecraft server
                            </button>
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
