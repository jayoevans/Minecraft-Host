import React from "react";
import { Server } from "./server";
import { ServerInfo } from "../../server/server-info";
import { ServerState } from "../../server/server-state";

const SERVERS = new Map<string, ServerInfo[]>();

SERVERS.set("dd578a4f-d35e-4fed-94db-9d5a627ff962",
    [
        {
            // Generated Server UUID
            serverId: "c29b55aa-15e5-11eb-adc1-0242ac120002",
            serverName: "Survival Server",
            serverState: ServerState.OFFLINE
        },
        {
            // Generated Server UUID
            serverId: "d485d09c-15e5-11eb-adc1-0242ac120002",
            serverName: "Creative Server",
            serverState: ServerState.OFFLINE
        },
        {
            // Generated Server UUID
            serverId: "e5a2b2b4-15e5-11eb-adc1-0242ac120002",
            serverName: "New Server",
            serverState: ServerState.OFFLINE
        }
    ]
);

export class ServerList extends React.Component<Props, State>
{
    constructor(props: Props)
    {
        super(props);
    }

    render()
    {
        console.log(SERVERS);

        const servers: ServerInfo[] = SERVERS.get(this.props.accountId) || [];

        console.log(JSON.stringify(servers));

        const items: JSX.Element[] = [];

        for (const serverInfo of servers)
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
}

interface Props
{
    accountId: string;
}

interface State
{

}
