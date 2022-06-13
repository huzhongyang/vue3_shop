<!-- async 表名为异步组件 -->
<script async setup lang="ts">

  import { Ref } from 'vue'
  import { getUserList } from '../api'
  import { QueryParam, User } from '../api/getUserList'

  interface QueryResponse {
    pagenum: number,
    total: number,
    users: [User]
  }

  // 查询参数
  const queryParam = ref<QueryParam>({
    query: '',
    pagenum: 1,
    pagesize: 5
  })
  // 查询返回结果
  const queryResponse = ref() as Ref<QueryResponse>

  // Vue3 中 create 生命周期为 setup
  // 在组件 create 时请求数据
  queryResponse.value = await getUserList(queryParam.value)

  const total = queryResponse.value.users.length

  // 每页展示数据条目
  async function handleSizeChange(pageSize: number) {
    queryResponse.value = await getUserList(queryParam.value)
  }

  // 前往某页
  async function handleCurrentChange(currentPage: number) {
    queryResponse.value = await getUserList(queryParam.value)
  }
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 主体内容 -->
  <el-card class="main-box">
    <el-row :gutter="20">
      <el-col :span="9">
        <el-input v-model="queryParam.query" placeholder="请输入搜索内容" clearable>
          <template #append>
            <el-icon>
              <i-ion-search />
            </el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- table 展示 -->
    <el-row style="margin: 15px 0">
      <el-table
          :data="queryResponse.users"
          border
          stripe
          style="width: 100%"
      >
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="username" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="role_name" label="角色" />
        <el-table-column label="状态" />
        <el-table-column label="操作" />
      </el-table>
    </el-row>

    <!-- 底部页码 -->
    <el-row>
      <el-pagination
          v-model:currentPage="queryParam['pagenum']"
          v-model:page-size="queryParam['pagesize']"
          :page-sizes="[1, 5, 10, 50]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          small="small"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </el-row>
  </el-card>
</template>

<style scoped>
  .main-box {
    height: 100%;
    margin: 15px 0;
  }

  .main-box .el-input {
    min-width: 100px;
  }
</style>
