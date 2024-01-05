<template>

    <div class="container error-container">
        <div class="error-heading">401</div>
        <div class="error-message">Unauthorized Access</div>
        <p class="lead mt-4">You don't have permission to access this page.</p>
        <a @click="goBack()" href="javascript:void(0)" class="btn btn-primary mt-3">Go back</a>
    </div>
</template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goBack = () => {
    router.back()
  };
  </script>
  
  <style scoped>
    .error-container {
        text-align: center;
        margin-top: 100px;
    }
    .error-heading {
        font-size: 100px;
        font-weight: bold;
        color: #dc3545;
    }
    .error-message {
        font-size: 24px;
        color: #343a40;
    }
</style>
  