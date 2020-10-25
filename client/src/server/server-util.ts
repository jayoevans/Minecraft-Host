import { ServerInfo } from "./server-info";

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
        const serverName = serverInfo.serverName;
        const serverId = serverInfo.serverId;

        try
        {
            const request: RequestInit = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ serverName, serverId })
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
    }

    public static async stopServer(serverInfo: ServerInfo): Promise<void>
    {
        const serverId = serverInfo.serverId;
        const instanceId = serverInfo.instanceId;

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

    public static async createServer(accountId: string, serverName: string): Promise<ServerInfo | undefined>
    {
        try
        {
            const request: RequestInit = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accountId, serverName })
            };

            console.log("request: " + JSON.stringify(request));

            const response = await fetch("http://localhost:8000/servers/create", request);

            const data = await response.json();

            const serverId = data.serverId;

            return { serverId, serverName };
        }
        catch (e)
        {
            console.error(e, e.stack);
            return undefined;
        }
    }

    public static async deleteServer(serverId: string): Promise<boolean>
    {
        try
        {
            const request: RequestInit = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ serverId })
            };

            const response = await fetch("http://localhost:8000/servers/delete", request);

            const data = await response.json();

            return data.deleted;
        }
        catch (e)
        {
            console.error(e, e.stack);
            return false;
        }
    }
}
