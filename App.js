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
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("./src/bot/Bot");
const path_1 = require("path");
const Log_1 = require("./utils/Log");
const Config_1 = require("./src/bot/Config");
const fs = require("fs");
const http = require("http");
class App {
    getConfig() {
        try {
            const config = fs.readFileSync(this.pathConfig, "utf-8");
            this.log.log((c, h) => h.success + c.green("load thành công file config.json"));
            return JSON.parse(config);
        }
        catch (e) {
            if (e.code == "ENOENT") {
                this.log.log((c, h) => h.error + c.magenta(`Không có file config tiến hành tạo và config mặc định!`));
                const defaultConfig = {
                    adminID: "",
                    devMode: false,
                    icon: "( *ˊᵕˋ)",
                    line: "――",
                    name: "DunnBot",
                    pageHelp: 5,
                    prefix: "!",
                };
                fs.writeFileSync(this.pathConfig, JSON.stringify(defaultConfig, null, 4), "utf-8");
                return defaultConfig;
            }
            else {
                throw new Error(e);
            }
        }
    }
    constructor() {
        this.pathConfig = (0, path_1.join)(__dirname, "./config.json");
        this.log = new Log_1.Log("App");
        const botConfig = new Config_1.Config(this.getConfig());
        this.bot = new Bot_1.Bot((0, path_1.join)(__dirname, "./appState.json"), botConfig);
    }
    backend() {
        http
            .createServer((req, res) => {
            res.write("Hello DunnBot!");
            res.end();
        })
            .listen(3000);
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.handle = yield this.bot.init();
                this.bot.setOption({
                    autoMarkDelivery: true,
                    forceLogin: true,
                    listenEvents: true,
                    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                });
                this.handle.onListen();
                this.backend();
            }
            catch (e) {
                this.log.nLog(e);
                this.log.log((c, h) => h.error + " có lỗi không mong muốn: " + e.message);
            }
        });
    }
}
const ap = new App();
ap.start();
// ap.test();
