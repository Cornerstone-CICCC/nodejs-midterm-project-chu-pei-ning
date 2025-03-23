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
const daily_models_1 = __importDefault(require("../models/daily.models"));
//get routines
const getRoutines = (req, res) => {
    const routines = daily_models_1.default.findAllRoutine();
    res.status(200).json(routines);
};
//get routine by id
const getRoutineById = (req, res) => {
    const { id } = req.params;
    const routine = daily_models_1.default.getRoutineById(id);
    if (!routine) {
        res.status(404).json({ error: "No this routine" });
        return;
    }
    res.status(200).json(routine);
};
//add new routine
const addNewRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { routine } = req.body;
    if (!routine) {
        res.status(500).json({ error: 'Routine is empty!' });
        return;
    }
    const newRoutine = yield daily_models_1.default.addRoutine(routine);
    if (!newRoutine) {
        res.status(409).json({ error: "" });
        return;
    }
    res.status(201).json(newRoutine);
});
//update the routine
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { routine } = req.body;
    const item = yield daily_models_1.default.updateRoutine(id, { routine });
    if (!item) {
        res.status(404).json({ error: "Routine does not exist!" });
        return;
    }
    res.status(200).json(item);
});
//delete the routine
const deleteUserById = (req, res) => {
    const { id } = req.params;
    const result = daily_models_1.default.deleteRoutine(id);
    if (!result) {
        res.status(404).json({ message: "Routine not found!" });
        return;
    }
    res.status(200).json({ message: "Deleted routine!" });
};
exports.default = {
    getRoutines,
    getRoutineById,
    addNewRoutine,
    updateUserById,
    deleteUserById
};
