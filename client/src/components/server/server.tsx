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
            serverState: props.serverInfo.instanceId ? ServerState.STARTING : ServerState.OFFLINE
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

    async componentDidMount()
    {
        if (this.props.serverInfo.instanceId)
        {
            await this.waitForIp().then(() => {});
        }
    }

    private getElement(): JSX.Element
    {
        switch (this.state.serverState)
        {
            case ServerState.ONLINE:
                return (
                    <div>
                        <button onClick = { this.stopServer }>Stop</button>
                        <p>IP: { this.state.publicIp }</p>
                    </div>
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
                    <div>
                        <button onClick = { this.startServer }>Start</button>
                        <button onClick = { this.deleteServer }>Delete Server</button>
                    </div>
                );
            default:
                return (
                    <p>Error</p>
                );
        }
    }

    startServer = (event: React.FormEvent) =>
    {
        this.setState({ serverState: ServerState.STARTING });

        ServerUtil.startServer(this.props.serverInfo).then(async instanceId =>
        {
            console.log(`Starting server ${ this.props.serverInfo.serverId }...`);
            console.log(`instanceId ${instanceId}`);

            await this.waitForIp();
        });
    };

    waitForIp = async () =>
    {
        while (!this.state.publicIp)
        {
            ServerUtil.getServerStatus(this.props.serverInfo).then(status =>
            {
                if (status !== "ok")
                {
                    return;
                }

                ServerUtil.getPublicIp(this.props.serverInfo).then(publicIp =>
                {
                    this.setState({ serverState: ServerState.ONLINE, publicIp: publicIp! });
                });
            });

            await this.sleep(10000);
        }
    };

    private sleep(ms: number)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    stopServer = (event: React.FormEvent) =>
    {
        this.setState({ serverState: ServerState.STOPPING });

        ServerUtil.stopServer(this.props.serverInfo).then(() =>
        {
            console.log(`Stopping server ${ this.props.serverInfo.serverId }...`);
            this.setState({ serverState: ServerState.OFFLINE });
        });
    };

    deleteServer = (event: React.FormEvent) =>
    {
        this.props.deleteServer(this.props.serverInfo);
    };
}

interface Props
{
    serverInfo: ServerInfo;
    deleteServer: (serverInfo: ServerInfo) => void;
}

interface State
{
    serverState: ServerState;
    publicIp?: string;
}
