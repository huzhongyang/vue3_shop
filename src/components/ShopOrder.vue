<script setup lang="ts">

  import { Ref } from 'vue'
  import { getOrders, Order, QueryParam } from '../api/orders'

  const orderQueryParam = ref({
    query: '',
    pagenum: 1,
    pagesize: 5
  }) as Ref<QueryParam>
  type OrderResponse = {
    total: number,
    pagenum: string,
    goods: Order[]
  }
  const getOrderResponse = ref() as Ref<OrderResponse>

  function queryInputChange() {

  }

  async function handleSizeChange(pageSize: number) {
    console.log(2)
    orderQueryParam.value.pagesize = pageSize
    getOrderResponse.value = await getOrders(orderQueryParam.value)
  }

  async function handleCurrentChange(currentPage: number) {
    orderQueryParam.value.pagenum = currentPage
    getOrderResponse.value = await getOrders(orderQueryParam.value)
  }

  getOrderResponse.value = await getOrders(orderQueryParam.value)
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
        <el-input v-model="orderQueryParam.query"
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
      <el-table :data="getOrderResponse.goods" border stripe>
        <el-table-column type="index" label="#" />
        <el-table-column prop="order_number" label="订单编号" />
        <el-table-column prop="order_price" label="订单价格" />
        <el-table-column prop="order_pay" label="是否付款" />
        <el-table-column prop="is_send" label="是否发货" />
        <el-table-column prop="create_time" label="下单时间" />
        <el-table-column label="操作" />
      </el-table>
    </el-row>

    <!-- 底部页码 -->
    <el-row style="margin-top: 10px">
      <el-pagination v-model:current-page="orderQueryParam.pagenum"
                     v-model:page-size="orderQueryParam.pagesize"
                     :total="getOrderResponse.total"
                     :page-sizes="[1, 5, 10, 50]"
                     small="small"
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
      />
    </el-row>
  </el-card>
</template>

<style scoped>

</style>
