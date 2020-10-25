import mysql from "mysql";
import { ServerInfo } from "../server/server-info";

const CREATE_TABLE: string = "CREATE TABLE servers (accountId CHAR(36) NOT NULL, serverId CHAR(36) NOT NULL, serverName VARCHAR(50) NOT NULL, instanceId VARCHAR(50), INDEX accountIndex (accountId), UNIQUE INDEX serverIndex (serverId));";
const DROP_TABLE: string = "DROP TABLE servers";

const SELECT_SERVERS: string = "SELECT serverId, serverName, instanceId FROM servers WHERE accountId = ?;";

const INSERT_SERVER: string = "INSERT INTO servers (accountId, serverId, serverName) VALUES (?, ?, ?);";
const DELETE_SERVER: string = "DELETE FROM servers WHERE serverId = ?;";

const UPDATE_INSTANCE: string = "UPDATE servers SET instanceId = ? WHERE serverId = ?;";

const CONNECTION = mysql.createConnection({
    host: "n10413316-assignment2.ce2haupt2cta.ap-southeast-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "6CPmrU9t7UrRVWbN",
    database: "minecraft_servers"
});

export class ServerRepository
{
    public init()
    {
        this.selectServers("dd578a4f-d35e-4fed-94db-9d5a627ff962").then(servers =>
        {
            console.log(servers);
        });
    }

    public updateInstance(serverId: string, instanceId: string | null)
    {
        CONNECTION.query(UPDATE_INSTANCE, [instanceId, serverId]);
    }

    public async selectServers(accountId: string): Promise<ServerInfo[]>
    {
        const data: any[] = await new Promise((resolve, reject) =>
        {
            CONNECTION.query(SELECT_SERVERS, [accountId], (err, results) =>
            {
                return err ? reject(err) : resolve(results);
            });
        });

        const servers: ServerInfo[] = [];

        for (const result of data)
        {
            const serverId = result.serverId;
            const serverName = result.serverName;
            const instanceId = result.instanceId;

            servers.push({ serverId, serverName, instanceId });
        }

        return servers;
    }

    public insertServer(accountId: string, serverId: string, serverName: string)
    {
        CONNECTION.query(INSERT_SERVER, [accountId, serverId, serverName]);
    }

    public deleteServer(serverId: string)
    {
        CONNECTION.query(DELETE_SERVER, [serverId]);
    }

    createTable(): void
    {
        CONNECTION.query(CREATE_TABLE, err =>
        {
            if (err) throw err;

            console.log("Created table");
        });
    }

    dropTable(): void
    {
        CONNECTION.query(DROP_TABLE, err =>
        {
            if (err) throw err;

            console.log("Dropped table");
        });
    }
}

// const repo = new ServerRepository();
// repo.dropTable();
// repo.createTable();
