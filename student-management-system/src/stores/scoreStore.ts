// src/stores/scoreStore.ts
import { defineStore } from 'pinia';
import type { Score, Subject } from '../types';

export const useScoreStore = defineStore('score', {
  state: () => ({
    scores: [
      {
        id: '1',
        studentId: '1',
        subject: '语文',
        score: 85,
        examDate: '2023-05-10',
      },
      {
        id: '2',
        studentId: '1',
        subject: '数学',
        score: 90,
        examDate: '2023-05-11',
      },
    ] as Score[],
  }),
  actions: {
    addScore(score: Omit<Score, 'id'>) {
      const newScore: Score = {
        ...score,
        id: Date.now().toString(),
      };
      this.scores.push(newScore);
    },
    updateScore(id: string, updatedScore: Partial<Omit<Score, 'id'>>) {
      const index = this.scores.findIndex(s => s.id === id);
      if (index !== -1) {
        this.scores[index] = { ...this.scores[index], ...updatedScore };
      }
    },
    deleteScore(id: string) {
      this.scores = this.scores.filter(s => s.id !== id);
    },
    getScoresByStudentId(studentId: string) {
        // debugger
      return this.scores.filter(s => s.studentId === studentId);
    },
  },
  getters: {
    subjects(): Subject[] {
      return ['语文', '数学', '英语', '道法', '历史', '生物', '地理', '物理'];
    },
  },
});