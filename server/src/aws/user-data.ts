import { toBase64 } from "js-base64";

export namespace UserData
{
    export function get(serverId: string): string
    {
        const script = "#!/bin/bash\n" +
            "\n" +
            "InstanceId = $(curl -s http://169.254.169.254/latest/meta-data/instance-id)\n" +
            "\n" +
            "mkdir /home/minecraft\n" +
            "cd /home/minecraft\n" +
            "\n" +
            "echo \"Setting up storage...\"\n" +
            "git clone https://github.com/jayoevans/Minecraft-Storage.git\n" +
            "\n" +
            "cd Minecraft-Storage/dist\n" +
            "chmod +x Storage-Reader.jar\n" +
            "\n" +
            "echo \"Downloading resources...\"\n" +
            "java -jar Storage-Reader.jar /home/minecraft " + serverId + "\n" +
            "\n" +
            "echo \"Starting server...\"\n" +
            "cd /home/minecraft/server\n" +
            "sh start.sh" +
            "\n" +
            "cd /home/minecraft/Minecraft-Storage/dist\n" +
            "chmod +x Storage-Writer.jar\n" +
            "\n" +
            "echo \"Saving server...\"\n" +
            "java -jar Storage-Writer.jar /home/minecraft " + serverId + "\n" +
            "\n" +
            "aws ec2 terminate-instances --instance-ids \"$InstanceId\"";

        return toBase64(script);
    }
}
