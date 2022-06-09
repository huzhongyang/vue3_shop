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
        <el-menu @open="openAsideMenu"
                 @close="closeAsideMenu"
                 unique-opened
                 text-color="#333744"
        >
          <el-sub-menu v-for="(asideMenu) in asideMenus"
                       :key="asideMenu.id"
                       :index="`${asideMenu.id}`"
                       :popper-offset="0"
          >
            <template #title>
              <el-icon>
                <i-ic-outline-shopping-bag />
              </el-icon>
              <span> {{ asideMenu.authName }}</span>
            </template>
            <el-menu-item v-for="(asideMenuItem) in asideMenu.children"
                          :key="asideMenuItem.id"
            >
              {{ asideMenuItem.authName }}
            </el-menu-item>
          </el-sub-menu>

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
  import { onMounted, Ref } from 'vue'
  import { getAsideMenus } from '../api'
  import { MenuItem } from '../api/getAsideMenus'
  import router from '../router'

  let isCollapse = ref(false)
  /*
   let a = ref<[MenuItem]>()
   =>  a: [MenuItem] | undefined
   */
  // 泛型的类型未知时 用 Ref<T>
  let asideMenus = ref() as Ref<[MenuItem]>

  // 点击打开左侧菜单
  function openAsideMenu(key: string, keyPath: string[]) {
    console.log(`${ key }: ${ keyPath }`)
  }

  // 点击关闭左侧菜单
  function closeAsideMenu() {
    console.log('close')
  }

  onMounted(async () => {
    const asideMenusData = await getAsideMenus()
    console.log(asideMenusData)
    if (asideMenusData.meta.status !== 200) ElMessage.error(asideMenusData.meta.msg)
    ElMessage.success(asideMenusData.meta.msg)
    asideMenus.value = asideMenusData.data
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

  /*.el-aside {*/
  /*  background-color: #313742;*/
  /*}*/

  .el-radio-button {
    width: 100%;
  }

  /*.el-menu, .el-sub-menu, .el-menu-item {*/
  /*  background-color: #313742;*/
  /*  color: white;*/
  /*}*/

  /*.el-menu .el-icon, span {*/
  /*  color: white;*/
  /*}*/
</style>
