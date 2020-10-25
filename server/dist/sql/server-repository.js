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
const CREATE_TABLE = "CREATE TABLE servers (accountId CHAR(36) NOT NULL, serverId CHAR(36) NOT NULL, serverName VARCHAR(50) NOT NULL, INDEX accountIndex (accountId), UNIQUE INDEX serverIndex (serverId));";
const DROP_TABLE = "DROP TABLE servers";
const INSERT_SERVER = "INSERT INTO servers VALUES (?, ?, ?);";
const SELECT_SERVERS = "SELECT serverId, serverName FROM servers WHERE accountId = ?;";
const DELETE_SERVER = "DELETE FROM servers WHERE serverId = ?;";
const CONNECTION = mysql_1.default.createConnection({
    host: "n10413316-assignment2.ce2haupt2cta.ap-southeast-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "6CPmrU9t7UrRVWbN",
    database: "minecraft_servers"
});
class ServerRepository {
    init() {
        this.insertServer("dd578a4f-d35e-4fed-94db-9d5a627ff962", "c29b55aa-15e5-11eb-adc1-0242ac120002", "Survival Server");
        this.insertServer("dd578a4f-d35e-4fed-94db-9d5a627ff962", "d485d09c-15e5-11eb-adc1-0242ac120002", "Creative Server");
        this.insertServer("dd578a4f-d35e-4fed-94db-9d5a627ff962", "e5a2b2b4-15e5-11eb-adc1-0242ac120002", "Test Server");
    }
    insertServer(accountId, serverId, serverName) {
        CONNECTION.query(INSERT_SERVER, [accountId, serverId, serverName], (err, results) => {
            if (err)
                throw err;
        });
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
                servers.push({ serverId, serverName });
            }
            return servers;
        });
    }
    deleteServer(serverId) {
        CONNECTION.query(DELETE_SERVER, [serverId], ((err, results) => {
            if (err)
                throw err;
        }));
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