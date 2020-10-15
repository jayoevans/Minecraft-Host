import React from "react";

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
            <form onSubmit = { this.handleSubmit }>

                <div>
                    <input name = "username"
                           placeholder = "username"
                           value = { this.state.username }
                           onChange = { event => this.setUsername(event.target.value) }
                    />
                </div>

                <div>
                    <input name = "password"
                           type = "password"
                           placeholder = "password"
                           value = { this.state.password }
                           onChange = { event => this.setPassword(event.target.value) }
                    />
                </div>

                <button type = "submit">Submit</button>

            </form>
        );
    }

    handleSubmit = (event: React.FormEvent) =>
    {
        event.preventDefault();

        console.log("Submit Form");
        console.log(this.state);
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
