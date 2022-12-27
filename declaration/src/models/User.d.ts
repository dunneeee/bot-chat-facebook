import { Person, PersonInterface } from "./Person";
export interface UserInterface {
    person: PersonInterface;
    money: number;
    gender: number;
    isAdmin: boolean;
}
export declare class User extends Person {
    private gender;
    private money;
    private isAdmin;
    constructor(user: UserInterface);
    get getIsAdmin(): boolean;
    set setAdmin(value: boolean);
    get getGender(): number;
    set setGender(gender: number);
    get getMoney(): number;
    set setMoney(value: number);
}
