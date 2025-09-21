<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStudentStore } from '@/stores/studentStore';
import { useScoreStore } from '@/stores/scoreStore';
import ScoreList from '../components/ScoreList.vue';

const route = useRoute();
const studentStore = useStudentStore();
const scoreStore = useScoreStore();

const studentId = route.params.id as string;
const student = studentStore.getStudentById(studentId);

const handleAddScore = (score: Omit<Score, 'id'>) => {
  scoreStore.addScore(score);
};

const handleUpdateScore = (id: string, score: Partial<Omit<Score, 'id'>>) => {
  scoreStore.updateScore(id, score);
};

const handleDeleteScore = (id: string) => {
  scoreStore.deleteScore(id);
};
</script>

<template>
  <div class="score-view">
    <div v-if="student" class="student-info">
      <h2>{{ student.name }}的成绩管理</h2>
      <p>班级: {{ student.class }}</p>
    </div>
    
    <ScoreList
      :scores="scoreStore.getScoresByStudentId(studentId)"
      :student-id="studentId"
      @add="handleAddScore"
      @update="handleUpdateScore"
      @delete="handleDeleteScore"
    />
    
    <router-link to="/" class="back-link">返回学生列表</router-link>
  </div>
</template>

<style scoped lang="scss">
.score-view {
  padding: 20px;

  .student-info {
    margin-bottom: 20px;
    
    h2 {
      margin: 0 0 10px 0;
      color: #333;
    }
    
    p {
      margin: 0;
      color: #666;
    }
  }

  .back-link {
    display: inline-block;
    margin-top: 20px;
    padding: 8px 16px;
    background-color: #6c757d;
    color: white;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background-color: #5a6268;
    }
  }
}
</style>