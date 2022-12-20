"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banned = void 0;
class Banned {
    constructor(ban) {
        this.banned = ban.banned;
        this.reason = ban.reason;
    }
    get getBanned() {
        return this.banned;
    }
    set setBanned(ban) {
        this.banned = ban;
    }
    get getReason() {
        return this.reason;
    }
    set setReason(reason) {
        this.reason = reason;
    }
}
exports.Banned = Banned;
