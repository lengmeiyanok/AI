<script setup lang="ts">
import { ref } from 'vue';
import { Student } from '@/types';

const props = defineProps<{
  student?: Student;
}>();

const emit = defineEmits(['submit', 'cancel']);

const formData = ref<Omit<Student, 'id'>>({
  name: props.student?.name || '',
  gender: props.student?.gender || '男',
  age: props.student?.age || 0,
  class: props.student?.class || '',
});

const submit = () => {
  emit('submit', formData.value);
};

const cancel = () => {
  emit('cancel');
};
</script>

<template>
  <form @submit.prevent="submit" class="student-form">
    <div class="form-group">
      <label>姓名:</label>
      <input v-model="formData.name" required />
    </div>
    <div class="form-group">
      <label>性别:</label>
      <select v-model="formData.gender" required>
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
    </div>
    <div class="form-group">
      <label>年龄:</label>
      <input v-model.number="formData.age" type="number" required />
    </div>
    <div class="form-group">
      <label>班级:</label>
      <input v-model="formData.class" required />
    </div>
    <div class="form-actions">
      <button type="submit" class="btn-primary">{{ student ? '更新' : '添加' }}</button>
      <button type="button" class="btn-secondary" @click="cancel">取消</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.student-form {
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