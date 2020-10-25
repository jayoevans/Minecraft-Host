import React from 'react';
import { AccountInfo } from "./login/account-info";
import { Portal } from "./components/portal";
import { Login } from "./components/login";

export class App extends React.Component<Props, State>
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
            <>
                { this.state.accountInfo ? <Portal username = { this.state.username } accountInfo = { this.state.accountInfo }/> : <Login setAccountInfo = { this.setAccountInfo }/> }
            </>
        );
    }

    setAccountInfo = (accountInfo: AccountInfo) =>
    {
        this.setState({ accountInfo });
    };
}

interface Props
{
}

interface State
{
    username: string;
    accountInfo?: AccountInfo;
    error?: string;
}
