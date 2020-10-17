import express from "express";
import AWS from "aws-sdk";

const EC2: AWS.EC2 = new AWS.EC2({ apiVersion: "2016-11-15" });
export const router = express.Router();

AWS.config.update({ region: "ap-southeast-2" });

router.get("/server", (req: express.Request, res: express.Response) =>
{
    try
    {
        console.log(AWS.config);

        const params: AWS.EC2.RunInstancesRequest = {
            ImageId: "ami-0683b901c2de653c5", // Basic Docker
            InstanceType: "t2.micro",
            KeyName: "10413316_Jay_Evans",
            MinCount: 1,
            MaxCount: 1
        };

        EC2.runInstances(params).promise()
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

                EC2.createTags(tags).promise().then(data =>
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

        res.json({ name: "Name" });
    }
    catch (e)
    {
        console.error(e);
        // TODO Respond with error status
    }
});
