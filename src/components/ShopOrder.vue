<script setup lang="ts">

  import { Ref } from 'vue'
  import { getOrders, Order, QueryParam } from '../api/orders'
  import { timeFormat } from '../utils'

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
  const logisticData = [
    {
      "time": "2018-05-10 09:39:00",
      "ftime": "2018-05-10 09:39:00",
      "context": "已签收,感谢使用顺丰,期待再次为您服务",
      "location": ""
    }, {
      "time": "2018-05-10 08:23:00",
      "ftime": "2018-05-10 08:23:00",
      "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
      "location": ""
    }, {
      "time": "2018-05-10 07:32:00",
      "ftime": "2018-05-10 07:32:00",
      "context": "快件到达 [北京海淀育新小区营业点]",
      "location": ""
    }, {
      "time": "2018-05-10 02:03:00",
      "ftime": "2018-05-10 02:03:00",
      "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
      "location": ""
    }, {
      "time": "2018-05-09 23:05:00",
      "ftime": "2018-05-09 23:05:00",
      "context": "快件到达 [北京顺义集散中心]",
      "location": ""
    }, {
      "time": "2018-05-09 21:21:00",
      "ftime": "2018-05-09 21:21:00",
      "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
      "location": ""
    }, {
      "time": "2018-05-09 13:07:00",
      "ftime": "2018-05-09 13:07:00",
      "context": "顺丰速运 已收取快件",
      "location": ""
    }, {
      "time": "2018-05-09 12:25:03",
      "ftime": "2018-05-09 12:25:03",
      "context": "卖家发货",
      "location": ""
    }, {
      "time": "2018-05-09 12:22:24",
      "ftime": "2018-05-09 12:22:24",
      "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
      "location": ""
    }, {
      "time": "2018-05-08 21:36:04",
      "ftime": "2018-05-08 21:36:04",
      "context": "商品已经下单",
      "location": ""
    }]
  const logisticDialogVisable = ref(false)

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
        <el-table-column prop="pay_status" label="是否付款">
          <template #default="scope">
            <el-tag v-if="scope.row.pay_status==='0'" type="danger">未付款</el-tag>
            <el-tag v-else-if="scope.row.pay_status==='1'" type="success">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" />
        <el-table-column prop="create_time" label="下单时间">
          <template #default="scope">
            {{ timeFormat(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-tooltip effect="dark"
                        content="修改地址"
                        :enterable=false
            >
              <el-button class="btn" size="small" type="primary">
                <el-icon size="20">
                  <i-ri-edit-2-fill />
                </el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark"
                        content="物流信息"
                        :enterable=false
            >
              <el-button class="btn" size="small" color="#60B133" @click="logisticDialogVisable=!logisticDialogVisable">
                <el-icon size="20" color="white">
                  <i-ion-ios-location />
                </el-icon>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
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

  <!-- 物流信息 dialog -->
  <el-dialog v-model="logisticDialogVisable" title="物流信息">
    <el-timeline>
      <el-timeline-item
          v-for="(activity, index) in logisticData"
          :key="index"
          :timestamp="activity.time"
      >
        {{ activity.context }}
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<style scoped>
  .btn {
    width: 36px;
  }
</style>
