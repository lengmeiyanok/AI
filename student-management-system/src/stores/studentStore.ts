// src/stores/studentStore.ts
import { defineStore } from 'pinia';
import type { Student } from '@/types'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [
      {
        id: '1',
        name: '张三',
        gender: '男',
        age: 15,
        class: '高一(1)班',
      },
      {
        id: '2',
        name: '李四',
        gender: '女',
        age: 16,
        class: '高一(2)班',
      },
    ] as Student[],
  }),
  actions: {
    addStudent(student: Omit<Student, 'id'>) {
      const newStudent: Student = {
        ...student,
        id: Date.now().toString(),
      };
      this.students.push(newStudent);
    },
    updateStudent(id: string, updatedStudent: Partial<Omit<Student, 'id'>>) {
      const index = this.students.findIndex(s => s.id === id);
      if (index !== -1) {
        this.students[index] = { ...this.students[index], ...updatedStudent };
      }
    },
    deleteStudent(id: string) {
      this.students = this.students.filter(s => s.id !== id);
    },
    getStudentById(id: string) {
      return this.students.find(s => s.id === id);
    },
  },
});