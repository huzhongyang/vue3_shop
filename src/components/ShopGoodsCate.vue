<script setup lang="ts">
  import { CascaderProps, ElForm, FormRules } from 'element-plus'
  import { Ref } from 'vue'
  import {
    AddGoodsCategoryParam,
    GetGoodsCategoryList,
    getGoodsCategoryList,
    Goods,
    postCategory,
    QueryParam
  } from '../api/goodsControl'

  const queryParam = ref({
    type: 3,
    pagenum: 1,
    pagesize: 5
  }) as Ref<QueryParam>
  const goodsCategoryList = ref() as Ref<GetGoodsCategoryList>
  const addCategoryDialogVisable = ref(false)
  const addCategoryDialogFormRef = ref() as Ref<InstanceType<typeof ElForm>>
  const addCategoryDialogFormData = ref({
    cat_name: '',
    cat_level: 0,
    cat_pid: 0
  }) as Ref<AddGoodsCategoryParam>
  const addCategoryDialogFormCascaderData = ref() as Ref<[Goods]>
  const addCategoryDialogFormCascaderProps = ref({
    value: 'cat_id',
    label: 'cat_name',
    checkStrictly: true
  }) as Ref<CascaderProps>
  const cascaderSelectedData = ref([])
  const addCategoryDialogFormRules = ref({
    cat_name: [{
      required: true,
      message: '请输入分类名称',
      trigger: 'blur'
    }]
  }) as Ref<FormRules>

  async function clickAddCategoryBtn() {
    addCategoryDialogFormCascaderData.value = await getGoodsCategoryList({ type: 2 }) as [Goods]
    addCategoryDialogVisable.value = !addCategoryDialogVisable.value
  }

  function addCategory() {
    addCategoryDialogFormRef.value.validate(async (validate) => {
      if (validate) {
        await postCategory(addCategoryDialogFormData.value)
        goodsCategoryList.value = await getGoodsCategoryList(queryParam.value) as GetGoodsCategoryList
        addCategoryDialogVisable.value = !addCategoryDialogVisable.value
      }
    })
  }

  function addCategoryDialogFormCascaderChanged() {
    if (cascaderSelectedData.value === null) {
      addCategoryDialogFormData.value.cat_pid = 0
      addCategoryDialogFormData.value.cat_level = 0
    } else {
      switch (cascaderSelectedData.value.length) {
        case 0:
          addCategoryDialogFormData.value.cat_pid = 0
          addCategoryDialogFormData.value.cat_level = 0
          break
        case 1:
          addCategoryDialogFormData.value.cat_pid = cascaderSelectedData.value[cascaderSelectedData.value.length - 1]
          addCategoryDialogFormData.value.cat_level = 1
          break
        case 2:
          addCategoryDialogFormData.value.cat_pid = cascaderSelectedData.value[cascaderSelectedData.value.length - 1]
          addCategoryDialogFormData.value.cat_level = 2
          break
      }
    }
  }

  function addCategoryDialogClosed() {
    addCategoryDialogFormRef.value.resetFields()
  }

  // X 条/页 改变时
  async function handleSizeChange(size: number) {
    queryParam.value.pagesize = size
    goodsCategoryList.value = await getGoodsCategoryList(queryParam.value) as GetGoodsCategoryList
  }

  // 当前页码改变时
  async function handleCurrentChange(currentPage: number) {
    queryParam.value.pagenum = currentPage
    goodsCategoryList.value = await getGoodsCategoryList(queryParam.value) as GetGoodsCategoryList
  }

  goodsCategoryList.value = await getGoodsCategoryList(queryParam.value) as GetGoodsCategoryList
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card style="margin-top: 20px">
    <el-button type="primary" @click="clickAddCategoryBtn">添加分类</el-button>

    <el-row style="margin: 20px 0">
      <el-table :data="goodsCategoryList.result"
                border
                stripe
                row-key="cat_id"
                lazy
      >
        <!--<el-table-column type="index" label="#" :index="countIndex" />-->
        <el-table-column prop="cat_name" label="分类名称" />
        <el-table-column prop="cat_deleted" label="是否有效">
          <template #default="scope">
            <el-icon v-if="!scope.row.cat_deleted" color="green">
              <i-ic-round-task-alt />
            </el-icon>
            <el-icon v-else>
              <i-ic-round-close />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template #default="scope">
            <el-tag v-if="scope.row.cat_level===0">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level===1">二级</el-tag>
            <el-tag v-else-if="scope.row.cat_level===2">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
    </el-row>

    <!-- 底部页码 -->
    <el-row>
      <el-pagination
          v-model:currentPage="queryParam.pagenum"
          v-model:page-size="queryParam.pagesize"
          :page-sizes="[1, 5, 10, 50]"
          :total="goodsCategoryList.total"
          layout="total, sizes, prev, pager, next, jumper"
          small="small"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </el-row>
  </el-card>

  <!-- 添加分类 dialog -->
  <el-dialog v-model="addCategoryDialogVisable"
             title="添加分类"
             width="500px"
             @closed="addCategoryDialogClosed"
  >
    <el-form ref="addCategoryDialogFormRef"
             :model="addCategoryDialogFormData"
             :rules="addCategoryDialogFormRules"
             label-width="auto"
    >
      <el-form-item prop="cat_name" label="分类名称">
        <el-input v-model="addCategoryDialogFormData.cat_name" />
      </el-form-item>
      <el-form-item label="父级分类">
        <el-cascader v-model="cascaderSelectedData"
                     :options="addCategoryDialogFormCascaderData"
                     :props="addCategoryDialogFormCascaderProps"
                     clearable
                     @change="addCategoryDialogFormCascaderChanged"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="addCategoryDialogVisable=!addCategoryDialogVisable">取消</el-button>
      <el-button type="primary" @click="addCategory">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
