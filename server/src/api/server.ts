import express from "express";
import AWS from "aws-sdk";

AWS.config.update({ region: "ap-southeast-2" });

const EC2: AWS.EC2 = new AWS.EC2({ apiVersion: "2016-11-15" });
export const server = express.Router();

server.get("/create", (req: express.Request, res: express.Response) =>
{
    try
    {

    }
    catch (e)
    {
        console.error(e);
    }
});

server.get("/start", (req: express.Request, res: express.Response) =>
{
    try
    {

    }
    catch (e)
    {
        console.error(e);
    }
});

server.get("/attach/:instanceId/:volumeId", (req: express.Request, res: express.Response) =>
{
    try
    {

    }
    catch (e)
    {
        console.error(e);
    }
});

server.get("/", (req: express.Request, res: express.Response) =>
{
    try
    {
        // TODO Enable auto-assign public IP
        // NetworkInterface.AssociatePublicIpAddress: true

        const params: AWS.EC2.RunInstancesRequest = {
            ImageId: "ami-099c1869f33464fde",
            InstanceType: "t2.micro",
            MinCount: 1,
            MaxCount: 1,
            SubnetId: "subnet-05a3b8177138c8b14",
            IamInstanceProfile: { Name: "ec2SSMCab432" },
            InstanceInitiatedShutdownBehavior: "terminate",
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
            SecurityGroupIds: [ "sg-0df7690dc45862598", "sg-032bd1ff8cf77dbb9" ]
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

                res.send(instanceId);
            })
            .catch(error =>
            {
                console.error(error, error.stack);
            });
    }
    catch (e)
    {
        console.error(e);
        // TODO Respond with error status
    }
});

server.get("/:instanceId", (req, res) =>
{
    try
    {
        const instanceId = req.params.instanceId;

        EC2.describeInstances({ InstanceIds: [ instanceId ] }).promise().then(data =>
        {
            console.log(JSON.stringify(data));

            const reservation = data.Reservations![0];
            const instance = reservation.Instances![0];

            res.send("Public IP: " + instance.PublicIpAddress);

        })
            .catch(error =>
            {
                console.error(error, error.stack);
            });
    }
    catch (e)
    {
        console.error(e);
        // TODO Respond with error status
    }
});

/*
    AWS Instance Settings

    Amazon Machine Image (AMI): Ubuntu Server 18.04 LTS (HVM), SSD Volume Type - ami-099c1869f33464fde (64-bit x86) / ami-0971b2428675822ee (64-bit Arm) (Ubuntu 18.04, 64-bit x86)
    Instance Type: t2.micro
    Subnet: subnet-05a3b8177138c8b14 | aws-controltower-PublicSubnet1 | ap-southeast-2a
            subnet-075811427d5564cf9 | aws-controltower-PublicSubnet2 | ap-southeast-2b
            subnet-04ca053dcbe5f49cc | aws-controltower-PublicSubnet3 | ap-southeast-2c
    Auto-assign Public IP: Enable
    IAM role: es2SSMCab432
    Shutdown behaviour: Terminate
    Storage: Root	/dev/sda1	snap-04ff718b546255b96	8 General Purpose SSD (gp2) 100 / 3000	N/A	Not Encrypted
    Tags: qut-username 10413316 (Instances: true, Volumes: true)
    Security Group: sg-0df7690dc45862598, sg-032bd1ff8cf77dbb9
    Launch without key pair
 */
