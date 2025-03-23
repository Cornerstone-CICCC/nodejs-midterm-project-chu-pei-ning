import { v4 as uuidv4 } from "uuid"
import { Routine } from "../types/daily"

class Daily {
  private routines: Routine[] = []

  findAllRoutine() {
    return this.routines
  }

  getRoutineById(id: string) {
    const routine = this.routines.find(r => r.id === id)
    if (!routine) return null
    return routine
  }


  // add Routine
  addRoutine(routine: string) {
    const newRoutine: Routine = {
      id: uuidv4(),
      routine,
      isDone: false,
    };
    this.routines.push(newRoutine);
    return newRoutine;
  }

  // update Routine
  updateRoutine(id: string, updatedRoutine: Partial<Routine>) {
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
  deleteRoutine(id: string) {
    const index = this.routines.findIndex((r) => r.id === id);
    if (index !== -1) {
      return this.routines.splice(index, 1)[0]; // 回傳被刪除的 Routine
    }
    return null;
  }
}

export default new Daily();