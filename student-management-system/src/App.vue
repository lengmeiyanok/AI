<!-- src/App.vue -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">学生管理系统</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
header {
  background-color: #42b983;
  padding: 1rem;

  nav {
    max-width: 1200px;
    margin: 0 auto;

    a {
      color: white;
      text-decoration: none;
      font-weight: bold;
      font-size: 1.2rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>