<template>
  <h1>Welcom Home</h1>
  <el-button @click="logout"
             type="primary"
             auto-insert-space
  >注销
  </el-button>
</template>

<script setup lang="ts">
  import router from '../router'

  function logout () {
    window.localStorage.removeItem('loginToken')
    // 会使页面出现短暂空白 并且耗费性能
    // window.location.reload()
    router.push('/login')
  }
</script>

<style scoped>

</style>
