<template>
  <div class="header">
    <!-- <van-nav-bar
      title="千里寻TA"
      left-arrow>
      <template #right>
        <van-icon name="weapp-nav" />
      </template>
    </van-nav-bar> -->

    <van-nav-bar
      :title="head_title"
      left-arrow
      @click-left="onClickLeft"
      fixed
      placeholder
      z-index=2>
      <template #right>
        <van-dropdown-menu>
          <van-dropdown-item :options="loginStatus ? option1 : option2" @change="changeEvent" />
          <!-- <van-icon name="ellipsis" /> -->
        </van-dropdown-menu>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      option1: [
        // { text: '编辑我的信息', value: 0 },
        { text: '消息列表', value: 1 },
        { text: '退出', value: 2 }
      ],
      option2: [
        // { text: '编辑我的信息', value: 0 },
        { text: '消息列表', value: 1 }
      ],
      // 登陆状态
      loginStatus: false,
      // 页头
      head_title: '千里寻TA'
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        this.loginStatus = Boolean(window.localStorage.getItem('token'))
        if (to.path === '/chat') {
          this.head_title = this.$store.state.chatName
        } else {
          this.$store.dispatch('getActionsChatName', '千里寻TA')
          this.head_title = this.$store.state.chatName
        }
      }
    }
  },
  created () {
  },
  methods: {
    onClickLeft () {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
        return false
      } else {
        this.$router.go(-1)
      }
    },
    changeEvent (val) {
      if (val === 0) {
        this.$router.push({ path: '/me' })
      } else if (val === 1) {
        this.$router.push({ path: '/message_lists' })
      } else if (val === 2) {
        window.localStorage.clear()
        this.loginStatus = Boolean(window.localStorage.getItem('token'))
        this.$router.push('/index')
      }
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
  .van-dropdown-menu__bar {
    background-color: transparent !important;
  }
  .van-dropdown-menu__title::after {
    opacity: 1 !important;
    content: '...' !important;
    color: #fff;
    font-size: 24px;
    transform: translateY(-50%) rotate(-90deg) !important;
    border: 0 !important;
    margin-top: 0 !important;
  }
</style>
