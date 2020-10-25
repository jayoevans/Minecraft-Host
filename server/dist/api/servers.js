"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servers = void 0;
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const user_data_1 = require("../aws/user-data");
const server_repository_1 = require("../sql/server-repository");
const uuid_random_1 = __importDefault(require("uuid-random"));
aws_sdk_1.default.config.update({ region: "ap-southeast-2" });
const EC2 = new aws_sdk_1.default.EC2({ apiVersion: "2016-11-15" });
const EBS = new aws_sdk_1.default.EBS({ apiVersion: "2019-11-02" });
exports.servers = express_1.default.Router();
const repository = new server_repository_1.ServerRepository();
exports.servers.get("/", (req, res) => {
    repository.init();
});
exports.servers.get("/:accountId", (req, res) => {
    try {
        const accountId = req.params.accountId;
        repository.selectServers(accountId).then(servers => {
            res.json({ servers });
        });
    }
    catch (e) {
        res.status(501);
    }
});
exports.servers.get("/status/:instanceId", (req, res) => {
    try {
        const instanceId = req.params.instanceId;
        const request = {
            InstanceIds: [instanceId]
        };
        EC2.describeInstanceStatus(request).promise()
            .then(data => {
            console.log(JSON.stringify(data));
            const statuses = data.InstanceStatuses;
            if (!statuses || statuses.length === 0) {
                return;
            }
            const instanceStatus = statuses[0].InstanceStatus;
            if (!instanceStatus) {
                return;
            }
            res.json({ status: instanceStatus.Status });
        })
            .catch(error => {
            console.error(error, error.stack);
        });
    }
    catch (e) {
        res.status(501);
    }
});
exports.servers.get("/host/:instanceId", (req, res) => {
    try {
        const instanceId = req.params.instanceId;
        const request = {
            InstanceIds: [instanceId]
        };
        EC2.describeInstances(request).promise()
            .then(data => {
            console.log(JSON.stringify(data));
            const reservations = data.Reservations;
            if (!reservations) {
                return;
            }
            const instances = reservations[0].Instances;
            if (!instances) {
                return;
            }
            const publicIp = instances[0].PublicIpAddress;
            res.json({ publicIp });
        })
            .catch(error => {
            console.error(error, error.stack);
        });
    }
    catch (e) {
        res.status(501);
    }
});
exports.servers.post("/create", (req, res) => {
    try {
        const accountId = req.body.accountId;
        const serverId = uuid_random_1.default();
        const serverName = req.body.serverName;
        repository.insertServer(accountId, serverId, serverName);
        res.json({ serverId });
    }
    catch (e) {
        res.status(500);
    }
});
exports.servers.post("/delete", (req, res) => {
    try {
        const serverId = req.body.serverId;
        repository.deleteServer(serverId);
        res.status(200);
    }
    catch (e) {
        res.status(500);
    }
});
exports.servers.post("/start", (req, res) => {
    try {
        const serverId = req.body.serverId;
        const params = {
            ImageId: "ami-0d7080d0911146a1b",
            InstanceType: "t2.micro",
            MinCount: 1,
            MaxCount: 1,
            SubnetId: "subnet-05a3b8177138c8b14",
            IamInstanceProfile: { Name: "ec2SSMCab432" },
            InstanceInitiatedShutdownBehavior: "terminate",
            UserData: user_data_1.UserData.get(serverId),
            TagSpecifications: [
                {
                    ResourceType: "instance",
                    Tags: [
                        {
                            Key: "qut-username",
                            Value: "10413316"
                        }
                    ]
                }
            ],
            SecurityGroupIds: ["sg-0bdc8d8e220c83e3c"]
        };
        EC2.runInstances(params).promise()
            .then(data => {
            console.log(JSON.stringify(data));
            if (!data.Instances) {
                res.send("Instance creation failed");
                console.log("No instances?");
                return;
            }
            const instanceId = data.Instances[0].InstanceId;
            res.json({ instanceId });
        })
            .catch(error => {
            console.error(error, error.stack);
        });
    }
    catch (e) {
        res.status(500);
    }
});
exports.servers.post("/stop", (req, res) => {
    try {
        const instanceId = req.body.instanceId;
    }
    catch (e) {
        res.status(501);
    }
});
//# sourceMappingURL=servers.js.map