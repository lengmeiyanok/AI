<script setup lang="ts">
import { useStudentStore } from '../stores/studentStore';
import StudentList from '../components/StudentList.vue';

const studentStore = useStudentStore();

const handleAddStudent = (student: Omit<Student, 'id'>) => {
  studentStore.addStudent(student);
};

const handleUpdateStudent = (id: string, student: Partial<Omit<Student, 'id'>>) => {
  studentStore.updateStudent(id, student);
};

const handleDeleteStudent = (id: string) => {
  studentStore.deleteStudent(id);
};
</script>

<template>
  <div class="student-view">
    <StudentList
      :students="studentStore.students"
      @add="handleAddStudent"
      @update="handleUpdateStudent"
      @delete="handleDeleteStudent"
    />
  </div>
</template>

<style scoped lang="scss">
.student-view {
  padding: 20px;
}
</style>