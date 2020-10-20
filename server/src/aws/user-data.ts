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
            "echo \"Setting up artifact service...\"\n" +
            "git clone https://github.com/jayoevans/Artifact-Service.git\n" +
            "\n" +
            "cd Artifact-Service/artifacts\n" +
            "chmod +x ArtifactService.jar\n" +
            "\n" +
            "echo \"Downloading artifacts...\"\n" +
            "java -jar ArtifactService.jar /home/minecraft " + serverId + "\n" +
            "\n" +
            "cd /home/minecraft\n" +
            "rm -rf Artifact-Service\n" +
            "\n" +
            "echo \"Starting server...\"\n" +
            "cd /home/minecraft/server\n" +
            "sh start.sh";

        return toBase64(script);
    }
}
