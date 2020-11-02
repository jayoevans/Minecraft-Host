import React from "react";
import { AccountInfo } from "../login/account-info";

export class Login extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {
            username: ""
        };
    }

    render()
    {
        return (
            <div id="loginContainer" className="loginPage">
                <h1 id="h1">Login</h1>
                <form id="loginForm" onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            id="input"
                            name="username"
                            placeholder="Minecraft Username"
                            value={this.state.username}
                            onChange={ event => this.setUsername(event.target.value) }
                        />
                    </div>

                    <button id="btn" type="submit">Submit</button>
                    <p>{ this.state.error }</p>
                </form>
            </div>
        );
    }

    handleSubmit = async (event: React.FormEvent) =>
    {
        event.preventDefault();

        const response = await fetch(`http://${window.location.hostname}:8000/minecraft/user/${this.state.username}`);
        const data = await response.json();

        if (data.Error)
        {
            this.setState({ error: data.Error });
            return;
        }

        const nameHistory: string[] = data.previousUserNames.map(entry =>
        {
            return entry.name;
        });

        const accountInfo: AccountInfo = {
            username: this.state.username,
            uuid: data.uuid,
            skin: data.skin,
            nameHistory
        };

        this.props.setAccountInfo(accountInfo);
    };

    private setUsername(username: string)
    {
        this.setState({ username });
    }
}

interface Props
{
    setAccountInfo: (accountInfo: AccountInfo) => void;
}

interface State
{
    username: string;
    error?: string;
}
