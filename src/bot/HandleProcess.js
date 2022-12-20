"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleManager = exports.HandleProcess = void 0;
class HandleProcess {
    constructor(cmdName, messageID, author) {
        this.cmdName = cmdName;
        this.messageID = messageID;
        this.author = author;
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}
exports.HandleProcess = HandleProcess;
class HandleManager {
    constructor() {
        this.listProcess = [];
    }
    add(process) {
        this.listProcess.push(process);
    }
    remove(messageID) {
        const index = this.listProcess.findIndex((p) => p.messageID == messageID);
        if (index >= 0) {
            this.listProcess.splice(index, 1);
        }
    }
    get(messageID) {
        return this.listProcess.find((p) => p.messageID == messageID);
    }
}
exports.HandleManager = HandleManager;
