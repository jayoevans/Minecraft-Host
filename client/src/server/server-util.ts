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

    public static async startServer(serverInfo: ServerInfo): Promise<string | undefined>
    {
        if (serverInfo.serverState !== ServerState.OFFLINE)
        {
            // Server must be offline to start
            return undefined;
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

            return serverInfo.instanceId = data.instanceId;
        }
        catch (e)
        {
            console.error(e, e.stack);
            return undefined;
        }

        // TODO Make requests to AWS to update state
    }

    public static async stopServer(serverInfo: ServerInfo): Promise<void>
    {
        if (serverInfo.serverState !== ServerState.ONLINE)
        {
            // Server must be online to stop
            return;
        }

        const serverId = serverInfo.serverId;
        const instanceId = serverInfo.instanceId;

        // TODO Stop servers

        try
        {
            const request: RequestInit = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ serverId, instanceId })
            };

            const response = await fetch("http://localhost:8000/servers/stop", request);

            const data = await response.json();

            console.log("status code: " + response.status);
            console.log("data: " + JSON.stringify(data));

            serverInfo.instanceId = undefined;
        }
        catch (e)
        {
            console.error(e, e.stack);
        }
    }
}
