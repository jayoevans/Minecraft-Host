import React from "react";
import axios from "axios";

export class Portal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: "",
            uuid: "",
            previousNames: [],
        };
    }
    async componentDidMount() {
        try {
            if (this.state.username) {
                let uuid;
                let URL =
                    "http://localhost:5000/minecraft/user/" +
                    this.state.username;
                await axios
                    .get(URL)
                    .then((res) => {
                        uuid = res.data.id;
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                this.setUuid(uuid);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div id="portalContainer" className="portal">
                <h1>Portal</h1>
                <div id="splitDiv" >
                    <article id="lHalf" >
                        <div id="infoDiv" >
                            <div>
                                <h3 id="h3">Current Minecraft name: {this.state.username}</h3>
                                <form
                                    id="loginForm"
                                    
                                    onSubmit={this.handleSubmit}
                                >
                                    <input
                                        id="input"
                                        
                                        name="username"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange={(event) =>
                                            this.setUsername(event.target.value)
                                        }
                                    />
                                    <button id="btn"  type="submit">
                                        Submit
                                    </button>
                                </form>
                            </div>
                            <h3 id="h3">Minecraft uuid: {this.state.uuid}</h3>
                            <h3 id="h3">Previous names: </h3>
                            <div id="previousNames" ></div>
                            <ul>
                                <li>test1</li>
                                <li>test2</li>
                                <li>test3</li>
                                <li>test4</li>
                            </ul>
                            <button id="launchServer" >Start my Minecraft server</button>
                        </div>
                    </article>
                    <article id="rHalf" >
                        <h3 id="h3">Players skin</h3>
                        <div id="imgDiv" >
                            <img id="skin" src="http://textures.minecraft.net/texture/a7c0223494759c0cee2491b758e004f858d3c4d6dd77f7379782b423ce01464d" alt="Players minecraft skin"/>
                        </div>
                    </article>
                </div>
            </div>
        );
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let uuid = "test";
        this.componentDidMount();
        console.log(URL);
    };

    private setUsername(username: string) {
        this.setState({ username });
    }

    private setUuid(uuid: string) {
        this.setState({ uuid });
    }
}

interface Props {}

interface State {
    username: string;
    uuid: string;
    previousNames: any;
}
