"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class DiaryService {
    constructor() {
        this.diaries = [];
    }
    findAllDiary() {
        return this.diaries;
    }
    getDiaryByDate(date) {
        const diary = this.diaries.find(d => d.date === date);
        if (!diary)
            return null;
        return diary;
    }
    //add diary
    addDiary(diary) {
        const { date, mood, weather, content } = diary;
        const newDiary = {
            id: (0, uuid_1.v4)(),
            date,
            mood,
            weather,
            content
        };
        this.diaries.push(newDiary);
        return newDiary;
    }
    //update the diary
    updateDiary(id, updateDiary) {
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
    deleteDiary(id) {
        const index = this.diaries.findIndex((d) => d.id === id);
        if (index !== -1) {
            return this.diaries.splice(index, 1)[0]; // 回傳被刪除的 Routine
        }
        return null;
    }
}
exports.default = new DiaryService();
