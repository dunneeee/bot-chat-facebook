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
exports.HandleAdminCmdStatus = void 0;
const Log_1 = require("../../../utils/Log");
const CmdAbstract_1 = require("../CmdAbstract");
const Command_1 = require("../models/Command");
class HandleAdminCmdStatus {
    constructor(id, code, message) {
        this.id = id;
        this.message = message;
        this.code = code;
    }
    get getID() {
        return this.id;
    }
    get getmessage() {
        return this.message;
    }
    get getCode() {
        return this.code;
    }
    set setmessage(message) {
        this.message = message;
    }
    set setCode(code) {
        this.code = code;
    }
}
exports.HandleAdminCmdStatus = HandleAdminCmdStatus;
class SetAdmin extends CmdAbstract_1.CmdAbstract {
    constructor(bot, script) {
        const key1 = new Command_1.KeyHelp("@tags", "tag người dùng cần thêm", "setadmin [@tags]", "setadmin [@Lê Thế Dũng]");
        super(bot, script, new Log_1.Log("SetAdmin"), new Command_1.Config("setadmin", 3, 1, bot.getOwn, "Thêm subAdmin cho bot", [key1]));
    }
    setAdminUsers(userIDList, status) {
        const arr = [];
        const length = userIDList.length;
        const start = (index) => {
            var _a;
            if (index >= length) {
                this.db.saveUser();
                return;
            }
            const user = this.db.findUser(userIDList[index]);
            if (user) {
                if (!status) {
                    if (!user.getIsAdmin) {
                        arr.push(new HandleAdminCmdStatus(userIDList[index], 400, "Không phải sub admin!"));
                    }
                    else {
                        user.setAdmin = status;
                        this.log.log((c, h) => h.success +
                            `Chuyển trạng thái ${c.magenta("admin")} của người dùng ${c.green(user.getName)} thành ${c.magenta(status)}`);
                        arr.push(new HandleAdminCmdStatus(userIDList[index], 200, "Bỏ thành công!"));
                    }
                }
                else {
                    if ((_a = user.getban) === null || _a === void 0 ? void 0 : _a.getBanned) {
                        arr.push(new HandleAdminCmdStatus(userIDList[index], 400, "Người dùng này đang bị cấm!"));
                    }
                    else {
                        if (user.getIsAdmin) {
                            arr.push(new HandleAdminCmdStatus(userIDList[index], 400, "Đã là sub admin!"));
                        }
                        else {
                            user.setAdmin = status;
                            this.log.log((c, h) => h.success +
                                `Chuyển trạng thái ${c.magenta("admin")} của người dùng ${c.green(user.getName)} thành ${c.magenta(status)}`);
                            arr.push(new HandleAdminCmdStatus(userIDList[index], 200));
                        }
                    }
                }
            }
            else {
                arr.push(new HandleAdminCmdStatus(userIDList[index], 404, "Không tồn tại người dùng trong database!"));
            }
            start(index + 1);
        };
        start(0);
        return arr;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const listID = Object.keys(this.event.mentions);
            if (listID.length > 0) {
                let msg = this.bot.getConfig.getHeader("Add admin") + "\n";
                const listStatus = this.setAdminUsers(listID, true);
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
            else {
                this.bot.send(`Vui lòng tag những người cần thêm`, this.event.threadID, this.event.messageID);
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
exports.default = SetAdmin;
