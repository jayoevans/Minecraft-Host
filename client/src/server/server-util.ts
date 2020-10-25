import { ServerInfo } from "./server-info";
import { ServerState } from "./server-state";

export class ServerUtil
{
    public static async getPublicIp(serverInfo: ServerInfo): Promise<string | undefined>
    {
        const instanceId = serverInfo.instanceId;

        if (!instanceId)
        {
            return undefined;
        }

        const response = await fetch(`http://localhost:8000/servers/host/${instanceId}`);

        const data = await response.json();

        return data.publicIp;
    }

    public static async getServerStatus(serverInfo: ServerInfo): Promise<string | undefined>
    {
        const instanceId = serverInfo.instanceId;

        if (!instanceId)
        {
            return undefined;
        }

        const response = await fetch(`http://localhost:8000/servers/status/${instanceId}`);

        const data = await response.json();

        return data.status;
    }

    public static async startServer(serverInfo: ServerInfo): Promise<ServerState>
    {
        if (serverInfo.serverState !== ServerState.OFFLINE)
        {
            // Server must be offline to start
            return serverInfo.serverState;
        }

        const serverId = serverInfo.serverId;

        try
        {
            const request: RequestInit = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ serverId })
            };

            const response = await fetch("http://localhost:8000/servers/start", request);

            const data = await response.json();

            console.log("status code: " + response.status);
            console.log("data: " + JSON.stringify(data));

            serverInfo.instanceId = data.instanceId;
        }
        catch (e)
        {
            console.error(e, e.stack);
        }

        // TODO Make requests to AWS to update state
        return serverInfo.serverState = ServerState.STARTING;
    }

    public static async stopServer(serverInfo: ServerInfo): Promise<ServerState>
    {
        if (serverInfo.serverState !== ServerState.ONLINE)
        {
            // Server must be online to stop
            return serverInfo.serverState;
        }

        const instanceId = serverInfo.instanceId;

        // TODO Stop servers

        try
        {
            const request: RequestInit = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ instanceId })
            };

            const response = await fetch("http://localhost:8000/servers/stop", request);

            const data = await response.json();

            console.log("status code: " + response.status);
            console.log("data: " + JSON.stringify(data));

            serverInfo.instanceId = data.instanceId;
        }
        catch (e)
        {
            console.error(e, e.stack);
        }

        // TODO Make requests to AWS to update state
        return serverInfo.serverState = ServerState.STOPPING;
    }
}
