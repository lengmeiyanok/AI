<script setup lang="ts">
import { ref } from 'vue';
import { Student } from '@/types';
import StudentForm from './StudentForm.vue';

const props = defineProps<{
  students: Student[];
}>();

const emit = defineEmits(['delete', 'update', 'add']);

const showForm = ref(false);
const editingStudent = ref<Student | null>(null);

const editStudent = (student: Student) => {
  editingStudent.value = student;
  showForm.value = true;
};

const addStudent = () => {
  editingStudent.value = null;
  showForm.value = true;
};

const handleSubmit = (studentData: Omit<Student, 'id'>) => {
  if (editingStudent.value) {
    emit('update', editingStudent.value.id, studentData);
  } else {
    emit('add', studentData);
  }
  showForm.value = false;
};
</script>

<template>
  <div class="student-management">
    <div class="header">
      <h2>学生列表</h2>
      <button @click="addStudent" class="add-btn">添加学生</button>
    </div>
    
    <StudentForm
      v-if="showForm"
      :student="editingStudent"
      @submit="handleSubmit"
      @cancel="showForm = false"
    />
    
    <div class="table-container">
      <table class="student-table">
        <thead>
          <tr>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>班级</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.gender }}</td>
            <td>{{ student.age }}</td>
            <td>{{ student.class }}</td>
            <td class="actions">
              <button @click="editStudent(student)" class="edit-btn">编辑</button>
              <button @click="$emit('delete', student.id)" class="delete-btn">删除</button>
              <router-link :to="`/scores/${student.id}`" class="score-link">查看成绩</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.student-management {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      color: #333;
    }

    .add-btn {
      padding: 8px 16px;
      background-color: #42b983;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #3aa876;
      }
    }
  }

  .table-container {
    overflow-x: auto;
  }

  .student-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f8f9fa;
      font-weight: bold;
      color: #333;
    }

    tr:hover {
      background-color: #f5f5f5;
    }

    .actions {
      display: flex;
      gap: 8px;

      button, a {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-decoration: none;
        font-size: 14px;
      }

      .edit-btn {
        background-color: #ffc107;
        color: #333;

        &:hover {
          background-color: #e0a800;
        }
      }

      .delete-btn {
        background-color: #dc3545;
        color: white;

        &:hover {
          background-color: #c82333;
        }
      }

      .score-link {
        background-color: #17a2b8;
        color: white;

        &:hover {
          background-color: #138496;
        }
      }
    }
  }
}
</style>