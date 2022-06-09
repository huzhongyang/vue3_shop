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
        <el-radio-button v-model="isCollapse" @click="isCollapse=!isCollapse">|||</el-radio-button>
        <el-menu default-active="1"
                 unique-opened
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <i-ic-outline-shopping-bag />
              </el-icon>
              <span>one</span>
            </template>
            <el-menu-item>
              1-1
            </el-menu-item>

          </el-sub-menu>
          <el-menu-item>
            2-1
          </el-menu-item>
          <el-menu-item>
            2-2
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- main -->
      <el-main>

      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import { onMounted } from 'vue'
  import { getAsideMenus } from '../api'
  import router from '../router'

  let isCollapse = ref(false)

  onMounted(async () => {
    const asideMenus = await getAsideMenus()
    console.log(asideMenus)
    if (asideMenus.meta.status !== 200) ElMessage.error(asideMenus.meta.msg)
    ElMessage.success(asideMenus.meta.msg)
  })

  function logout() {
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

  .el-radio-button {
    width: 100%;
  }

  .el-menu, .el-sub-menu, .el-menu-item {
    background-color: #313742;
    color: white;
  }

  .el-menu .el-icon, span {
    color: white;
  }
</style>
