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
const HandleProcess_1 = require("../../bot/HandleProcess");
const CmdAbstract_1 = require("../CmdAbstract");
const Command_1 = require("../models/Command");
const YtbTools_1 = require("../supportTools/YtbTools");
class Ytb extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        const key1 = new Command_1.KeyHelp("keyword", "Từ khoá tìm kiếm", "ytb [keyword]", "ytb mèo samsung");
        super(bot, scripts, new Log_1.Log("ytb"), new Command_1.Config("ytb", 0, 10, bot.getOwn, "Xem video từ ytb", [key1]));
        this.ytb = new YtbTools_1.YtbTools();
        this.mapResult = new Map();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.args.length) {
                this.bot.send(`Từ khoá tìm kiếm không để trống, gõ help ytb để xem cách sử dụng`, this.event.threadID, this.event.messageID);
                return;
            }
            const { results } = yield this.ytb.search(this.args.join(" "));
            const arr = [];
            for (let item of results) {
                arr.push({
                    title: item.title,
                    link: item.link,
                });
            }
            if (!results || !results.length) {
                this.bot.send(`Không có kết quả tìm kiếm nào phù hợp cho từ khoá ${this.args.join(" ")}`, this.event.threadID, this.event.messageID);
                return;
            }
            let msg = this.bot.getConfig.getHeader("Search") +
                `\n` +
                arr.map((e, i) => i + 1 + ". " + e.title).join("\n---------\n") +
                `\n` +
                this.bot.getConfig.getLine +
                `\n- Reply số thứ tự video muốn lấy!`;
            const info = yield this.bot.send(msg, this.event.threadID, this.event.messageID);
            this.bot.getProcess.handleReply.add(new HandleProcess_1.HandleProcess(this.config.name, info.messageID, this.event.senderID));
            this.mapResult.set(info.messageID, arr);
            setTimeout(() => {
                this.bot.getProcess.handleReply.remove(info.messageID);
            }, 30000);
        });
    }
    reply() {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this.event.body.split(/ +/).find((i) => !isNaN(Number(i)));
            if (!index) {
                this.bot.send(`Số thứ tự không hợp lệ`, this.event.threadID, this.event.messageID);
                return;
            }
            const ytbArr = this.mapResult.get(this.event.messageReply.messageID);
            const indexArr = Number(index) - 1;
            if (indexArr < 0 || indexArr > ytbArr.length) {
                this.bot.send(`Số thứ tự nằm trong khoảng  1 - ${ytbArr.length}`, this.event.threadID, this.event.messageID);
                return;
            }
            const video = ytbArr[indexArr];
            this.bot.unsend(this.event.messageReply.messageID);
            const info = yield this.bot.send(`Đang tiến hành lấy video...`, this.event.threadID, this.event.messageID);
            try {
                const stream = yield this.ytb.dowload(video.link);
                this.bot.send({
                    body: video.title.slice(0, video.title.length - 8) + "...",
                    attachment: stream,
                }, this.event.threadID);
            }
            catch (e) {
                this.bot.send(e, this.event.threadID);
            }
            this.bot.unsend(info.messageID);
        });
    }
    reaction() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    every() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = Ytb;
