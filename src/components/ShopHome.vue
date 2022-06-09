<template>
  <el-container>

    <!-- top -->
    <el-header>
      <div class="top">
        <el-icon color="white" size="40px">
          <i-bi-shop />
        </el-icon>
        <h2 style="color: white">电商后台管理系统</h2>
        <el-button @click="logout"
                   type="info"
                   auto-insert-space
                   class="logout"
        >注销
        </el-button>
      </div>
    </el-header>
    <el-container>

      <!-- aside -->
      <el-aside width="200px">

      </el-aside>

      <!-- main -->
      <el-main>

      </el-main>
    </el-container>
  </el-container>
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
  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #363C40;
  }

  .top {
    display: flex;
    align-items: center;
    column-gap: 20px;
    height: 100%;
  }

  .logout {
    position: absolute;
    right: 20px;
  }

  .el-aside {
    background-color: #313742;
  }
</style>
