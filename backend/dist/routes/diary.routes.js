"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diary_controller_1 = __importDefault(require("../controllers/diary.controller"));
const diaryRouter = (0, express_1.Router)();
diaryRouter.get('/', diary_controller_1.default.getDiaries);
// diaryRouter.get('/:date', diaryController.addNewDiary)
diaryRouter.post('/', diary_controller_1.default.addNewDiary);
diaryRouter.put('/:id', diary_controller_1.default.updateDiaryById);
diaryRouter.delete('/:id', diary_controller_1.default.deleteDiaryById);
exports.default = diaryRouter;
