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

    <div class="activeWindow" style="position: fixed;right: 0;bottom: 180px;z-index: 999;" v-if="showActiveWindow">
      <router-link to="/member">
        <van-image
          fit="contain"
          :src="require('../assets/free-tips03.png')"
        />
      </router-link>
    </div>

    <div class="activeVipAd" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999;" v-if="showVipAd">
      <router-link to="/member">
        <van-image
          width="18rem"
          height="18rem"
          fit="contain"
          :src="require('../assets/active_vip_ad01.png')"
        />
      </router-link>
      <van-button @click="closeVipAd" icon="cross" round plain  color="#000" size="small" />
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      option1: [
        // { text: '编辑我的信息', value: 0 },
        // { text: '消息列表', value: 1 },
        { text: '退出', value: 2 }
      ],
      option2: [
        // { text: '编辑我的信息', value: 0 },
        // { text: '消息列表', value: 1 }
      ],
      // 登陆状态
      loginStatus: false,
      // 页头
      head_title: '千里寻TA',
      // 显示隐藏活动浮窗
      showActiveWindow: false,
      // 显示隐藏广告浮窗
      showVipAd: false
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
        if (window.localStorage.getItem('token')) {
          this.isWhetherVip()
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
        this.showActiveWindow = Boolean(window.localStorage.getItem('token'))
        this.showVipAd = false
      }
    },
    // 检测用户身份
    async isWhetherVip () {
      const { data: res } = await this.$http.post('/wpapi/member/is_vip')
      if (res.status !== 200) return this.$notify(res.msg)
      if (!res.data.vip_status) {
        this.showActiveWindow = true
        window.localStorage.setItem('isVip', true)
        this.showVipAd = true
      } else {
        this.showActiveWindow = false
        window.localStorage.setItem('isVip', false)
        this.showVipAd = false
      }
    },
    // 关闭广告弹窗
    closeVipAd () {
      this.showVipAd = false
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
  @keyframes scaleDraw {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.1);
    }
  }
  .activeVipAd img {
    animation-name: scaleDraw; /*关键帧名称*/
    animation-timing-function: ease-in-out; /*动画的速度曲线*/
    animation-iteration-count: infinite;  /*动画播放的次数*/
    animation-duration: 5s; /*动画所花费的时间*/
  }
</style>
