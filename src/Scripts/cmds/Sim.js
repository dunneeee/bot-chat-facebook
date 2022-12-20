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
const Log_1 = require("../../../utils/Log");
const CmdAbstract_1 = require("../CmdAbstract");
const Command_1 = require("../models/Command");
const SimsimiTools_1 = require("../supportTools/SimsimiTools");
class Sim extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        const key1 = new Command_1.KeyHelp("on", "Bật sim", "sim on", "");
        const key2 = new Command_1.KeyHelp("off", "Tắt sim", "sim off", "");
        super(bot, scripts, new Log_1.Log("Sim"), new Command_1.Config("sim", 0, 10, bot.getOwn, "Chat cùng sim", [key1, key2]));
        this.listThread = [];
        this.listThread = [];
    }
    swichSim(status) {
        if (status && this.listThread.findIndex((t) => t == this.event.threadID) < 0) {
            this.listThread.push(this.event.threadID);
            return {
                status: 200,
                mess: "Bật sim thành công!",
            };
        }
        if (!status && this.listThread.findIndex((t) => t == this.event.threadID) >= 0) {
            this.listThread.splice(this.listThread.findIndex((t) => t == this.event.threadID), 1);
            return {
                status: 200,
                mess: "Tắt sim thành công!",
            };
        }
        return {
            status: 400,
            mess: status ? "Sim đã được bật!" : "Sim chưa được bật!",
        };
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = this.args[0];
            if (!status) {
                this.bot.send("Sim on/off", this.event.threadID, this.event.messageID);
                return;
            }
            switch (status.toLowerCase()) {
                case "on":
                case "bật":
                    const { status, mess } = this.swichSim(true);
                    this.bot.send(mess, this.event.threadID, this.event.messageID);
                    break;
                case "off":
                case "tắt":
                    const { mess: message } = this.swichSim(false);
                    this.bot.send(message, this.event.threadID, this.event.messageID);
                    break;
                default:
                    if (this.args.length) {
                        const text = this.args.join(" ");
                        const mess = yield SimsimiTools_1.SimTools.getMessage(text);
                        this.bot.send(mess, this.event.threadID, this.event.messageID);
                    }
                    break;
            }
        });
    }
    reply() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    reaction() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    every() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.listThread.findIndex((t) => t == this.event.threadID) >= 0) {
                const prefix = ((_b = (_a = this.db.findThread(this.event.threadID)) === null || _a === void 0 ? void 0 : _a.getSettings) === null || _b === void 0 ? void 0 : _b.getPrefix) || this.bot.getConfig.prefix;
                if (this.event.body && !this.event.body.startsWith(prefix)) {
                    const mess = yield SimsimiTools_1.SimTools.getMessage(this.event.body);
                    if (mess) {
                        this.bot.send(mess, this.event.threadID, this.event.messageID);
                    }
                }
            }
        });
    }
}
exports.default = Sim;
