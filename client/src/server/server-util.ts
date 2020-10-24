import { ServerInfo } from "./server-info";
import { ServerState } from "./server-state";

export class ServerUtil
{
    public static startServer(serverInfo: ServerInfo): ServerState
    {
        if (serverInfo.serverState !== ServerState.OFFLINE)
        {
            // Server must be offline to start
            return serverInfo.serverState;
        }

        const serverId = serverInfo.serverId;

        // TODO Create instance
        console.log(`Starting server ${serverId}...`);

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
