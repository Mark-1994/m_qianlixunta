<template>
  <div class="login">

    <div class="log_form_box">
      <div class="log_title_info">
        <van-row>
          <van-col span="24">
            <van-image radius="10" width="73" height="73" :src="require('../assets/logo_currency01.png')" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="logo_alt">千里寻<span>Ta</span></van-col>
        </van-row>
        <van-row>
          <van-col span="24">来寻找你的另一半</van-col>
        </van-row>
      </div>

      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="输入手机号"
          clearable
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="输入密码"
          clearable
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-row>
          <van-col span="24" class="text_sigup">
            <span>还没有账号？</span>
            <router-link to="/register">注册</router-link>&nbsp;
            <router-link to="/resetpwd">忘记密码</router-link>
          </van-col>
        </van-row>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 登录按钮
    async onSubmit () {
      const { data: res } = await this.$http.post('/wpapi/register/login', {
        phone: this.username,
        password: this.password
      })
      if (res.status !== '200') return this.$notify(res.msg)
      this.$notify({
        type: 'success',
        message: res.msg
      })
      window.localStorage.setItem('token', res.data.token)
      window.localStorage.setItem('nickname', res.data.nickname)
      window.localStorage.setItem('users_id', res.data.users_id)
      this.$store.commit('increment')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="less">
  html,
  body,
  #app {
    height: 100%;
  }
  .login {
    height: 100%;
    background: url(../assets/loginBgImg01.png) no-repeat center center / cover;
  }
  .log_title_info {
    margin: 0 0 50px;
    padding-top: 50px;
  }
  .logo_alt {
    color: #F15598;
    margin: 10px 0;
    font-size: 18px;
    span {
      font-size: 12px;
    }
  }
  .text_sigup,
  .text_sigup a {
    color: #fff;
  }
  .text_sigup {
    margin-top: 40px;
  }
  .text_sigup a {
    text-decoration: underline;
  }
</style>
