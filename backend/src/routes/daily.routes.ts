import { Router } from "express";
import dailyControllers from "../controllers/daily.controllers";

const dailyRouter = Router()

dailyRouter.get('/', dailyControllers.getRoutines)
dailyRouter.get('/:id', dailyControllers.getRoutineById)
dailyRouter.post('/', dailyControllers.addNewRoutine)
dailyRouter.put('/:id', dailyControllers.updateUserById)
dailyRouter.delete('/:id', dailyControllers.deleteUserById)

export default dailyRouter