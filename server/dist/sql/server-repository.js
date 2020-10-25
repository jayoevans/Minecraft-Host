"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRepository = void 0;
const mysql_1 = __importDefault(require("mysql"));
const CREATE_TABLE = "CREATE TABLE servers (accountId CHAR(36) NOT NULL, serverId CHAR(36) NOT NULL, serverName VARCHAR(50) NOT NULL, instanceId VARCHAR(50), INDEX accountIndex (accountId), UNIQUE INDEX serverIndex (serverId));";
const DROP_TABLE = "DROP TABLE servers";
const SELECT_SERVERS = "SELECT serverId, serverName, instanceId FROM servers WHERE accountId = ?;";
const INSERT_SERVER = "INSERT INTO servers (accountId, serverId, serverName) VALUES (?, ?, ?);";
const DELETE_SERVER = "DELETE FROM servers WHERE serverId = ?;";
const UPDATE_INSTANCE = "UPDATE servers SET instanceId = ? WHERE serverId = ?;";
const CONNECTION = mysql_1.default.createConnection({
    host: "n10413316-assignment2.ce2haupt2cta.ap-southeast-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "6CPmrU9t7UrRVWbN",
    database: "minecraft_servers"
});
class ServerRepository {
    init() {
        this.selectServers("dd578a4f-d35e-4fed-94db-9d5a627ff962").then(servers => {
            console.log(servers);
        });
    }
    updateInstance(serverId, instanceId) {
        CONNECTION.query(UPDATE_INSTANCE, [instanceId, serverId]);
    }
    selectServers(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield new Promise((resolve, reject) => {
                CONNECTION.query(SELECT_SERVERS, [accountId], (err, results) => {
                    return err ? reject(err) : resolve(results);
                });
            });
            const servers = [];
            for (const result of data) {
                const serverId = result.serverId;
                const serverName = result.serverName;
                const instanceId = result.instanceId;
                servers.push({ serverId, serverName, instanceId });
            }
            return servers;
        });
    }
    insertServer(accountId, serverId, serverName) {
        CONNECTION.query(INSERT_SERVER, [accountId, serverId, serverName]);
    }
    deleteServer(serverId) {
        CONNECTION.query(DELETE_SERVER, [serverId]);
    }
    createTable() {
        CONNECTION.query(CREATE_TABLE, err => {
            if (err)
                throw err;
            console.log("Created table");
        });
    }
    dropTable() {
        CONNECTION.query(DROP_TABLE, err => {
            if (err)
                throw err;
            console.log("Dropped table");
        });
    }
}
exports.ServerRepository = ServerRepository;
//# sourceMappingURL=server-repository.js.map