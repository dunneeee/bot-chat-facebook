"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.KeyHelp = void 0;
class KeyHelp {
    constructor(key, des, use, note) {
        this.key = key;
        this.des = des;
        this.use = use;
        this.note = note;
    }
}
exports.KeyHelp = KeyHelp;
class Config {
    constructor(name, permision, cooldown, author, des, help, isGroup = true) {
        this.name = name;
        this.permision = permision;
        this.cooldown = cooldown;
        this.author = author;
        this.help = help;
        this.des = des;
        this.isGroup = isGroup;
    }
    get getNotiPermision() {
        switch (this.permision) {
            case 0:
                return `Người dùng`;
            case 1:
                return `Admin nhóm`;
            case 2:
                return `Admin bot`;
            case 3:
                return `Own bot`;
            default:
                return `None`;
        }
    }
    get getAllConfig() {
        return `- Tên: ${this.name}\n- Quyền: ${this.getNotiPermision}\n- Hạn: ${this.cooldown} giây/ người\n- Tác giả: ${this.author}\n- Mô tả: ${this.des}`;
    }
    get getSortConfig() {
        return `. Tên: ${this.name}\n- Des: ${this.des}\n- Dùng ở: ${this.isGroup ? "Nhóm" : "Ibox bot"}`;
    }
}
exports.Config = Config;
