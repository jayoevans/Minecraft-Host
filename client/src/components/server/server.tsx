import React from "react";
import { ServerInfo } from "../../server/server-info";
import { ServerUtil } from "../../server/server-util";
import { ServerState } from "../../server/server-state";

export class Server extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {
            serverState: ServerState.OFFLINE
        };
    }

    render()
    {
        return (
            <div id = "info" >
                <p>{ this.props.serverInfo.serverName }</p>
                <div>
                    { this.getElement() }
                </div>
            </div>
        );
    }

    private getElement(): JSX.Element
    {
        switch (this.state.serverState)
        {
            case ServerState.ONLINE:
                return (
                    <button onClick = { this.stopServer }>Stop</button>
                );
            case ServerState.STARTING:
                return (
                    <p>Starting...</p>
                );
            case ServerState.STOPPING:
                return (
                    <p>Stopping...</p>
                );
            case ServerState.OFFLINE:
                return (
                    <button onClick = { this.startServer }>Start</button>
                );
            default:
                return (
                    <p>Error</p>
                );
        }
    }

    startServer = (event: React.FormEvent) =>
    {
        this.setState({ serverState: ServerUtil.startServer(this.props.serverInfo) });

        setTimeout(() => this.setState({ serverState: ServerState.ONLINE }), 2000);
    };

    stopServer = (event: React.FormEvent) =>
    {
        this.setState({ serverState: ServerUtil.stopServer(this.props.serverInfo) });

        setTimeout(() => this.setState({ serverState: ServerState.OFFLINE }), 2000);
    };
}

interface Props
{
    serverInfo: ServerInfo;
}

interface State
{
    serverState: ServerState;
}
