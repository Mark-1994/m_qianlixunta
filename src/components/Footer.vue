<template>
  <div class="footer">
    <van-tabbar v-model="tabbar_active" active-color="#379AFD" inactive-color="#0A2250" safe-area-inset-bottom :border="true" route>
      <van-tabbar-item icon="chat-o" to="/index">信息</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/other_user">我的</van-tabbar-item>
      <van-tabbar-item icon="shop-o" to="/member">购买</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/meet">邂逅</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabbar_active: 0
    }
  }
}
</script>

<style lang="less">

</style>
