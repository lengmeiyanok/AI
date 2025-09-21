<script setup lang="ts">
import { ref } from 'vue';
import { Score } from '@/types';
import ScoreForm from './ScoreForm.vue';

const props = defineProps<{
  scores: Score[];
  studentId?: string;
}>();

const emit = defineEmits(['delete', 'update', 'add']);

const showForm = ref(false);
const editingScore = ref<Score | null>(null);

const editScore = (score: Score) => {
  editingScore.value = score;
  showForm.value = true;
};

const addScore = () => {
  editingScore.value = null;
  showForm.value = true;
};

const handleSubmit = (scoreData: Omit<Score, 'id'>) => {
  if (editingScore.value) {
    emit('update', editingScore.value.id, scoreData);
  } else {
    emit('add', scoreData);
  }
  showForm.value = false;
};
</script>

<template>
  <div class="score-management">
    <div class="header">
      <h2>成绩管理</h2>
      <button @click="addScore" class="add-btn">添加成绩</button>
    </div>
    
    <ScoreForm
      v-if="showForm"
      :score="editingScore"
      :student-id="studentId"
      @submit="handleSubmit"
      @cancel="showForm = false"
    />
    
    <div class="table-container">
      <table class="score-table">
        <thead>
          <tr>
            <th>学科</th>
            <th>分数</th>
            <th>考试日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in scores" :key="score.id">
            <td>{{ score.subject }}</td>
            <td>{{ score.score }}</td>
            <td>{{ score.examDate }}</td>
            <td class="actions">
              <button @click="editScore(score)" class="edit-btn">编辑</button>
              <button @click="$emit('delete', score.id)" class="delete-btn">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.score-management {
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

  .score-table {
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

      button {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
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
    }
  }
}
</style>