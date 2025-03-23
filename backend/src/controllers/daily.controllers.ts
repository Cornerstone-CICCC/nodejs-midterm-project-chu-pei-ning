import { Request, Response } from "express";
import dailyModels from "../models/daily.models";
import { Routine } from "../types/daily";

//get routines
const getRoutines = (req: Request, res: Response) => {
  const routines = dailyModels.findAllRoutine()
  res.status(200).json(routines)
}

//get routine by id
const getRoutineById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const routine = dailyModels.getRoutineById(id)
  if (!routine) {
    res.status(404).json({ error: "No this routine" })
    return
  }
  res.status(200).json(routine)
}

//add new routine
const addNewRoutine = async (req: Request<{}, {}, Omit<Routine, 'id'>>, res: Response) => {
  const { routine } = req.body
  if (!routine) {
    res.status(500).json({ error: 'Routine is empty!' })
    return
  }
  const newRoutine = await dailyModels.addRoutine(routine)
  if (!newRoutine) {
    res.status(409).json({ error:"" })
    return
  }
  res.status(201).json(newRoutine)
}

//update the routine
const updateUserById = async (req: Request<{ id: string }, Partial<Routine>>, res: Response) => {
  const { id } = req.params
  const { routine} = req.body
  const item = await dailyModels.updateRoutine(id, {routine})
  if (!item) {
    res.status(404).json({ error: "Routine does not exist!" })
    return
  }
  res.status(200).json(item)
} 

//delete the routine
const deleteUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const result = dailyModels.deleteRoutine(id)
  if (!result) {
    res.status(404).json({ message: "Routine not found!" })
    return
  }
  res.status(200).json({ message: "Deleted routine!" })
}


export default {
  getRoutines,
  getRoutineById,
  addNewRoutine,
  updateUserById,
  deleteUserById
}