<script setup lang="ts">

  const queryData = ref('')

  function queryInputChange() {

  }
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    <el-breadcrumb-item>订单列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card style="margin-top: 10px">
    <el-row>
      <el-col :span="7">
        <el-input v-model="queryData"
                  clearable
                  placeholder="请输入搜索内容"
                  @clear="queryInputChange"
                  @keyup="queryInputChange"
        >
          <template #append>
            <el-button disabled>
              <el-icon>
                <i-ion-search />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">

    </el-row>
  </el-card>
</template>

<style scoped>

</style>
