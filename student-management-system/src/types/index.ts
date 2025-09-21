export interface Student {
  id: string;
  name: string;
  gender: '男' | '女';
  age: number;
  class: string;
}

export interface Score {
  id: string;
  studentId: string;
  subject: Subject;
  score: number;
  examDate: string;
}

export type Subject = '语文' | '数学' | '英语' | '道法' | '历史' | '生物' | '地理' | '物理';