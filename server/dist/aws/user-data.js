"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const js_base64_1 = require("js-base64");
var UserData;
(function (UserData) {
    function get(serverId) {
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
        return js_base64_1.toBase64(script);
    }
    UserData.get = get;
})(UserData = exports.UserData || (exports.UserData = {}));
//# sourceMappingURL=user-data.js.map