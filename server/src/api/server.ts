import express from "express";
import AWS from "aws-sdk";

AWS.config.update({ region: "ap-southeast-2" });

export class Server
{
    public router = express.Router();
    private ec2: AWS.EC2 = new AWS.EC2({ apiVersion: "2016-11-15" });

    public start(): Server
    {
        this.router.post("/server", (req: express.Request, res: express.Response) =>
        {
            try
            {
                const params: AWS.EC2.RunInstancesRequest = {
                    ImageId: "ami-0683b901c2de653c5", // Basic Docker
                    InstanceType: "t2.micro",
                    KeyName: "10413316_Jay_Evans",
                    MinCount: 1,
                    MaxCount: 1
                };

                this.ec2.runInstances(params).promise()
                    .then(data =>
                {
                    console.log("data: " + data);

                    if (!data.Instances)
                    {
                        console.log("No instances?");
                        return;
                    }

                    const instanceId = data.Instances[0].InstanceId!;

                    const tags: AWS.EC2.CreateTagsRequest = {
                        Resources: [instanceId],
                        Tags: [
                            {
                                Key: "qut-username",
                                Value: "10413316"
                            }
                        ]
                    };

                    this.ec2.createTags(tags).promise().then(data =>
                    {
                        console.log("data: " + data);
                        console.log("Tagged instance");
                    })
                        .catch(error =>
                    {
                        console.error(error, error.stack);
                    });

                    console.log("Instance created");
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

        return this;
    }
}