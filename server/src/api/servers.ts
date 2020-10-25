import express from "express";
import AWS from "aws-sdk";
import { UserData } from "../aws/user-data";
import { ServerRepository } from "../sql/server-repository";
import uuid from "uuid-random";

AWS.config.update({ region: "ap-southeast-2" });

const EC2: AWS.EC2 = new AWS.EC2({ apiVersion: "2016-11-15" });
const EBS: AWS.EBS = new AWS.EBS({ apiVersion: "2019-11-02" });

export const servers = express.Router();
const repository = new ServerRepository();

servers.get("/", (req, res) =>
{
    repository.init();
});

servers.get("/:accountId", (req: express.Request, res: express.Response) =>
{
    try
    {
        const accountId = req.params.accountId;

        repository.selectServers(accountId).then(servers =>
        {
            res.json({ servers });
        });
    }
    catch (e)
    {
        res.status(501);
    }
});

servers.get("/status/:instanceId", (req: express.Request, res: express.Response) =>
{
    try
    {
        // TODO Get instance status

        const instanceId = req.params.instanceId;

        const request: AWS.EC2.DescribeInstanceStatusRequest = {
            InstanceIds: [ instanceId ]
        };

        EC2.describeInstanceStatus(request).promise()
            .then(data =>
            {
                console.log(JSON.stringify(data));

                const statuses = data.InstanceStatuses;

                if (!statuses || statuses.length === 0)
                {
                    return;
                }

                const instanceStatus = statuses[0].InstanceStatus;

                if (!instanceStatus)
                {
                    return;
                }

                res.json({ status: instanceStatus.Status });
            })
            .catch(error =>
            {
                console.error(error, error.stack);
            });
    }
    catch (e)
    {
        res.status(501);
    }
});

servers.get("/host/:instanceId", (req: express.Request, res: express.Response) =>
{
    try
    {
        const instanceId = req.params.instanceId;

        const request: AWS.EC2.DescribeInstancesRequest = {
            InstanceIds: [ instanceId ]
        };

        EC2.describeInstances(request).promise()
            .then(data =>
            {
                console.log(JSON.stringify(data));

                const reservations = data.Reservations;

                if (!reservations)
                {
                    return;
                }

                const instances = reservations[0].Instances;

                if (!instances)
                {
                    return;
                }

                const publicIp = instances[0].PublicIpAddress;

                res.json({ publicIp });
            })
            .catch(error =>
            {
                console.error(error, error.stack);
            });
    }
    catch (e)
    {
        res.status(501);
    }
});

servers.post("/create", (req: express.Request, res: express.Response) =>
{
    try
    {
        const accountId = req.body.accountId;
        const serverId = uuid();
        const serverName = req.body.serverName;

        repository.insertServer(accountId, serverId, serverName);

        res.json({ serverId });
    }
    catch (e)
    {
        res.status(500);
    }
});

servers.post("/delete", (req: express.Request, res: express.Response) =>
{
    try
    {
        const serverId = req.body.serverId;

        repository.deleteServer(serverId);

        res.status(200);
    }
    catch (e)
    {
        res.status(500);
    }
});

servers.post("/start", (req: express.Request, res: express.Response) =>
{
    try
    {
        const serverId = req.body.serverId;

        const params: AWS.EC2.RunInstancesRequest = {
            ImageId: "ami-0d7080d0911146a1b", // ami-047267d2d91b1fe81 (JUST JAVA)
            InstanceType: "t2.micro",
            MinCount: 1,
            MaxCount: 1,
            SubnetId: "subnet-05a3b8177138c8b14",
            IamInstanceProfile: { Name: "ec2SSMCab432" },
            InstanceInitiatedShutdownBehavior: "terminate",
            UserData: UserData.get(serverId),
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
            SecurityGroupIds: [ "sg-0bdc8d8e220c83e3c" ]
        };

        EC2.runInstances(params).promise()
            .then(data =>
            {
                console.log(JSON.stringify(data));

                if (!data.Instances)
                {
                    res.send("Instance creation failed");
                    console.log("No instances?");
                    return;
                }

                const instanceId = data.Instances[0].InstanceId!;

                res.json({ instanceId });
            })
            .catch(error =>
            {
                console.error(error, error.stack);
            });
    }
    catch (e)
    {
        res.status(500);
    }
});

servers.post("/stop", (req: express.Request, res: express.Response) =>
{
    try
    {
        const instanceId = req.body.instanceId;
        // TODO Stop server
    }
    catch (e)
    {
        res.status(501);
    }
});
