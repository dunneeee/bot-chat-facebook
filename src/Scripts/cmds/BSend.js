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
const Tools_1 = require("../../../utils/Tools");
const CmdAbstract_1 = require("../CmdAbstract");
const Command_1 = require("../models/Command");
class DataSend {
    constructor(arr) {
        this.timeDelete = 180;
        this.list = arr || [];
        this.stopTime = setInterval(() => {
            this.list = [];
        }, this.timeDelete * 60 * 1000);
    }
    add(mess) {
        this.list.push(mess);
    }
    remove(messageID) {
        const index = this.list.findIndex((i) => i.messageID == messageID);
        if (index >= 0) {
            this.list.splice(index, 1);
        }
    }
    get(messageID) {
        return this.list.find((i) => i.messageID == messageID);
    }
    stopReset() {
        clearInterval(this.stopTime);
    }
}
class BSend extends CmdAbstract_1.CmdAbstract {
    constructor(b, s) {
        const keyOn = new Command_1.KeyHelp("on", "Bật tính năng", "bsend on", "");
        const keyOff = new Command_1.KeyHelp("off", "Tắt tính năng", "bsend off", "");
        super(b, s, new Log_1.Log("Bsend"), new Command_1.Config("bsend", 1, 5, b.getOwn, "Gửi lại tin nhắn bị gỡ", [keyOn, keyOff]));
        this.data = new Map();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.args[0] || "";
            const config = this.db.findThreadConfig(this.event.threadID);
            switch (key.toLowerCase()) {
                case "on":
                case "bật":
                    if (!this.data.has(this.event.threadID)) {
                        this.data.set(this.event.threadID, new DataSend());
                        this.bot.send(`Bật bsend thành công!`, this.event.threadID, this.event.messageID);
                        config.setBSend = true;
                        this.db.saveThreadConfig();
                    }
                    else {
                        this.bot.send(`Bsend đã được bật trên nhóm này!`, this.event.threadID, this.event.messageID);
                    }
                    break;
                case "off":
                case "tắt":
                    if (this.data.has(this.event.threadID)) {
                        this.data.get(this.event.threadID).stopReset();
                        this.data.delete(this.event.threadID);
                        this.bot.send(`Tắt thành công bsend`, this.event.threadID, this.event.messageID);
                        config.setBSend = false;
                        this.db.saveThreadConfig();
                    }
                    else {
                        this.bot.send(`Bsend chưa được bật!`, this.event.threadID, this.event.messageID);
                    }
                    break;
                default:
                    this.bot.send(`bsend on/off`, this.event.threadID, this.event.messageID);
                    break;
            }
        });
    }
    reaction() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    reply() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    every() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.data.has(this.event.threadID)) {
                const data = this.data.get(this.event.threadID);
                if (this.event.type == "message_unsend") {
                    const message = data.get(this.event.messageID);
                    if (message) {
                        const msg = message.body;
                        const attachment = [];
                        for (let item of message.attachments) {
                            attachment.push(yield Tools_1.Tools.fileStream(item.url, item.original_extension));
                        }
                        this.bot.send({
                            body: msg,
                            attachment,
                        }, this.event.threadID, message.messageID);
                    }
                    return;
                }
                else {
                    data.add(this.event);
                }
            }
        });
    }
    auto() {
        return __awaiter(this, void 0, void 0, function* () {
            const allConfig = this.db.getListThreadConfig;
            for (let config of allConfig) {
                if (config.getBSend) {
                    this.data.set(config.getID, new DataSend());
                    this.log.log((c, h) => h.success + c.red(" Bật") + " nhóm " + c.magenta(config.getID));
                }
            }
        });
    }
}
exports.default = BSend;
