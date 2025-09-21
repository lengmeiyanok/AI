<script setup lang="ts">
import { ref } from 'vue';
import { Score, Subject } from '@/types';

const props = defineProps<{
  score?: Score;
  studentId?: string;
}>();

const emit = defineEmits(['submit', 'cancel']);

const formData = ref<Omit<Score, 'id'>>({
  studentId: props.score?.studentId || props.studentId || '',
  subject: props.score?.subject || '语文',
  score: props.score?.score || 0,
  examDate: props.score?.examDate || new Date().toISOString().split('T')[0],
});

const submit = () => {
  emit('submit', formData.value);
};

const cancel = () => {
  emit('cancel');
};
</script>

<template>
  <form @submit.prevent="submit" class="score-form">
    <div class="form-group">
      <label>学科:</label>
      <select v-model="formData.subject" required>
        <option v-for="subject in ['语文', '数学', '英语', '道法', '历史', '生物', '地理', '物理']" 
                :key="subject" 
                :value="subject">
          {{ subject }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label>分数:</label>
      <input v-model.number="formData.score" type="number" min="0" max="100" required />
    </div>
    <div class="form-group">
      <label>考试日期:</label>
      <input v-model="formData.examDate" type="date" required />
    </div>
    <div class="form-actions">
      <button type="submit" class="btn-primary">{{ score ? '更新' : '添加' }}</button>
      <button type="button" class="btn-secondary" @click="cancel">取消</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.score-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input, select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-primary {
      background-color: #42b983;
      color: white;

      &:hover {
        background-color: #3aa876;
      }
    }

    .btn-secondary {
      background-color: #f0f0f0;
      color: #333;

      &:hover {
        background-color: #e0e0e0;
      }
    }
  }
}
</style>