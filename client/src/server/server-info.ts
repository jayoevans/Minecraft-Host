import { ServerState } from "./server-state";

export interface ServerInfo
{
    serverId: string;
    serverName: string;
    serverState: ServerState;

    instanceId?: string;
}
