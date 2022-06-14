<!-- async 表名为异步组件 -->
<script async setup lang="ts">

  import { FormInstance, FormRules } from 'element-plus'
  import { Ref } from 'vue'
  import { getUserList } from '../api'
  import { postUser, PostUser, putUserState, QueryParam, User } from '../api/getUserList'
  import { checkEmail, checkMobile } from '../utils'

  interface QueryResponse {
    pagenum: number,
    total: number,
    users: [User]
  }

  // 查询参数
  const queryParam = ref({
    query: '',
    pagenum: 1,
    pagesize: 5
  }) as Ref<QueryParam>
  // 查询返回结果
  const queryResponse = ref() as Ref<QueryResponse>
  // 添加用户 dialog 显示
  const addUserDialogVisible = ref(false)
  // 添加用户表单 Ref
  const addUserDialogFormRef = ref() as Ref<FormInstance>
  // 添加用户表单验证规则
  const addUserDialogFormRules = ref({
    username: [{
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }, {
      min: 3,
      max: 12,
      message: '用户名 3~12 位'
    }],
    password: [{
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }, {
      min: 6,
      max: 12,
      message: '用户名 6~12 位'
    }],
    email: [{
      required: false,
      message: '请输入邮箱',
      trigger: 'blur'
    }, {
      validator: checkEmail,
      trigger: 'blur'
    }],
    mobile: [{
      required: false,
      message: '请输入手机号',
      trigger: 'blur'
    }, {
      validator: checkMobile,
      trigger: 'blur'
    }]
  }) as Ref<FormRules>
  // 添加用户 表单数据
  const addUserDialogFormData = ref({
    username: '',
    password: '',
    mobile: '',
    email: ''
  }) as Ref<PostUser>

  // Vue3 中 create 生命周期为 setup
  // 在组件 create 时请求数据
  queryResponse.value = await getUserList(queryParam.value)

  async function selectUser() {
    queryResponse.value = await getUserList(queryParam.value)
  }

  // 搜索输入框 清空
  async function inputClear() {
    queryResponse.value = await getUserList(queryParam.value)
  }

  // 每页展示数据条目
  async function handleSizeChange() {
    queryResponse.value = await getUserList(queryParam.value)
  }

  // 前往某页
  async function handleCurrentChange() {
    queryResponse.value = await getUserList(queryParam.value)
  }

  // 切换用户状态
  function handleSwitchChange(id: number, state: boolean) {
    putUserState(id, state)
  }

  // 添加用户对话框 关闭
  function addUserDialogClosed(formRef: FormInstance) {
    formRef.resetFields()
  }

  // 添加用户
  function addUser() {
    addUserDialogFormRef.value.validate(async (validate) => {
      if (validate) {
        try {
          await postUser(addUserDialogFormData.value)
          queryResponse.value = await getUserList(queryParam.value)
        } catch (e) {
          return
        } finally {
          addUserDialogVisible.value = false
        }
      }
    })
  }
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 主体内容 -->
  <el-card class="main-box">
    <!-- 搜索框 添加按钮 -->
    <el-row :gutter="20">
      <el-col :span="9">
        <el-input v-model="queryParam['query']" clearable placeholder="请输入搜索内容" @clear="inputClear">
          <template #append>
            <el-button @click="selectUser">
              <el-icon>
                <i-ion-search />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="addUserDialogVisible=!addUserDialogVisible" type="primary">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- table 展示 -->
    <el-row style="margin: 15px 0">
      <el-table
          :data="queryResponse.users"
          border
          stripe
          style="width: 100%"
      >
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="username" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="role_name" label="角色" />
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state"
                       @change="handleSwitchChange(scope.row.id,scope.row.mg_state)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button size="small" type="primary">
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
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 底部页码 -->
    <el-row>
      <el-pagination
          v-model:currentPage="queryParam['pagenum']"
          v-model:page-size="queryParam['pagesize']"
          :page-sizes="[1, 5, 10, 50]"
          :total="queryResponse.total"
          layout="total, sizes, prev, pager, next, jumper"
          small="small"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </el-row>
  </el-card>

  <!-- 添加用户 dialog -->
  <el-dialog v-model="addUserDialogVisible"
             title="添加用户"
             width="500px"
             @closed="addUserDialogClosed(addUserDialogFormRef)"
  >
    <el-form ref="addUserDialogFormRef" :rules="addUserDialogFormRules" :model="addUserDialogFormData"
             label-width="auto"
    >
      <el-form-item prop="username" label="用户名">
        <el-input v-model="addUserDialogFormData.username" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="addUserDialogFormData.password" />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="addUserDialogFormData.email" />
      </el-form-item>
      <el-form-item prop="mobile" label="手机">
        <el-input v-model="addUserDialogFormData.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="addUserDialogVisible=!addUserDialogVisible">取消</el-button>
      <el-button @click="addUser" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
  .main-box {
    height: 100%;
    margin: 15px 0;
    min-width: 1100px;
  }

  .main-box .el-input {
    min-width: 100px;
  }
</style>
