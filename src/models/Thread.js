"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = exports.Member = exports.Settings = exports.ThreadConfig = void 0;
const Log_1 = require("../../utils/Log");
const Person_1 = require("./Person");
class ThreadConfig {
    constructor(config) {
        this.bsend = config.bsend || false;
        this.sim = config.sim || false;
        this.id = config.id;
    }
    get getSim() {
        return this.sim;
    }
    get getBSend() {
        return this.bsend;
    }
    set setSim(value) {
        this.sim = value;
    }
    set setBSend(value) {
        this.bsend = value;
    }
    get getID() {
        return this.id;
    }
}
exports.ThreadConfig = ThreadConfig;
class Settings {
    constructor(settings) {
        this.prefix = settings.prefix;
        this.joinNoti = settings.joinNoti;
        this.leaveNoti = settings.leaveNoti;
        this.gifJoin = settings.gifJoin;
        this.gifLeave = settings.gifLeave;
    }
    get getGifJoin() {
        return this.gifJoin;
    }
    get getGifLeave() {
        return this.gifLeave;
    }
    set setGifJoin(value) {
        this.gifJoin = value;
    }
    set setGifLeave(value) {
        this.gifLeave = value;
    }
    get getPrefix() {
        return this.prefix;
    }
    set setPrefix(prefix) {
        this.prefix = prefix;
    }
    get getJoinNoti() {
        return this.joinNoti;
    }
    set setJoinNoti(value) {
        this.joinNoti = value;
    }
    get getLeaveNoti() {
        return this.leaveNoti;
    }
    set setLeaveNoti(value) {
        this.leaveNoti = value;
    }
}
exports.Settings = Settings;
class Member {
    constructor(member) {
        this.id = member.id;
        this.exp = member.exp;
        this.cmdBan = member.cmdBan;
    }
    addCmdBan(name) {
        this.cmdBan.push(name);
    }
    removeCmdBan(name) {
        const index = this.cmdBan.findIndex((c) => c == name);
        if (index >= 0) {
            this.cmdBan.splice(index, 1);
        }
    }
    get getListCmdBan() {
        return this.cmdBan;
    }
}
exports.Member = Member;
class Thread extends Person_1.Person {
    constructor(thread) {
        super(thread.person);
        this.settings = thread.settings;
        this.listMemmber = thread.listMember;
        this.log = new Log_1.Log(this.name || this.id);
    }
    get getSettings() {
        return this.settings;
    }
    set setSettings(settings) {
        if (settings) {
            this.settings = settings;
        }
    }
    get getListMember() {
        return this.listMemmber;
    }
    set setListMember(value) {
        if (value)
            this.listMemmber = value;
    }
    findMember(id) {
        return this.listMemmber.find((m) => m.id == id);
    }
    addMember(member) {
        if (member) {
            this.log.log((c, h) => h.success + `Thêm người dùng có id: ${member.id}`);
            this.listMemmber.push(member);
        }
    }
    removeMember(memberID) {
        const index = this.listMemmber.findIndex((m) => m.id == memberID);
        if (index >= 0) {
            this.listMemmber.splice(index, 1);
            this.log.log((c, h) => h.success + `Xoá người dùng có id: ${memberID}`);
        }
    }
    get getInfo() {
        let resluts = "";
        resluts += `-Tên: ${this.name}\n- ID: ${this.id}\n- Số thành viên: ${this.listMemmber.length}\n- prefix: ${this.settings.getPrefix}\n- Lệnh bị cấm: ${this.listCmdBan.length > 0 ? this.listCmdBan.join(", ") : 0}`;
        return resluts;
    }
}
exports.Thread = Thread;
