"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const daily_controllers_1 = __importDefault(require("../controllers/daily.controllers"));
const dailyRouter = (0, express_1.Router)();
dailyRouter.get('/', daily_controllers_1.default.getRoutines);
dailyRouter.get('/:id', daily_controllers_1.default.getRoutineById);
dailyRouter.post('/', daily_controllers_1.default.addNewRoutine);
dailyRouter.put('/:id', daily_controllers_1.default.updateUserById);
dailyRouter.delete('/:id', daily_controllers_1.default.deleteUserById);
exports.default = dailyRouter;
