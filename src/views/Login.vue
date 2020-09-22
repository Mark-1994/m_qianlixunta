<template>
  <div class="login">

    <van-nav-bar
      title="千里寻TA"
      left-arrow>
      <template #right>
        <van-icon name="weapp-nav" />
      </template>
    </van-nav-bar>

    <div class="log_form_box">
      <div class="log_title_info">
        <van-row>
          <van-col span="24">
            <van-image radius="10" width="73" height="73" src="http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nv.png" />
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
          placeholder="输入账号"
          clearable
          :rules="[{ required: true, message: '请填写用户名' }]"
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
          <van-col span="24" class="text_sigup">还没有账号？<router-link to="/signup">注册</router-link></van-col>
        </van-row>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>

    </div>

    <van-tabbar v-model="tabbar_active" active-color="#379AFD" inactive-color="#0A2250" safe-area-inset-bottom :border="true">
      <van-tabbar-item icon="chat-o">信息</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
      <van-tabbar-item icon="shop-o">购买</van-tabbar-item>
      <van-tabbar-item icon="like-o">邂逅</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      tabbar_active: 0,
      username: '',
      password: ''
    }
  },
  methods: {
    // 登录按钮
    onSubmit () {
    }
  }
}
</script>

<style lang="less">
  .van-nav-bar {
    background: linear-gradient(154deg,#ff2a86, #927ffe 65%, #917fff 83%, #9effff 181%);
  }
  .van-nav-bar i.van-icon,
  div.van-nav-bar__title {
    color: #fff;
  }
  i {
    vertical-align: middle;
  }

  html,
  body,
  #app {
    height: 100%;
  }
  .login {
    height: 100%;
    background: url(https://img.yzcdn.cn/vant/cat.jpeg) no-repeat center center / cover;
  }
  .log_title_info {
    margin: 50px 0;
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
