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
const FacebookTools_1 = require("../supportTools/FacebookTools");
class idErr {
    constructor(id, amount) {
        this.id = id;
        this.amount = amount;
    }
    get getAmount() { return this.amount; }
    set setAmount(value) { this.amount = value; }
    ;
    upAmount() {
        this.amount++;
    }
    downAmount() {
        this.amount--;
    }
    get getID() { return this.id; }
}
class Add extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        const key = new Command_1.KeyHelp("linkfb", "Link facebook người cần thêm", "add [linkfb]", "");
        const config = new Command_1.Config("add", 0, 10, bot.getOwn, "Thêm người dùng vào nhóm bằng link facebook", [key]);
        super(bot, scripts, new Log_1.Log("add"), config);
        this.idErrList = [];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const linkfb = this.args[0];
            const fbidobj = yield FacebookTools_1.FbTools.getIDWithLink(linkfb);
            if (fbidobj.code === 400) {
                this.bot.send(fbidobj.err || "Có lỗi xảy ra vui lòng liên hệ admin", this.event.threadID, this.event.messageID);
            }
            else {
                const userErr = this.idErrList.find(u => u.getID == this.event.senderID);
                if (userErr) {
                    if (userErr.getAmount <= 4) {
                        userErr.upAmount();
                        this.bot.send(`Bạn còn ${userErr.getAmount} lần sử dụng lệnh này nếu cố gắng thử khi có lỗi xảy ra!`, this.event.threadID, this.event.messageID);
                    }
                    else {
                        return;
                    }
                }
                const isAdd = yield this.bot.addUser(fbidobj.id, this.event.threadID);
                if (!isAdd) {
                    if (!this.idErrList.find(u => u.getID == this.event.senderID)) {
                        this.idErrList.push(new idErr(this.event.senderID, 1));
                    }
                    this.bot.send(`Có lỗi không thể thêm người dùng!`, this.event.threadID, this.event.messageID);
                }
            }
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
exports.default = Add;
