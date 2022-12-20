"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs = require("fs");
const path_1 = require("path");
class Database {
    constructor(dir, fileName) {
        this.dir = dir;
        this.path = (0, path_1.join)(this.dir, fileName + ".json");
        this.init();
    }
    checkExists(path) {
        return fs.existsSync(path);
    }
    readFile(path) {
        if (path) {
            return JSON.parse(fs.readFileSync(path, "utf-8"));
        }
        else {
            return JSON.parse(fs.readFileSync(this.path, "utf-8"));
        }
    }
    writeFile(data, path) {
        if (path) {
            fs.writeFileSync(path, JSON.stringify(data), "utf-8");
        }
        else {
            fs.writeFileSync(this.path, JSON.stringify(data), "utf-8");
        }
    }
    init() {
        if (!this.checkExists(this.dir)) {
            fs.mkdirSync(this.dir);
        }
        if (!this.checkExists(this.path)) {
            fs.writeFileSync(this.path, "[]", "utf-8");
        }
    }
}
exports.Database = Database;
