import React from "react";
import { Server } from "./server";
import { ServerInfo } from "../../server/server-info";
import { ServerState } from "../../server/server-state";

export class ServerList extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);

        this.state = {
            servers: []
        };
    }

    render()
    {
        const items: JSX.Element[] = [];

        for (const serverInfo of this.state.servers)
        {
            const element = <Server key = { serverInfo.serverId } serverInfo = { serverInfo }/>
            items.push(element);
        }

        return (
            <div>
                { items }
            </div>
        );
    }

    componentDidMount(): void
    {
        fetch(`http://localhost:8000/servers/${this.props.accountId}`)
            .then(res => res.json())
            .then(json =>
            {
                const servers: ServerInfo[] = [];

                for (const server of json.servers)
                {
                    const serverId = server.serverId;
                    const serverName = server.serverName;
                    const instanceId = server.instanceId;

                    servers.push({ serverId, serverName, serverState: ServerState.OFFLINE, instanceId });
                }

                this.setState({ servers });
            });
    }
}

interface Props
{
    accountId: string;
}

interface State
{
    servers: ServerInfo[];
}
