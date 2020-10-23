import React from "react";
import axios from "axios";

export class AlteredLogin extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: "",
            uuid:"",
            skin:"",
            previousNames:[],
            error:"",
        };
    }

    render() {
        return (
            <div id="loginContainer" className="loginPage">
                <h1 id="h1">Login</h1>
                <form id="loginForm" onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            id="input"
                            name="username"
                            placeholder="Minecraft username"
                            value={this.state.username}
                            onChange={ event => this.setUsername(event.target.value)
                            }
                        />
                    </div>

                    <button id="btn" type="submit">
                        Submit
                    </button>
                        <p>{this.state.error}</p>
                </form>
            </div>
        );
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log("Submit Form");
        console.log(this.state);
        const data = this.state;
        axios
            .get(`http://localhost:5000/minecraft/user/${data.username}`)
            .then((res) => {
                if(res.status == 200)
                {
                    if(res.data.Error == "Doesn't exist")
                    {
                        this.setError("User doesn't exist");
                        this.setUsername("");
                    }
                    else
                    {
                        this.setUuid(res.data.uuid);
                        this.setSkin(res.data.skin);
                        this.setPreviousNames(res.data.previousUserNames);

                    }
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                this.setError("Server experiencing trouble, try again later.");
                this.setUsername("");
            });
    };

    private setUsername(username: string) {
        this.setState({ username });
    }
    private setUuid(uuid: string) {
        this.setState({ uuid });
    }
    private setSkin(skin: string) {
        this.setState({ skin });
    }
    private setPreviousNames(previousNames: any) {
        this.setState({ previousNames });
    }
    private setError(error:string) {
        this.setState({ error });
    }
}

interface Props {}

interface State {
    username: string;
    uuid:string;
    skin:string;
    previousNames:any;
    error:string;
}
