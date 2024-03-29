<script setup lang="ts">
  import { CascaderProps, ElForm, ElMessageBox, FormRules } from 'element-plus'
  import { Ref } from 'vue'
  import {
    AddGoodsCategoryParam,
    deleteCategory,
    GetGoodsCategoryList,
    getGoodsCategoryList,
    Goods,
    postCategory,
    putCategory,
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
  const editCategoryDialogVisable = ref(false)
  const editCategoryData = ref({
    cate_id: 0,
    cate_name: ''
  })
  const editCategoryFormRef = ref() as Ref<InstanceType<typeof ElForm>>
  const editCategoryFormRules = ref({
    cate_name: [{
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

  function editeCategoryBtn(cate_id: number, cate_name: string) {
    editCategoryData.value.cate_id = cate_id
    editCategoryData.value.cate_name = cate_name
    editCategoryDialogVisable.value = !editCategoryDialogVisable.value
  }

  function editCategory() {
    editCategoryFormRef.value.validate(async (validate) => {
      if (validate) {
        await putCategory(editCategoryData.value.cate_id, editCategoryData.value.cate_name)
        goodsCategoryList.value = await getGoodsCategoryList(queryParam.value) as GetGoodsCategoryList
        editCategoryDialogVisable.value = !editCategoryDialogVisable.value
      }
    })
  }

  async function deleteCategoryBtn(categoryId: number) {
    try {
      await ElMessageBox.confirm('确认删除该分类', '删除分类', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        type: 'warning'
      })
      await deleteCategory(categoryId)
      goodsCategoryList.value = await getGoodsCategoryList(queryParam.value) as GetGoodsCategoryList
    } catch (e) {
    }
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
            <el-button size="small" type="primary" @click="editeCategoryBtn(scope.row.cat_id,scope.row.cat_name)">
              <el-icon size="20">
                <i-ri-edit-2-fill />
              </el-icon>
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="deleteCategoryBtn(scope.row.cat_id)">
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

  <!-- 修改分类 dialog -->
  <el-dialog v-model="editCategoryDialogVisable" title="添加分类" width="500px">
    <el-form :model="editCategoryData" ref="editCategoryFormRef" :rules="editCategoryFormRules" label-width="auto">
      <el-form-item prop="cate_name" label="分类名称">
        <el-input v-model="editCategoryData.cate_name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editCategoryDialogVisable=!editCategoryDialogVisable">取消</el-button>
      <el-button type="primary" @click="editCategory">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
