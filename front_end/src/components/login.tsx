import React from "react";
import axios from 'axios';

export class Login extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    render()
    {
        return (
            <div id="container">
                <h1 id="h1">Login</h1>
                <form id="loginForm" onSubmit = { this.handleSubmit }>

                    <div>
                        <input id="input" name = "username"
                            placeholder = "username"
                            value = { this.state.username }
                            onChange = { event => this.setUsername(event.target.value) }
                        />
                    </div>

                    <div>
                        <input id="input" name = "password"
                            type = "password"
                            placeholder = "password"
                            value = { this.state.password }
                            onChange = { event => this.setPassword(event.target.value) }
                        />
                    </div>

                    <button id="btn" type = "submit">Submit</button>
                    <div id="errorDiv">div for error reporting</div>

                </form>
            </div>
        );
    }

    handleSubmit = (event: React.FormEvent) =>
    {
        event.preventDefault();

        console.log("Submit Form");
        console.log(this.state);
        const data = this.state;
        axios.post('http://localhost:5000/login',{data})
        .then(res => {
            console.log(res);})
        .catch(err => {
            console.log(err);
        })
    };

    private setUsername(username: string)
    {
        this.setState({ username });
    }

    private setPassword(password: string)
    {
        this.setState({ password });
    }
}

interface Props
{
}

interface State
{
    username: string;
    password: string;
}
