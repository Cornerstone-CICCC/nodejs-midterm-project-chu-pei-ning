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
const user_models_1 = __importDefault(require("../models/user.models"));
//get user
const getUsers = (req, res) => {
    const users = user_models_1.default.findAll();
    res.status(200).json(users);
};
//get user by username
const gerUserByUsername = (req, res) => {
    const { username } = req.body;
    const user = user_models_1.default.findByUsername(username);
    if (!user) {
        res.status(404).send("user not found");
    }
    res.status(200).json(user);
};
//login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).send("Username or Password not found");
    }
    const user = yield user_models_1.default.login(username, password);
    console.log(user);
    if (!user) {
        res.status(500).send("Username or Password is incorrect!");
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(200).send("successe!!!");
});
//add new user
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({ error: 'Username/password is empty!' });
    }
    const user = yield user_models_1.default.createUser({ username, password });
    if (!user) {
        res.status(409).json({ error: 'Username is taken!' });
        return;
    }
    res.status(201).json(user);
});
//logout
const logout = (req, res) => {
    req.session = null;
    res.status(200).json({
        content: "Session cookie cleared!",
    });
};
//check cookie
const checkCookie = (req, res) => {
    if (req.session && req.session.username) {
        res.status(200).json({
            content: req.session.username
        });
        return;
    }
    res.status(500).json({
        content: "No cookie found!"
    });
};
exports.default = {
    getUsers,
    gerUserByUsername,
    loginUser,
    addUser,
    logout,
    checkCookie
};
