"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Person_1 = require("./Person");
class User extends Person_1.Person {
    constructor(user) {
        super(user.person);
        this.gender = user.gender;
        this.money = user.money;
        this.isAdmin = user.isAdmin;
    }
    get getIsAdmin() {
        return this.isAdmin;
    }
    set setAdmin(value) {
        this.isAdmin = value;
    }
    get getGender() {
        return this.gender;
    }
    set setGender(gender) {
        this.gender = gender;
    }
    get getMoney() {
        return this.money;
    }
    set setMoney(value) {
        this.money = this.money;
    }
}
exports.User = User;
