import React from "react";
import { Server } from "./server";
import { ServerInfo } from "../../server/server-info";
import { ServerUtil } from "../../server/server-util";

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
            const element = <Server key = { serverInfo.serverId } serverInfo = { serverInfo } deleteServer = { this.deleteServer }/>
            items.push(element);
        }

        return (
            <div>
                <button onClick = { this.createServer }>Create Server</button>
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

                    servers.push({ serverId, serverName, instanceId });
                }

                this.setState({ servers });
            });
    }

    createServer = (event: React.FormEvent) =>
    {
        ServerUtil.createServer(this.props.accountId, "Minecraft Server").then(serverInfo =>
        {
            if (!serverInfo)
            {
                return;
            }

            const servers = this.state.servers;

            servers.push(serverInfo);

            this.setState({ servers });
        });
    };

    deleteServer = (serverInfo: ServerInfo) =>
    {
        ServerUtil.deleteServer(serverInfo.serverId).then(success =>
        {
            if (!success)
            {
                return;
            }

            const servers = this.state.servers;

            const index = servers.indexOf(serverInfo);

            if (index >= 0)
            {
                servers.splice(index, 1);
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
