import { v4 as uuidv4 } from "uuid"
import { Diary } from "../types/diary"

class DiaryService {
  private diaries: Diary[] = []

  findAllDiary() {
    return this.diaries
  }

  getDiaryByDate(date: string) {
    const diary = this.diaries.find(d => d.date === date)
    if (!diary) return null
    return diary
  }

  //add diary
  addDiary(diary: Omit<Diary, 'id'>) {
    const { date, mood, weather, content } = diary
    
    const newDiary: Diary = {
      id: uuidv4(),
      date,
      mood,
      weather,
      content
    }
    this.diaries.push(newDiary)
    return newDiary
  }

  //update the diary
  updateDiary(id: string, updateDiary: Partial<Diary>) {
    const index = this.diaries.findIndex((d) => d.id === id);
    if (index !== -1) {
      const diaries = this.diaries[index];
  
      if (updateDiary.date !== undefined) {
        diaries.date = updateDiary.date;
      }

      if (updateDiary.mood !== undefined) {
        diaries.mood = updateDiary.mood;
      }

      if (updateDiary.weather !== undefined) {
        diaries.weather = updateDiary.weather;
      }

      if (updateDiary.content !== undefined) {
        diaries.content = updateDiary.content;
      }

      return diaries;
    }
    return null;
  }

  //delete diary
  deleteDiary(id: string) {
    const index = this.diaries.findIndex((d) => d.id === id);
    if (index !== -1) {
      return this.diaries.splice(index, 1)[0]; // 回傳被刪除的 Routine
    }
    return null;
  }
}

export default new DiaryService();