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
class GAdmin extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        super(bot, scripts, new Log_1.Log("Gadmin"), new Command_1.Config("gadmin", 0, 10, bot.getOwn, "Xem danh sách admin", []));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const listAdmin = this.db.getUsers(u => u.getIsAdmin == true);
            let msg = this.bot.getConfig.getHeader("GAdmin") + "\n";
            msg += listAdmin.map((ad, index) => {
                let msg = index + 1 + ". " + ad.getName + `\n- Fb: https://www.facebook.com/${ad.getID}`;
                if (ad.getID == this.bot.getConfig.adminID) {
                    msg += `(OWN BOT)`;
                }
                return msg;
            }).join("\n" + this.bot.getConfig.getLine + "\n");
            this.bot.send(msg, this.event.threadID, this.event.messageID);
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
exports.default = GAdmin;
