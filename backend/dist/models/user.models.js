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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    constructor() {
        this.users = [
            { id: (0, uuid_1.v4)(), username: 'amy', password: '12345' },
            { id: (0, uuid_1.v4)(), username: 'cindy', password: '54321' }
        ];
    }
    findAll() {
        return this.users;
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(u => u.username === username);
            if (!user)
                return null;
            return user;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(u => u.username === username);
            if (!user)
                return false;
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                return false;
            return user;
        });
    }
    createUser(newuser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = newuser;
            const foundIndex = this.users.findIndex(u => u.username === username);
            if (foundIndex !== -1)
                return false;
            const hashedPassword = yield bcrypt_1.default.hash(password, 12);
            const user = {
                id: (0, uuid_1.v4)(),
                username,
                password: hashedPassword
            };
            this.users.push(user);
            return user;
        });
    }
}
exports.default = new UserModel;
