<template>
  <div class="home">

    <van-nav-bar
      title="千里寻TA"
      left-arrow>
      <template #right>
        <van-icon name="weapp-nav" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated border>
      <van-tab v-for="item in tab_title" :title="item.title" :key="item.id">

        <van-image width="100%" height="154" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <h4 style="font-size: 18px;"><van-icon name="gem" color="#FAB005" style="margin-right: 8px;" />会员权益</h4>
        <van-row gutter="10" style="margin: 0 10px;">
          <van-col span="8">
            <div style="background-color: #fff;border-radius: 6px;box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);padding: 20px 0 1px;">
              <van-image width="47" height="50" :src="require('../assets/see_more01.png')" />
              <p>无限查看</p>
            </div>
          </van-col>
          <van-col span="8">
            <div style="background-color: #fff;border-radius: 6px;box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);padding: 20px 0 1px;">
              <van-image width="48" height="50" :src="require('../assets/send_msg01.png')" />
              <p>发布消息</p>
            </div>
          </van-col>
          <van-col span="8">
            <div style="background-color: #fff;border-radius: 6px;box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);padding: 20px 0 1px;">
              <van-image width="48" height="50" :src="require('../assets/send_msg01.png')" />
              <p>无限畅聊</p>
            </div>
          </van-col>
        </van-row>

        <van-row style="text-align: left;color: #B7B7B7;margin: 20px 10px 0;">
          <van-col span="24">
            会员权益及相关说明：
          </van-col>
        </van-row>
        <van-row style="text-align: left;color: #B7B7B7;margin: 0 10px;">
          <van-col span="24">
            1.可随意查看和筛选资料，联系、发布和接收消息。2.服务将于在线支付成功后自动开通。3.服务一经开通，不予退款，敬请谅解。
          </van-col>
        </van-row>

        <van-row style="margin: 30px 0 20px;">
          <van-col span="24">开通会员</van-col>
        </van-row>
        <van-row>
          <van-col span="24"><span style="font-size: 30px;">168</span>元/年</van-col>
        </van-row>
        <van-button color="#FF2877" style="border-radius: 6px;margin: 40px 0;">立即加入会员</van-button>

      </van-tab>
    </van-tabs>

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
      active: 0,
      tabbar_active: 0,
      // 首页两个 tab title
      tab_title: [{
        id: 0,
        title: '加入会员'
      }, {
        id: 1,
        title: '红娘一对一'
      }]
    }
  },
  methods: {
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

  html,
  body {
    background-color: #f3f3f3;
  }
</style>
