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
        const button = this.state.serverState === ServerState.OFFLINE ? <button onClick = { this.startServer }>Start</button> : <button onClick = { this.stopServer }>Stop</button>;

        return (
            <div id = "info" >
                <p>{ this.props.serverInfo.serverName }</p>
                <div>
                    { button }
                    <button>Delete</button>
                </div>
            </div>
        );
    }

    startServer = (event: React.FormEvent) =>
    {
        this.setState({ serverState: ServerUtil.startServer(this.props.serverInfo) });
    };

    stopServer = (event: React.FormEvent) =>
    {
        this.setState({ serverState: ServerUtil.stopServer(this.props.serverInfo) });
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
