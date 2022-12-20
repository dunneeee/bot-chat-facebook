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
class RAdmin extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        const key1 = new Command_1.KeyHelp("@tags", "Tag các admin dùng gadmin để lấy danh sách!", "radmin @tag", "radmin @Lê Thế Dũng");
        super(bot, scripts, new Log_1.Log("RAdmin"), new Command_1.Config("radmin", 3, 1, bot.getOwn, "Gỡ bỏ người subAdmin", [key1]));
    }
    run() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const listID = Object.keys(this.event.mentions);
            if (listID.length <= 0) {
                this.bot.send(`Vui lòng tag sub admin`, this.event.threadID, this.event.messageID);
                return;
            }
            const setAdminUsers = (_a = this.scripts.getCmd("setadmin")) === null || _a === void 0 ? void 0 : _a.setAdminUsers.bind(this);
            if (!setAdminUsers) {
                this.log.log((c, h) => h.error + `${c.red("Không tìm thấy lệnh setadmin")} để lấy hàm cần thiết!`);
                this.bot.send(`Thiếu hàm thực thi liên hệ admin!`, this.event.threadID, this.event.messageID);
            }
            else {
                const listStatus = setAdminUsers(listID, false);
                let msg = this.bot.getConfig.getHeader("Remove admin") + "\n";
                for (let userStatus of listStatus) {
                    if (userStatus.getCode == 404 || userStatus.getCode == 400) {
                        msg += `- ID: ${userStatus.getID}\n- Lỗi: ${userStatus.getmessage}`;
                    }
                    else {
                        msg += `-ID: ${userStatus.getID}\n- Status: Thành công!`;
                    }
                    msg += "\n" + this.bot.getConfig.getLine + "\n";
                }
                this.bot.send(msg, this.event.threadID, this.event.messageID);
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
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = RAdmin;
