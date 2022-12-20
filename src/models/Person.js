"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    constructor(person) {
        this.id = person.id;
        this.name = person.name;
        this.ban = person.ban;
        this.cmdBan = person.cmdBan;
    }
    get getID() {
        return this.id;
    }
    set setID(id) {
        this.id = id;
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
    get getban() {
        return this.ban;
    }
    set setBan(ban) {
        this.ban = ban;
    }
    get listCmdBan() {
        return this.cmdBan;
    }
    set setListCmdBan(value) {
        this.cmdBan = value;
    }
    addcmdBan(cmd) {
        if (!this.checkExistsBan(cmd)) {
            this.cmdBan.push(cmd);
        }
    }
    checkExistsBan(cmd) {
        const i = this.cmdBan.findIndex((i) => i == cmd);
        if (i >= 0)
            return true;
        else
            return false;
    }
    removeCmdBan(cmd) {
        const index = this.cmdBan.findIndex((i) => i == cmd);
        if (index >= 0) {
            this.cmdBan.splice(index, 1);
        }
    }
}
exports.Person = Person;
