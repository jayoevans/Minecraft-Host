import { ServerInfo } from "./server-info";
import { ServerState } from "./server-state";

export class ServerUtil
{
    public static async startServer(serverInfo: ServerInfo): Promise<ServerState>
    {
        if (serverInfo.serverState !== ServerState.OFFLINE)
        {
            // Server must be offline to start
            return serverInfo.serverState;
        }

        const serverId = serverInfo.serverId;

        console.log(`Starting server ${serverId}...`);

        try
        {
            const request: RequestInit = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "serverId": serverInfo.serverId })
            };

            const response = await fetch("http://localhost:8000/server/start", request);

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

    public static stopServer(serverInfo: ServerInfo): ServerState
    {
        if (serverInfo.serverState !== ServerState.ONLINE)
        {
            // Server must be online to stop
            return serverInfo.serverState;
        }

        const instanceId = serverInfo.instanceId;

        // TODO Stop server
        console.log(`Stopping server ${instanceId}...`);

        // TODO Make requests to AWS to update state
        return serverInfo.serverState = ServerState.STOPPING;
    }
}
