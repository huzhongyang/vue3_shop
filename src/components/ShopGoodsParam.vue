<script setup lang="ts">

  import { CascaderProps, ElForm, ElInput, ElMessageBox, ExpandTrigger, FormRules } from 'element-plus'
  import { ref, Ref } from 'vue'
  import {
    AttributeData,
    CategoryAttribute,
    deleteAttribute,
    ExpandRowData,
    getCategoryAttributes,
    getGoodsCategoryList,
    Goods,
    postCategoryAttribute,
    putParam
  } from '../api/goodsControl'

  const goodsCategoryCascaderData = ref() as Ref<[Goods]>
  const goodsCategoryCascaderProps: CascaderProps = {
    value: 'cat_id',
    label: 'cat_name',
    expandTrigger: ExpandTrigger.HOVER,
    emitPath: false
  }
  const selectedCategory = ref(0)
  const activeTab = ref('many') as Ref<'many' | 'only'>
  const attributeData = ref() as Ref<[CategoryAttribute]>
  const dialogTitle = computed(() => {
    switch (activeTab.value) {
      case 'many':
        return '参数'
      case 'only':
        return '属性'
    }
  })
  const addParamDialogVisable = ref(false)
  const addParamDialogFormRef = ref() as Ref<InstanceType<typeof ElForm>>
  const addParamDialogFormRules = ref({
    attr_name: [{
      required: true,
      message: `请输入${ dialogTitle.value }名称`,
      trigger: 'blur'
    }]
  }) as Ref<FormRules>
  const addParamDialogFormData = ref({
    cat_id: 0,
    attr_name: '',
    attr_sel: 'many',
    attr_vals: ''
  }) as Ref<Pick<CategoryAttribute, 'cat_id' | 'attr_name' | 'attr_sel' | 'attr_vals' | 'attr_id'>>
  const editParamDialogVisable = ref(false)
  const selectedAttrId = ref(0)
  // const tagInputVisable = ref(false)
  // const tagInputData = ref('')
  const tagInputRef = ref() as Ref<InstanceType<typeof ElInput>>
  const expandRowData = ref() as Ref<ExpandRowData>

  async function selectedCategoryChange() {
    attributeData.value = await getCategoryAttributes(selectedCategory.value, activeTab.value)
  }

  async function handleClickTab() {
    console.log(activeTab.value)
    attributeData.value = await getCategoryAttributes(selectedCategory.value, activeTab.value)
  }

  function clickAddParamBtn() {
    addParamDialogFormData.value.cat_id = selectedCategory.value
    addParamDialogFormData.value.attr_sel = activeTab.value
    addParamDialogVisable.value = !addParamDialogVisable.value
  }

  function addParam() {
    addParamDialogFormRef.value.validate(async (validata) => {
      if (validata) {
        await postCategoryAttribute(addParamDialogFormData.value)
        attributeData.value = await getCategoryAttributes(selectedCategory.value, activeTab.value)
        addParamDialogVisable.value = !addParamDialogVisable.value
      }
    })
  }

  function addParamDialogClosed() {
    addParamDialogFormRef.value.resetFields()
  }

  async function deleteParam(attrId: number) {
    try {
      await ElMessageBox.confirm(`确认删除该${ dialogTitle.value }`, `删除${ dialogTitle.value }`, {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await deleteAttribute(selectedCategory.value, attrId)
      attributeData.value = await getCategoryAttributes(selectedCategory.value, activeTab.value)
    } catch (e) {
    }
  }

  function clickEditParamBtn(attrName: string, attrId: number) {
    selectedAttrId.value = attrId
    addParamDialogFormData.value.cat_id = selectedCategory.value
    addParamDialogFormData.value.attr_sel = activeTab.value
    addParamDialogFormData.value.attr_name = attrName
    editParamDialogVisable.value = !editParamDialogVisable.value
  }

  function editParam() {
    addParamDialogFormRef.value.validate(async (validata) => {
      if (validata) {
        await putParam(addParamDialogFormData.value, selectedAttrId.value)
        attributeData.value = await getCategoryAttributes(selectedCategory.value, activeTab.value)
        editParamDialogVisable.value = !editParamDialogVisable.value
      }
    })
  }

  async function addTagBtn() {
    expandRowData.value.tagInputVisable = !expandRowData.value.tagInputVisable
    await nextTick()
    tagInputRef.value.input!.focus()
  }

  async function handleTagInputConfirm(data: AttributeData) {
    if (expandRowData.value.tagInputData !== '') {
      expandRowData.value.data.attr_vals += ',' + expandRowData.value.tagInputData.trim()
      await putParam(expandRowData.value.data, data.attr_id)
      expandRowData.value.tagInputData = ''
    }
    expandRowData.value.tagInputVisable = !expandRowData.value.tagInputVisable
  }

  function handleExpandChage(rowData: AttributeData) {
    expandRowData.value = {
      tagInputVisable: false,
      tagInputData: '',
      data: rowData
    }
  }

  goodsCategoryCascaderData.value = await getGoodsCategoryList() as [Goods]
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>分类参数</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card style="margin-top: 10px">
    <el-row>
      <el-alert title="注意: 只允许为第三级分类设置相关参数!" type="warning" show-icon :closable="false" />
    </el-row>
    <el-row style="margin-top: 10px">
      <el-form-item label="选择商品分类:">
        <el-cascader v-model="selectedCategory"
                     :options="goodsCategoryCascaderData"
                     :props="goodsCategoryCascaderProps"
                     clearable
                     @change="selectedCategoryChange"
        />
      </el-form-item>
    </el-row>
    <el-row>
      <el-tabs v-model="activeTab"
               class="eltab"
               @tab-change="handleClickTab"
      >
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" @click="clickAddParamBtn">添加参数</el-button>
          <el-row style="margin-top: 10px">
            <el-table :data="attributeData" border lazy stripe @expand-change="handleExpandChage">
              <el-table-column type="expand">
                <template #default="scope">
                  <el-tag v-if="scope.row.attr_vals!==''"
                          v-for="(tagName, index) in scope.row.attr_vals.split(',')"
                          :key="index"
                          style="margin: 0 5px 5px 5px;"
                          closable
                  >
                    {{ tagName }}
                  </el-tag>
                  <!-- fixme: 每行 input 框状态没有区分, tag 删除没做 -->
                  <el-input v-if="expandRowData.tagInputVisable"
                            ref="tagInputRef"
                            v-model="expandRowData.tagInputData"
                            @keyup.enter="handleTagInputConfirm(scope.row)"
                            @blur="handleTagInputConfirm(scope.row)"
                            autofocus
                            size="small"
                            style="display: inline;"
                  />
                  <el-button v-else size="small" @click="addTagBtn">
                    + New Tag
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column prop="attr_name" label="参数名称"></el-table-column>
              <el-table-column label="操作">
                <template v-slot="scope">
                  <el-button size="small" type="primary"
                             @click="clickEditParamBtn(scope.row.attr_name,scope.row.attr_id)"
                  >
                    <el-icon size="20">
                      <i-ri-edit-2-fill />
                    </el-icon>
                    编辑
                  </el-button>
                  <el-button size="small" type="danger" @click="deleteParam(scope.row.attr_id)">
                    <el-icon size="20">
                      <i-ic-sharp-delete-forever />
                    </el-icon>
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" @click="clickAddParamBtn">添加属性</el-button>
          <el-row style="margin-top: 10px">
            <el-table :data="attributeData" border stripe>
              <el-table-column type="expand">

              </el-table-column>
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column prop="attr_name" label="参数名称"></el-table-column>
              <el-table-column label="操作">
                <template v-slot="scope">
                  <el-button size="small" type="primary"
                             @click="clickEditParamBtn(scope.row.attr_name,scope.row.attr_id)"
                  >
                    <el-icon size="20">
                      <i-ri-edit-2-fill />
                    </el-icon>
                    编辑
                  </el-button>
                  <el-button size="small" type="danger" @click="deleteParam(scope.row.attr_id)">
                    <el-icon size="20">
                      <i-ic-sharp-delete-forever />
                    </el-icon>
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-card>

  <!-- 添加参数/属性 dialog -->
  <el-dialog v-model="addParamDialogVisable"
             :title="`添加${dialogTitle}`"
             width="500px"
             @closed="addParamDialogClosed"
  >
    <el-form ref="addParamDialogFormRef"
             :model="addParamDialogFormData"
             :rules="addParamDialogFormRules"
             label-width="auto"
    >
      <el-form-item prop="attr_name" :label="`${dialogTitle}名称`">
        <el-input v-model="addParamDialogFormData.attr_name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button>取消</el-button>
      <el-button type="primary" @click="addParam">确定</el-button>
    </template>
  </el-dialog>

  <!-- 修改参数/属性 dialog -->
  <el-dialog v-model="editParamDialogVisable"
             :title="`修改${dialogTitle}`"
             width="500px"
             @closed="addParamDialogClosed"
  >
    <el-form ref="addParamDialogFormRef"
             :model="addParamDialogFormData"
             :rules="addParamDialogFormRules"
             label-width="auto"
    >
      <el-form-item prop="attr_name" :label="`${dialogTitle}名称`">
        <el-input v-model="addParamDialogFormData.attr_name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button>取消</el-button>
      <el-button type="primary" @click="editParam">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
  .eltab {
    width: 100%;
  }
</style>
