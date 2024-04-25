<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
      <el-form-item label="" prop="phone">
        <el-input v-model="ruleForm.phone" type="text" size="large" autocomplete="off" placeholder="请输入手机号码"
          maxlength="11">
          <template #prefix>
            +86
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="verCode">
        <el-input size="large" v-model="ruleForm.verCode" type="text" autocomplete="off" placeholder="请输入验证码">
          <template #suffix>
            <el-button type="primary" link>点击获取</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input size="large" v-model="ruleForm.password" :type="showPass ? 'text' : 'password'" autocomplete="off"
          placeholder="请输入登录密码">
          <template #suffix>
            <el-icon v-if="showPass" class="el-input__icon" @click="showPass = !showPass">
              <View />
            </el-icon>
            <el-icon v-else class="el-input__icon" @click="showPass = !showPass">
              <Hide />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit" @click="submitForm(ruleFormRef)">提 交</el-button>
      </el-form-item>
      <div class="back" @click="emit('update:value', false)">
        返回
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { View, Hide } from '@element-plus/icons-vue'
import router from '@/router'

const emit = defineEmits(["update:value"]);

let showPass = ref(false)

const ruleFormRef = ref()
const validatePhone = (rule: any, value: any, callback: any) => {
  var regPhone = /^1[3456789]{1}\d{9}$/; //手机正则
  //验证手机号
  if (value == '') {
    callback(new Error('请输入手机号码'))
  } else if (!regPhone.test(value)) {
    callback(new Error('手机号格式错误'))
  }
  return true;
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value == '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 24) {
    callback(new Error('登录密码限6-24位'))
  } else {
    if (ruleForm.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('密码', () => null)
    }
    callback()
  }
}
const validateVerCode = (rule: any, value: any, callback: any) => {
  if (value == '') {
    callback(new Error('请输入验证码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  phone: '',
  verCode: '',
  password: '',
})

const rules = reactive({
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  verCode: [{ validator: validateVerCode, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: any) => {
  if (!formEl) return
  formEl.validate((valid: any) => {
    if (valid) {
      window.history.state.back ? router.go(-1) : router.push('/')
    } else {
      return false
    }
  })
}
</script>

<style scoped lang="scss">
:deep(.demo-ruleForm) {
  margin-top: 28px;

  .el-input__prefix-inner {
    margin-right: 10px;
  }

  .el-input__suffix-inner {
    .el-input__icon {
      cursor: pointer;
    }
  }

  .submit {
    margin-top: 28px;
    width: 100%;
    height: 58px;
    border-radius: 29px;
    line-height: 58px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, .12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, .045);
  }

  .back {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3d8fff;
  }
}

.close {
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 40px;
  width: 28px;
  height: 28px;
}
</style>
