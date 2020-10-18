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
            <div id="container" className="portal">
                <h1>Portal</h1>
                <div id="infoDiv" className="portal">
                    <div>
                        <h3>Current Minecraft name: {this.state.username}</h3>
                        <form
                            id="loginForm"
                            className="portal"
                            onSubmit={this.handleSubmit}
                        >
                            <input
                                id="input"
                                className="portal"
                                name="username"
                                placeholder="username"
                                value={this.state.username}
                                onChange={(event) =>
                                    this.setUsername(event.target.value)
                                }
                            />
                            <button id="btn" className="portal" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                    <h3>Minecraft uuid: {this.state.uuid}</h3>
                    <ul>Previous names: </ul>
                    <div id="previousNames" className="portal"></div>
                    <button id="launchServer" className="portal"></button>
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
