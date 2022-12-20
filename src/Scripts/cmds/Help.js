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
class Help extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        const key1 = new Command_1.KeyHelp("số trang", "Số trang lệnh", "help [page]", "Số trang không phải chữ!");
        const key2 = new Command_1.KeyHelp("Tên lệnh", "Tên lệnh cần hướng dẫn", "help [tên lệnh]", "");
        const key3 = new Command_1.KeyHelp("--all", "flag --all để lấy toàn bộ lệnh có trên bot mà không có mô tả", "help --all", "");
        super(bot, scripts, new Log_1.Log("Help"), new Command_1.Config("help", 0, 10, bot.getOwn, "Hướng dẫn sử dụng", [key1, key2, key3]));
    }
    sendPage(page) {
        var _a;
        const info = this.scripts.getListCmd.map((c, index) => index + 1 + c.getConfig.getSortConfig);
        const allPage = Tools_1.Tools.pageCut(info, this.bot.getConfig.pageHelp || 5);
        if (!allPage[page]) {
            this.bot.send(`Không tồn tại trang ${page}`, this.event.threadID, this.event.messageID);
            return;
        }
        const thread = this.db.findThread(this.event.threadID);
        const prefix = ((_a = thread === null || thread === void 0 ? void 0 : thread.getSettings) === null || _a === void 0 ? void 0 : _a.getPrefix) || this.bot.getConfig.prefix;
        this.bot.send(this.bot.getConfig.getHeader("Danh sách lệnh") +
            "\n" +
            allPage[page].join("\n" + this.bot.getConfig.getLine + "\n") +
            "\n" +
            this.bot.getConfig.getLine +
            "\n" +
            `- Trang: ${page}/${allPage.length - 1}\n- Gõ ${prefix}[tên lệnh] để xem chi tiết!\n- Gõ ${prefix + this.config.name} --all để xem tất cả các lệnh!\n- Hiện có ${info.length} lệnh có thể dùng trên bot.`, this.event.threadID, this.event.messageID);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.args.length > 0) {
                const key = this.args[0];
                if (isNaN(Number(key))) {
                    if (key.toLowerCase() == "--all") {
                        const allCmd = this.scripts.getListCmd;
                        let msg = this.bot.getConfig.getHeader("Dùng ở nhóm!") + "\n";
                        msg += allCmd
                            .map((c, index) => {
                            let name = c.getConfig.name;
                            if (index != 0 && index % 5 == 0) {
                                name += "\n";
                            }
                            if (c.getConfig.isGroup) {
                                return name;
                            }
                        })
                            .join(" ");
                        msg += `\n ${this.bot.getConfig.getHeader("Ibox bot")}\n`;
                        msg += allCmd
                            .map((c, index) => {
                            let name = c.getConfig.name;
                            if (index != 0 && index % 5 == 0) {
                                name += "\n";
                            }
                            if (!c.getConfig.isGroup)
                                return name;
                        })
                            .join(" ");
                        this.bot.send(msg, this.event.threadID, this.event.messageID);
                        return;
                    }
                    const cmd = this.scripts.findCmd(key.toLowerCase());
                    if (cmd) {
                        cmd.setEvent = this.event;
                        this.bot.send(this.bot.getConfig.getHeader(this.config.name.charAt(0).toUpperCase() + this.config.name.slice(1)) +
                            "\n" +
                            cmd.getConfig.getAllConfig +
                            "\n" +
                            this.bot.getConfig.getLine +
                            cmd.getHelp +
                            (cmd.getHelp.length > 0 ? this.bot.getConfig.getLine : ""), this.event.threadID, this.event.messageID);
                    }
                    else {
                        this.bot.send(`Không tồn tại lệnh ${key}.`, this.event.threadID, this.event.messageID);
                    }
                }
                else {
                    const page = Number(key);
                    this.sendPage(page);
                }
            }
            else {
                this.sendPage(0);
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
exports.default = Help;
