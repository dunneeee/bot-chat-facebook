"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.HeaderNoti = void 0;
const utils = require("util");
const chalk = require("chalk");
class HeaderNoti {
    constructor(text) {
        this.text = text;
    }
    get success() {
        return chalk.green(this.text);
    }
    get error() {
        return chalk.red(this.text);
    }
    get warm() {
        return chalk.yellow(this.text);
    }
    get magenta() {
        return chalk.magenta(this.text);
    }
}
exports.HeaderNoti = HeaderNoti;
class Log {
    constructor(header, pair, devMode) {
        this.header = header;
        // Log.devMode = devMode || false;
        if (!pair || (pair === null || pair === void 0 ? void 0 : pair.length) < 2) {
            this.pair = "[]";
        }
        else {
            this.pair = pair;
        }
    }
    getHeader() {
        const text = this.pair[0] + " " + this.header + " " + this.pair[1] + " --> ";
        return new HeaderNoti(text);
    }
    log(callback) {
        const text = callback(chalk, this.getHeader());
        console.log(text);
    }
    nLog(data) {
        if (Log.devMode)
            console.log(utils.inspect(data, false, null, true));
    }
}
exports.Log = Log;
