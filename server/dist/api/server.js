"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const user_data_1 = require("../aws/user-data");
const server_repository_1 = require("../sql/server-repository");
aws_sdk_1.default.config.update({ region: "ap-southeast-2" });
const EC2 = new aws_sdk_1.default.EC2({ apiVersion: "2016-11-15" });
const EBS = new aws_sdk_1.default.EBS({ apiVersion: "2019-11-02" });
exports.server = express_1.default.Router();
exports.server.get("/create", (req, res) => {
    try {
        const params = {
            VolumeType: "gp2",
            SnapshotId: "",
            AvailabilityZone: "ap-southeast-2a",
            TagSpecifications: [
                {
                    ResourceType: "volume",
                    Tags: [
                        {
                            Key: "qut-username",
                            Value: "10413316"
                        }
                    ]
                }
            ]
        };
        EC2.createVolume(params).promise().then(data => {
            res.json(data);
        })
            .catch(error => {
            console.error(error, error.stack);
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.server.post("/start", (req, res) => {
    try {
        const serverId = req.body.serverId;
        const params = {
            ImageId: "ami-047267d2d91b1fe81",
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
        console.error(e);
    }
});
exports.server.get("/attach/:instanceId/:volumeId", (req, res) => {
    try {
        const instanceId = req.params.instanceId;
        const volumeId = req.params.volumeId;
        const params = {
            Device: "/dev/sdg",
            InstanceId: instanceId,
            VolumeId: volumeId
        };
        EC2.attachVolume(params).promise()
            .then(data => {
            res.json(data);
        })
            .catch(error => {
            console.error(error, error.stack);
        });
    }
    catch (e) {
        console.error(e);
    }
});
exports.server.get("/", (req, res) => {
    try {
        new server_repository_1.ServerRepository();
    }
    catch (e) {
        console.error(e);
    }
});
exports.server.get("/:instanceId", (req, res) => {
    try {
        const instanceId = req.params.instanceId;
        EC2.describeInstances({ InstanceIds: [instanceId] }).promise().then(data => {
            console.log(JSON.stringify(data));
            const reservation = data.Reservations[0];
            const instance = reservation.Instances[0];
            res.send("Public IP: " + instance.PublicIpAddress);
        })
            .catch(error => {
            console.error(error, error.stack);
        });
    }
    catch (e) {
        console.error(e);
    }
});
//# sourceMappingURL=servers.js.map
