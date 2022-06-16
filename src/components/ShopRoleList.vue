<script setup lang="ts">

  import { FormInstance, FormRules } from 'element-plus'
  import { Ref } from 'vue'
  import { getRoleInfo, getRolesList, postRole, putRoleInfo, Role, RoleInfo } from '../api/getRightsList'

  const rolesList = ref() as Ref<[Role]>
  const addOrEditeRoleDialogVisable = ref(false)
  const addOrEditeRoleDialogForm = ref({
    roleName: '',
    roleDesc: ''
  }) as Ref<RoleInfo>
  const addOrEditeRoleDialogFormRef = ref() as Ref<FormInstance>
  const addOrEditeRoleDialogFormRules = ref({
    roleName: [{
      required: true,
      message: '请输入角色名称'
    }],
    roleDesc: [{
      required: false
    }]
  }) as Ref<FormRules>
  // 点击 添加角色 or 修改角色 按钮
  const addOrEdite = ref() as Ref<'add' | 'edite'>
  const selectedRoleId = ref(0)

  function addOrEditeRole(type: 'add' | 'edite') {
    addOrEditeRoleDialogFormRef.value.validate(async (validate) => {
      if (validate) {
        switch (type) {
          case 'add':
            await postRole(addOrEditeRoleDialogForm.value)
            break
          case 'edite':
            await putRoleInfo(selectedRoleId.value, addOrEditeRoleDialogForm.value)
            break
        }
        rolesList.value = await getRolesList()
        addOrEditeRoleDialogVisable.value = !addOrEditeRoleDialogVisable.value
      }
    })
  }

  function addOrEditeRoleDialogClosed() {
    addOrEditeRoleDialogFormRef.value.resetFields()
  }

  async function clickEditeRoleBtn(roleId: number) {
    selectedRoleId.value = roleId
    addOrEditeRoleDialogForm.value = await getRoleInfo(roleId)

    addOrEdite.value = 'edite'
    addOrEditeRoleDialogVisable.value = !addOrEditeRoleDialogVisable.value
  }

  function clickAddRoleBtn() {
    addOrEdite.value = 'add'
    addOrEditeRoleDialogVisable.value = !addOrEditeRoleDialogVisable.value
  }

  // 第一次加载页面时 获取数据
  rolesList.value = await getRolesList()
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card style="margin-top: 20px">
    <el-row>
      <el-button type="primary" @click="clickAddRoleBtn">添加角色</el-button>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template #default="scope">
            <el-row v-for="(first,index) in scope.row.children" :key="first.id"
                    :class="['border-bottom',index===0?'border-top':'','first-rol']"
            >
              <!-- 一级权限 -->
              <el-col :span="5" class="col">
                <el-tag>
                  {{ first.authName }}
                </el-tag>
                <el-icon>
                  <i-ic-round-chevron-right />
                </el-icon>
              </el-col>
              <!-- 二 三级权限 -->
              <el-col :span="19">
                <el-row v-for="(item,index) in first.children" :key="item.id"
                        :class="[index===0?'':'border-top']"
                >
                  <!-- 二级 -->
                  <el-col class="col" :span="5">
                    <el-tag type="success">{{ item.authName }}</el-tag>
                    <el-icon>
                      <i-ic-round-chevron-right />
                    </el-icon>
                  </el-col>
                  <!-- 三级 -->
                  <el-col :span="19">
                    <el-tag v-for="(subItem) in item.children" :key="subItem.id" type="warning">
                      {{ subItem.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleDesc" label="角色描述" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="clickEditeRoleBtn(scope.row.id)" size="small" type="primary">
              <el-icon size="20">
                <i-ri-edit-2-fill />
              </el-icon>
            </el-button>
            <el-button size="small" type="danger">
              <el-icon size="20">
                <i-ic-sharp-delete-forever />
              </el-icon>
            </el-button>
            <el-button size="small" type="warning">
              <el-icon size="20">
                <i-ic-round-settings />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-card>

  <!-- 添加/修改 角色 dialog -->
  <el-dialog v-model="addOrEditeRoleDialogVisable" title="添加角色" width="500px" @closed="addOrEditeRoleDialogClosed">
    <el-form ref="addOrEditeRoleDialogFormRef" :model="addOrEditeRoleDialogForm" :rules="addOrEditeRoleDialogFormRules"
             label-width="auto"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addOrEditeRoleDialogForm.roleName" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="addOrEditeRoleDialogForm.roleDesc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="addOrEditeRoleDialogVisable=!addOrEditeRoleDialogVisable">取消</el-button>
      <el-button @click="addOrEditeRole(addOrEdite)" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
  .el-tag {
    margin: 7px;
  }

  .border-top {
    border-top: 1px solid #eee;
  }

  .border-bottom {
    border-bottom: 1px solid #eee;
  }

  .first-rol {
    width: 90%;
    margin: 0 auto;
  }

  .col {
    display: flex;
    align-items: center;
  }
</style>
