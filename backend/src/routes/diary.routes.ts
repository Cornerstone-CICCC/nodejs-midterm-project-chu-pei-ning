import { Router } from "express";
import diaryController from "../controllers/diary.controller";

const diaryRouter = Router()

diaryRouter.get('/', diaryController.getDiaries)
// diaryRouter.get('/:date', diaryController.addNewDiary)
diaryRouter.post('/', diaryController.addNewDiary)
diaryRouter.put('/:id', diaryController.updateDiaryById)
diaryRouter.delete('/:id', diaryController.deleteDiaryById)


export default diaryRouter