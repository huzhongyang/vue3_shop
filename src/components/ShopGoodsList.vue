<script setup lang="ts">
  import { Ref } from 'vue'
  import { getGoodList, GodListResponseData, GoodListQueryParam } from '../api/goodsControl'
  import router from '../router'

  const queryParam = ref({
    query: '',
    pagenum: 1,
    pagesize: 5
  }) as Ref<GoodListQueryParam>
  const getGoodListResponse = ref() as Ref<GodListResponseData>

  function addGoodsBtn() {
    router.push('goods/add')
  }

  // fixme: 防抖
  async function queryInputChange() {
    getGoodListResponse.value = await getGoodList(queryParam.value)
  }

  async function handleSizeChange(value: number) {
    queryParam.value.pagesize = value
    getGoodListResponse.value = await getGoodList(queryParam.value)
  }

  async function handleCurrentChange(value: number) {
    queryParam.value.pagenum = value
    getGoodListResponse.value = await getGoodList(queryParam.value)
  }

  function addTimeFormat(addTime: string) {
    return new Date(addTime).toLocaleString()
  }

  getGoodListResponse.value = await getGoodList(queryParam.value)
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card style="margin-top: 10px">
    <!-- 搜索框 添加按钮 -->
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="7">
        <el-input v-model="queryParam.query" clearable placeholder="请输入搜索内容" @clear="queryInputChange"
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
      <el-col :span="4">
        <el-button type="primary" @click="addGoodsBtn">添加商品</el-button>
      </el-col>
    </el-row>

    <!-- 商品列表 -->
    <el-table :data="getGoodListResponse.goods" border stripe lazy fit f>
      <el-table-column type="index" label="#" />
      <el-table-column prop="goods_name" label="商品名称" min-width="400px" />
      <el-table-column prop="goods_price" label="商品价格(元)" />
      <el-table-column prop="goods_weight" label="商品重量" />
      <el-table-column prop="add_time" label="创建时间" width="150px">
        <template #default="scope">
          {{ addTimeFormat(scope.row.add_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160px">
        <template v-slot="scope">
          <el-button size="small" type="primary">
            <el-icon size="20">
              <i-ri-edit-2-fill />
            </el-icon>
            编辑
          </el-button>
          <el-button size="small" type="danger">
            <el-icon size="20">
              <i-ic-sharp-delete-forever />
            </el-icon>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部页码 -->
    <el-row style="margin-top: 10px">
      <el-pagination
          v-model:currentPage="queryParam.pagenum"
          v-model:page-size="queryParam.pagesize"
          :page-sizes="[1, 5, 10, 50]"
          :total="getGoodListResponse.total"
          layout="total, sizes, prev, pager, next, jumper"
          small="small"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </el-row>
  </el-card>
</template>

<style scoped>

</style>
