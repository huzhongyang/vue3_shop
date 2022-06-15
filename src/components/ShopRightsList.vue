<script setup lang="ts">

  import { Ref } from 'vue'
  import { getRightsList, Right } from '../api/getRightsList'

  const rightsList = ref() as Ref<[Right]>
  rightsList.value = await getRightsList('list')
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card style="margin-top: 20px">
    <el-table :data="rightsList"
              border
              stripe
              style="width: 100%"
    >
      <el-table-column type="index" label="#" width="50" />
      <el-table-column prop="authName" label="权限名称" />
      <el-table-column prop="path" label="路径" />
      <el-table-column label="权限等级">
        <template #default="scope">
          <el-tag v-if="scope.row.level==='0'">一级</el-tag>
          <el-tag v-else-if="scope.row.level==='1'" type="success">二级</el-tag>
          <el-tag v-else-if="scope.row.level==='2'" type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>

</style>
