import mysql from "mysql";

const CREATE_TABLE: string = "CREATE TABLE servers (accountId CHAR(36) NOT NULL, serverId CHAR(36) NOT NULL, serverName VARCHAR(50) NOT NULL, INDEX accountIndex (accountId), UNIQUE INDEX serverIndex (serverId));";
const DROP_TABLE: string = "DROP TABLE servers";

const INSERT_SERVER: string = "INSERT INTO servers VALUES (?, ?, ?);";
const SELECT_SERVERS: string = "SELECT serverId, serverName FROM servers WHERE accountId = ?;";
const DELETE_SERVER: string = "DELETE FROM servers WHERE serverId = ?;";

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
        this.insertServer("dd578a4f-d35e-4fed-94db-9d5a627ff962", "c29b55aa-15e5-11eb-adc1-0242ac120002", "Survival Server");
        this.insertServer("dd578a4f-d35e-4fed-94db-9d5a627ff962", "d485d09c-15e5-11eb-adc1-0242ac120002", "Creative Server");
        this.insertServer("dd578a4f-d35e-4fed-94db-9d5a627ff962", "e5a2b2b4-15e5-11eb-adc1-0242ac120002", "Test Server");
    }

    public insertServer(accountId: string, serverId: string, serverName: string)
    {
        CONNECTION.query(INSERT_SERVER, [accountId, serverId, serverName], (err, results) =>
        {
            if (err) throw err;
        });
    }

    public async selectServers(accountId: string): Promise<{serverId: string, serverName: string}[]>
    {
        const data: any[] = await new Promise((resolve, reject) =>
        {
            CONNECTION.query(SELECT_SERVERS, [accountId], (err, results) =>
            {
                return err ? reject(err) : resolve(results);
            });
        });

        const servers: {serverId: string, serverName: string}[] = [];

        for (const result of data)
        {
            const serverId = result.serverId;
            const serverName = result.serverName;

            servers.push({ serverId, serverName });
        }

        return servers;
    }

    public deleteServer(serverId: string)
    {
        CONNECTION.query(DELETE_SERVER, [serverId], ((err, results) =>
        {
            if (err) throw err;
        }));
    }

    private createTable(): void
    {
        CONNECTION.query(CREATE_TABLE, err =>
        {
            if (err) throw err;

            console.log("Created table");
        });
    }

    private dropTable(): void
    {
        CONNECTION.query(DROP_TABLE, err =>
        {
            if (err) throw err;

            console.log("Dropped table");
        });
    }

}
