// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import StudentView from '@/views/StudentView.vue';
import ScoreView from '@/views/ScoreView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'students',
      component: StudentView,
    },
    {
      path: '/scores/:id',
      name: 'scores',
      component: ScoreView,
      props: true,
    },
  ],
});

export default router;