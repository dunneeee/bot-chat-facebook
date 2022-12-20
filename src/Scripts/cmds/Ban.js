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
class Ban extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        super(bot, scripts, new Log_1.Log("Ban"), new Command_1.Config("ban", 2, 10, bot.getOwn, "Cấm người dùng hoặc nhóm sử dụng bot", []));
        this.data = new Map();
    }
    banUser(arr) {
        let name = [];
        for (let id of arr) {
            const user = this.db.findUser(id);
            if (user && !user.getban.getBanned) {
                user.getban.setBanned = true;
                name.push(user.getName);
            }
        }
        this.db.saveUser();
        return name;
    }
    getText(personList) {
        let text = "";
        let index = 1;
        let arr = [];
        for (let person of personList) {
            text += `${index}. Tên: ${person.getName}\n- ID: ${person.getID}\n- Tình trạng: ${person.getban.getBanned ? "Đang cấm" : "Không cấm"}\n`;
            index += 1;
            arr.push(person.getID);
        }
        return { arr, text };
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const idBanList = Object.keys(this.event.mentions);
            const listID = this.args.filter(text => !isNaN(Number(text)));
            if (idBanList.length > 0) {
                const name = this.banUser(idBanList);
                this.bot.send("Cấm thành công " + name.join(", "), this.event.threadID, this.event.messageID);
            }
            if (listID.length > 0) {
                let name = [];
                let errID = [];
                let idBanWithName = [];
                for (let id of listID) {
                    const user = this.db.findUser(id);
                    if (user) {
                        name.push(user.getName);
                        idBanWithName.push(id);
                    }
                    else {
                        errID.push(id);
                    }
                }
                if (name.length > 0) {
                    const info = yield this.bot.send(`Có phải bạn muốn cấm: ${name.join(", ")}\n${this.bot.getConfig.getLine}\n- Thả cảm xúc tin nhắn này để cấm.`, this.event.threadID, this.event.messageID);
                    const handle = new HandleProcess_1.HandleProcess(this.config.name, info.messageID, this.event.senderID);
                    console.log(handle);
                    this.data.set(info.messageID, idBanWithName);
                    this.bot.getProcess.handleReaction.add(handle);
                    setTimeout(() => {
                        this.bot.getProcess.handleReaction.remove(info.messageID);
                        this.data.delete(info.messageID);
                    }, 30000);
                }
                else {
                }
            }
            if (idBanList.length == 0 && listID.length == 0) {
                const { threadList, userList } = this.db.findName(this.args.join(" "));
                let list = [];
                let msg = "";
                if (threadList.length) {
                    const { text, arr } = this.getText(threadList);
                    msg += this.bot.getConfig.getHeader("Thread") + "\n" + text;
                    list = [...list, ...arr];
                }
                if (userList.length) {
                    const { text, arr } = this.getText(userList);
                    list = [...list, ...arr];
                    msg += this.bot.getConfig.getHeader("User") + "\n" + text;
                }
                if (!threadList.length && !userList.length) {
                    this.bot.send(`Không có người dùng hoặc nhóm nào tên ${this.args.join(" ")}`, this.event.threadID, this.event.messageID);
                    return;
                }
                const info = yield this.bot.send(msg, this.event.threadID, this.event.messageID);
                this.bot.getProcess.handleReply.add(new HandleProcess_1.HandleProcess(this.config.name, info.messageID));
                this.data.set(info.messageID, list);
                setTimeout(() => {
                    this.bot.getProcess.handleReply.remove(info.messageID);
                }, 30000);
            }
        });
    }
    reply() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const args = (((_a = this.event.body) === null || _a === void 0 ? void 0 : _a.split(/ +/)) || []).filter(item => !isNaN(Number(item)));
            const listID = this.data.get(this.event.messageReply.messageID);
            const listIDBan = [];
            for (let index of args) {
                listIDBan.push(listID[index]);
            }
            if (!listIDBan.length) {
                this.bot.send(`Có vấn đề với các số thứ tự vui lòng thử và kiểm tra lại!`, this.event.threadID, this.event.messageID);
                return;
            }
            for (let id of listIDBan) {
                const user = this.db.findUser(id);
                if (user) {
                    user.getban.setBanned = true;
                }
                else {
                    const thread = this.db.findThread(id);
                    if (thread) {
                        thread.getban.setBanned = true;
                    }
                }
            }
            this.bot.unsend(this.event.messageReply.messageID);
            this.bot.send(`Cấm thành công`, this.event.threadID);
        });
    }
    reaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const listID = this.data.get(this.event.messageID);
            const name = this.banUser(listID);
            this.bot.send(`Cấm thành công ${name.join(', ')}`, this.event.threadID, this.event.messageID);
            this.data.delete(this.event.messageID);
        });
    }
    every() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = Ban;
