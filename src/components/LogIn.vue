<template>
  <div class="wrapper">
    <div class="login-box">
      <div class="login-icon">
        <el-icon size="100px">
          <i-ant-design-shop-twotone />
        </el-icon>
      </div>
      <div class="login-form">
        <el-form ref="loginFormRef"
                 :model="loginForm"
                 :rules="formRules"
        >
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName"
                      placeholder="请输入账号"
            >
              <template #prefix>
                <el-icon>
                  <i-ph-user-fill />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password"
                      type="password"
                      show-password
                      placeholder="请输入密码"
            >
              <template #prefix>
                <el-icon>
                  <i-ri-lock-password-fill />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-footer">
        <el-button type="info"
                   auto-insert-space
                   @click="resetForm(loginFormRef)"
        >
          重置
        </el-button>
        <el-button type="primary"
                   auto-insert-space
                   @click="login(loginFormRef)"
        >
          登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { FormInstance, FormRules } from 'element-plus'
    import { ref } from 'vue'

    interface LoginForm {
        userName: string,
        password: string
    }

    // 登录表单
    const loginForm = ref<LoginForm>({
        userName: '',
        password: ''
    })
    // 登录表单 Ref
    const loginFormRef = ref<FormInstance>()
    // 登录表单验证规则
    const formRules = ref<FormRules>({
        userName: [
            {
                required: true,
                message: '请输入账号!',
                trigger: 'blur'
            }

        ],
        password: [
            {
                required: true,
                message: '请输入密码!',
                trigger: 'change'
            },
            {
                min: 3,
                max: 5,
                message: '长度在 3~5 之间'
            }
        ]
    })

    // 登录按钮
    function login (loginFormRef: FormInstance) {
        if (!loginFormRef) return
        loginFormRef.validate((validate) => {
            if (validate) {
                console.log('success')
            } else {
                console.log('error')
            }
        })
    }

    // 重置按钮
    function resetForm (loginFormRef: FormInstance) {
        if (!loginFormRef) return
        loginFormRef.resetFields()
    }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: #7395b2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-box {
    background-color: #fff;
    width: 450px;
    height: 300px;
    border-radius: 10px;
  }

  .login-icon {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .login-form {
    width: 95%;
    margin: 0 auto;
  }

  .login-footer {
    display: flex;
    flex-direction: row-reverse;
  }

  .login-footer .el-button {
    margin: 15px;
  }
</style>
