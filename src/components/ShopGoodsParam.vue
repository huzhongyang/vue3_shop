<script setup lang="ts">

  import { CascaderProps, ExpandTrigger } from 'element-plus'
  import { Ref } from 'vue'
  import { CategoryAttribute, getCategoryAttributes, getGoodsCategoryList, Goods } from '../api/goodsControl'

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

  async function selectedCategoryChange() {
    attributeData.value = await getCategoryAttributes(selectedCategory.value, activeTab.value)
  }

  async function handleClickTab() {
    console.log(activeTab.value)
    attributeData.value = await getCategoryAttributes(selectedCategory.value, activeTab.value)
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
          <el-button type="primary">添加参数</el-button>
          <el-row style="margin-top: 10px">
            <el-table :data="attributeData" border stripe>
              <el-table-column type="expand">

              </el-table-column>
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column prop="attr_name" label="参数名称"></el-table-column>
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
        </el-tab-pane>

        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary">添加属性</el-button>
          <el-row style="margin-top: 10px">
            <el-table :data="attributeData" border stripe>
              <el-table-column type="expand">

              </el-table-column>
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column prop="attr_name" label="参数名称"></el-table-column>
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
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-card>
</template>

<style scoped>
  .eltab {
    width: 100%;
  }
</style>
