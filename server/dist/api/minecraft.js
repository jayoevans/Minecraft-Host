"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const js_base64_1 = __importDefault(require("js-base64"));
exports.minecraft = express_1.default.Router();
class User {
}
exports.minecraft.get("/status", (req, res) => {
    axios_1.default
        .get("https://status.mojang.com/check")
        .then(function (response) {
        res.json(response.data);
    })
        .catch(function (error) {
        console.log(error);
    });
});
exports.minecraft.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.params.id;
    let currentTime = Date.now();
    let newUser = new User();
    let errorCheck = false;
    let URL = `https://api.mojang.com/users/profiles/minecraft/${query}?at=${currentTime}`;
    yield axios_1.default
        .get(URL)
        .then(function (response) {
        if (response.data) {
            newUser.username = response.data.name;
            newUser.uuid = response.data.id;
        }
        else {
            res.json({ Error: "Doesn't exist" });
            errorCheck = true;
        }
    })
        .catch(function (error) {
        console.log(error);
        res.json({ Error: "Something went wrong" });
        errorCheck = true;
    });
    if (!errorCheck) {
        newUser.skin = yield getSkin(newUser.uuid);
        newUser.previousUserNames = yield getUsernames(newUser.uuid);
        res.json(JSON.parse(JSON.stringify(newUser)));
        console.log(newUser.username);
        console.log(newUser.uuid);
        console.log(newUser.skin);
        console.log(newUser.previousUserNames);
    }
}));
function getSkin(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        let URL = `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`;
        let skin = "";
        yield axios_1.default
            .get(URL)
            .then(function (response) {
            let test = response.data.properties[0].value;
            let skinTexture = JSON.parse(js_base64_1.default.decode(test));
            console.log(skinTexture);
            skin = skinTexture.textures.SKIN.url;
        })
            .catch(function (error) {
            console.log(error);
        });
        return skin;
    });
}
function getUsernames(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        let URL = `https://api.mojang.com/user/profiles/${uuid}/names`;
        let names = "";
        yield axios_1.default
            .get(URL)
            .then(function (response) {
            names = response.data;
        })
            .catch(function (error) {
            console.log(error);
        });
        return names;
    });
}
//# sourceMappingURL=minecraft.js.map