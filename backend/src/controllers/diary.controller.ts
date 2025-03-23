import { Request, Response } from "express";
import diaryModels from "../models/diary.models";
import { Diary } from "../types/diary";

//get diaries
const getDiaries = (req: Request, res: Response) => {
  const routines = diaryModels.findAllDiary()
  res.status(200).json(routines)
}

//get diary by date
const getByDate = (req: Request<{ date: string }>, res: Response) => {
  const { date } = req.body
  const routine = diaryModels.getDiaryByDate(date)
  if (!routine) {
    res.status(404).json({ error: "No this routine" })
    return
  }
  res.status(200).json(routine)
}

//add new diary
const addNewDiary = async (req: Request<{}, {}, Omit<Diary, 'id'>>, res: Response) => {
  const { date, mood, weather, content  } = req.body
  if (!date || !mood || !weather || !content) {
    res.status(500).json({ error: 'Routine is empty!' })
    return
  }
  const newRoutine = await diaryModels.addDiary({ date, mood, weather, content })
  if (!newRoutine) {
    res.status(409).json({ error:"" })
    return
  }
  res.status(201).json(newRoutine)
}

//update the diary 
const updateDiaryById = async (req: Request<{ id: string }, Partial<Diary>>, res: Response) => {
  const { id } = req.params
  const { date, mood, weather, content  } = req.body
  const item = await diaryModels.updateDiary(id, { date, mood, weather, content })
  if (!item) {
    res.status(404).json({ error: "Routine does not exist!" })
    return
  }
  res.status(200).json(item)
} 

//delete the diary
const deleteDiaryById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const result = diaryModels.deleteDiary(id)
  if (!result) {
    res.status(404).json({ message: "Diary not found!" })
    return
  }
  res.status(200).json({ message: "Deleted diary!" })
}

export default {
  getDiaries,
  addNewDiary,
  updateDiaryById,
  deleteDiaryById
}