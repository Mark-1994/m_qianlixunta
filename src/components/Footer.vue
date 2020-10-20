<template>
  <div class="footer">
    <van-tabbar v-model="tabbar_active" active-color="#379AFD" inactive-color="#0A2250" safe-area-inset-bottom :border="true" route>
      <van-tabbar-item icon="chat-o" to="/index">信息</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/meet">邂逅</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/member">购买</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="'/other_user/' + users_id">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabbar_active: 0,
      // users_id: this.$store.state.users_id,
      users_id: 0
    }
  },
  watch: {
    $route: {
      immediate: true, // 一旦监听到路由的变化立即执行
      handler (to, from) { // 回调函数，两个参数，to：当前的组件，from：上一个组件
        // this.activeMenu = to.path // 给activeMenu重新赋值为当前组件的路由地址
        if (to.path === '/index' && from.path === '/login') {
          this.users_id = this.$store.state.users_id
        }
      }
    }
  },
  created () {
  }
}
</script>

<style lang="less">

</style>
