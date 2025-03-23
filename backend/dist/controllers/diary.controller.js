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
const diary_models_1 = __importDefault(require("../models/diary.models"));
//get diaries
const getDiaries = (req, res) => {
    const routines = diary_models_1.default.findAllDiary();
    res.status(200).json(routines);
};
//get diary by date
const getByDate = (req, res) => {
    const { date } = req.body;
    const routine = diary_models_1.default.getDiaryByDate(date);
    if (!routine) {
        res.status(404).json({ error: "No this routine" });
        return;
    }
    res.status(200).json(routine);
};
//add new diary
const addNewDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, mood, weather, content } = req.body;
    if (!date || !mood || !weather || !content) {
        res.status(500).json({ error: 'Routine is empty!' });
        return;
    }
    const newRoutine = yield diary_models_1.default.addDiary({ date, mood, weather, content });
    if (!newRoutine) {
        res.status(409).json({ error: "" });
        return;
    }
    res.status(201).json(newRoutine);
});
//update the diary 
const updateDiaryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { date, mood, weather, content } = req.body;
    const item = yield diary_models_1.default.updateDiary(id, { date, mood, weather, content });
    if (!item) {
        res.status(404).json({ error: "Routine does not exist!" });
        return;
    }
    res.status(200).json(item);
});
//delete the diary
const deleteDiaryById = (req, res) => {
    const { id } = req.params;
    const result = diary_models_1.default.deleteDiary(id);
    if (!result) {
        res.status(404).json({ message: "Diary not found!" });
        return;
    }
    res.status(200).json({ message: "Deleted diary!" });
};
exports.default = {
    getDiaries,
    addNewDiary,
    updateDiaryById,
    deleteDiaryById
};
