"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Daily {
    constructor() {
        this.routines = [];
    }
    findAllRoutine() {
        return this.routines;
    }
    getRoutineById(id) {
        const routine = this.routines.find(r => r.id === id);
        if (!routine)
            return null;
        return routine;
    }
    // add Routine
    addRoutine(routine) {
        const newRoutine = {
            id: (0, uuid_1.v4)(),
            routine,
            isDone: false,
        };
        this.routines.push(newRoutine);
        return newRoutine;
    }
    // update Routine
    updateRoutine(id, updatedRoutine) {
        const index = this.routines.findIndex((r) => r.id === id);
        if (index !== -1) {
            const routine = this.routines[index];
            if (updatedRoutine.routine !== undefined) {
                routine.routine = updatedRoutine.routine;
            }
            if (updatedRoutine.isDone !== undefined) {
                routine.isDone = updatedRoutine.isDone;
            }
            return routine;
        }
        return null;
    }
    // delete Routine
    deleteRoutine(id) {
        const index = this.routines.findIndex((r) => r.id === id);
        if (index !== -1) {
            return this.routines.splice(index, 1)[0]; // 回傳被刪除的 Routine
        }
        return null;
    }
}
exports.default = new Daily();
