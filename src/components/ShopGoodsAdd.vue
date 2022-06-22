<script setup lang="ts">

  import { CascaderProps, ElForm, ElMessage, ExpandTrigger, FormRules } from 'element-plus'
  import { Ref } from 'vue'
  import { CategoryAttribute, getCategoryAttributes, getGoodsCategoryList, Good, Goods } from '../api/goodsControl'

  // 当前活动的标签/进度
  const stepActive = ref('0') as Ref<string>
  const goodsData = ref({
    goods_id: 0,
    goods_name: '',
    goods_price: 0,
    goods_number: 0,
    goods_weight: 0,
    goods_state: null,
    add_time: '',
    goods_cat: ''
  }) as Ref<Good>
  const goodsFormRef = ref() as Ref<InstanceType<typeof ElForm>>
  const goodsFormRules = ref({
    goods_name: [{
      required: true,
      message: '请输入商品名称',
      trigger: 'blur'
    }],
    goods_price: [{
      required: true,
      message: '请输入商品价格',
      trigger: 'blur'
    }],
    goods_weight: [{
      required: true,
      message: '请输入商品重量',
      trigger: 'blur'
    }],
    goods_number: [{
      required: true,
      message: '请输入商品库存',
      trigger: 'blur'
    }],
    goods_cat: [{
      required: true,
      message: '请输入商品分类',
      trigger: 'blur'
    }]
  }) as Ref<FormRules>
  const goodsCategoryData = ref() as Ref<[Goods]>
  const cascaderProps = ref({
    placeholder: '请选择商品分类',
    expandTrigger: ExpandTrigger.HOVER,
    label: 'cat_name',
    value: 'cat_id'
  }) as Ref<CascaderProps>
  const cascaderSelected = ref() as Ref<number[]>
  const catId = computed(() => {
    return cascaderSelected.value[2]
  })
  const categoryAttributes = ref() as Ref<[CategoryAttribute]>

  function cascaderSelectedChanged() {
    if (cascaderSelected.value.length !== 3) cascaderSelected.value = []
    goodsData.value.goods_cat = cascaderSelected.value.join(',')
  }

  // 切换 tag 标签时, 验证表单
  async function handelBeforeLeave(activeName: string, oldActiveName: string) {
    if (oldActiveName === '0') {
      const res = await goodsFormRef.value.validate((validate: boolean) => {
        if (!validate) ElMessage.error('请填写完整表单')
      })
      if (!res) return false
    }
  }

  // 点击 tab 标签
  async function handelTabChange(tabName: string) {
    switch (tabName) {
        // ToDo: P160 分类参数 many
      case '1':

        break
      case '2':
        // ToDo: 商品属性
        categoryAttributes.value = await getCategoryAttributes(catId.value, 'only')
        break
    }
  }

  goodsCategoryData.value = await getGoodsCategoryList({}) as [Goods]
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加商品</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card style="margin-top: 10px">
    <el-alert :closable="false" center show-icon title="添加商品信息" type="info" />
    <!-- 进度条 -->
    <el-row style="margin: 15px 0">
      <el-steps :active="stepActive-0" align-center style="width: 100%">
        <el-step title="基本信息" />
        <el-step title="商品参数" />
        <el-step title="商品属性" />
        <el-step title="商品图片" />
        <el-step title="商品内容" />
        <el-step title="完成" />
      </el-steps>
    </el-row>
    <el-row>
      <el-form :model="goodsData" ref="goodsFormRef" :rules="goodsFormRules" label-position="top">
        <el-tabs v-model="stepActive"
                 :before-leave="handelBeforeLeave"
                 tab-position="left"
                 @tab-change="handelTabChange"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="goodsData.goods_name" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="goodsData.goods_price" type="number" placeholder="请输入商品价格" />
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="goodsData.goods_weight" type="number" placeholder="请输入商品重量" />
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="goodsData.goods_number" type="number" placeholder="请输入商品数量" />
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader v-model="cascaderSelected"
                           :options="goodsCategoryData"
                           :props="cascaderProps"
                           @change="cascaderSelectedChanged"
              />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">Config</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">Role</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">Task</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">Task</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-row>
  </el-card>
</template>

<style scoped>
  .el-form {
    width: 100%;
  }
</style>
