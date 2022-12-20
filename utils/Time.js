"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const moment = require("moment-timezone");
class Time {
    static getTime() {
        return moment.tz(Date.now(), "Asia/Saigon");
    }
}
exports.Time = Time;
