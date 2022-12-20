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
exports.Tools = void 0;
const axios_1 = require("axios");
const fs = require("fs");
const path_1 = require("path");
class Tools {
    constructor() { }
    static getStream(link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(link, {
                    responseType: "stream",
                });
                return data;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    static createLink(name) {
        const ran = Math.floor(Math.random() * 1000000);
        return (0, path_1.join)(Tools.dir, name + "-" + ran);
    }
    static removeFile(dir) {
        fs.unlink(dir, (e) => {
            if (e)
                console.log(e);
        });
    }
    static fileStream(link, extend) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(link, { responseType: "stream" });
                const path = this.createLink("st") + "." + extend;
                return new Promise((reslove) => {
                    data.pipe(fs.createWriteStream(path)).on("close", () => {
                        reslove(fs.createReadStream(path).on('close', () => {
                            this.removeFile(path);
                        }));
                    });
                });
            }
            catch (e) {
                return null;
            }
        });
    }
    static pageCut(arr, size) {
        let results = [];
        for (let i = 0; i < arr.length; i += size) {
            let myArr = arr.slice(i, i + size);
            results.push(myArr);
        }
        return results;
    }
}
exports.Tools = Tools;
Tools.dir = (0, path_1.join)(__dirname);
