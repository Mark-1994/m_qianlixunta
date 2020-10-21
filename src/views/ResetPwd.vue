<template>
  <div class="resetpwd">

    <van-steps :active="active">
      <van-step>身份验证</van-step>
      <van-step>重设密码</van-step>
      <van-step>完成</van-step>
    </van-steps>

    <van-form @submit="authentication" validate-first v-if="active === 0">
      <van-field
        v-model="phone"
        type="tel"
        center
        label="输入帐号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请输入您的帐号' }]"
      >
        <template #button v-if="!active">
          <van-button native-type="button" size="small" type="primary" @click="sendCode" :disabled="noSendCode">
            <van-count-down :time="60 * 1000" format="ss" style="color: #fff;" v-if="showSendCode" @finish="resetSendCode" />
            <template v-else>获取验证码</template>
          </van-button>
        </template>
      </van-field>
      <van-field
        v-model="code"
        label="输入验证码"
        placeholder="请输入手机收到的验证码"
        :rules="[{ required: true, message: '输入验证码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          下一步
        </van-button>
      </div>
    </van-form>

    <van-form @submit="onSubmit" validate-first v-else-if="active === 1">
      <van-field
        v-model="password"
        type="password"
        label="输入新密码"
        placeholder="设置新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
      <van-field
        v-model="onceAgainPassword"
        type="password"
        label="再次确定密码"
        placeholder="确认新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          下一步
        </van-button>
      </div>
    </van-form>

    <div v-else-if="active === 2">
      完成
    </div>

  </div>
</template>

<script>
export default {
  name: 'ResetPwd',
  data () {
    return {
      active: 0,
      phone: '',
      code: '',
      // 验证码倒计时显示隐藏
      showSendCode: false,
      // 是否禁用发送验证码按钮
      noSendCode: false,
      // 新密码
      password: '',
      // 重复新密码
      onceAgainPassword: ''
    }
  },
  methods: {
    // 下一步 身份验证
    async authentication () {
      const { data: res } = await this.$http.post('/wpapi/wx/check_phone', {
        phone: this.phone,
        code: this.code
      })
      if (res.status !== 200) return this.$notify(res.msg)
      this.active = 1
    },
    // 验证码发送事件
    async sendCode () {
      const { data: res } = await this.$http.post('/wpapi/register/send_sms', {
        phone: this.phone
      })
      if (res.status !== '200') return this.$notify(res.msg)
      this.$notify({
        type: 'success',
        // message: res.msg,
        message: '短信已发送'
      })
      this.showSendCode = true
      this.noSendCode = true
    },
    // 倒计时结束重置按钮状态
    resetSendCode () {
      this.showSendCode = false
      this.noSendCode = false
    },
    // 重设密码
    async onSubmit () {
      if (this.password !== this.onceAgainPassword) return this.$notify('两次密码不一致')
      const { data: res } = await this.$http.post('/wpapi/wx/find_pwd', {
        phone: this.phone,
        password: this.password
      })
      if (res.status !== '200') return this.$notify(res.msg)
      this.active = 2
    }
  }
}
</script>

<style lang="less">

</style>
