import { toBase64 } from "js-base64";

export namespace UserData
{
    export function get(serverId: string): string
    {
        const script = "#!/bin/bash\n" +
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
            "cd /home/minecraft\n" +
            "rm -rf Minecraft-Storage\n" +
            "\n" +
            "echo \"Starting server...\"\n" +
            "cd /home/minecraft/server\n" +
            "sh start.sh";

        return toBase64(script);
    }
}
