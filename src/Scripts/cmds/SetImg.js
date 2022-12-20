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
class SetImg extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scritps) {
        super(bot, scritps, new Log_1.Log("SetImg"), new Command_1.Config("setimg", 0, 10, bot.getOwn, "Thay đổi ảnh nhóm bằng cách reply tin nhắn chứa ảnh", []));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.event.messageReply) {
                this.bot.send(`Reply ảnh cần set avt nhóm!`, this.event.threadID, this.event.messageID);
                return;
            }
            if (!this.event.isGroup) {
                this.bot.send(`Lệnh này chỉ dùng trong nhóm!`, this.event.threadID, this.event.messageID);
                return;
            }
            const { url } = this.event.messageReply.attachments[0];
            const stream = yield Tools_1.Tools.fileStream(url, "jpg");
            this.api.changeGroupImage(stream, this.event.threadID, (err) => {
                if (err) {
                    this.bot.sendError({ message: err.errorDescription, name: "img err", }, this.event.threadID);
                }
            });
        });
    }
    reply() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    reaction() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    every() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = SetImg;
