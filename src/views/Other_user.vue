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
        <div class="user_info_box">
          <van-row>
            <van-col span="24">
              <van-row type="flex" justify="space-between">
                <van-col span="10">
                  <van-image
                    width="100%"
                    height="8rem"
                    fit="fill"
                    radius="4"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
                </van-col>
                <van-col span="12" style="padding-top: 2rem;">
                  <van-row type="flex" justify="space-between" align="center">
                    <van-col style="font-size: 22px;">林俊杰</van-col>
                    <van-col><van-tag type="primary" size="large" color="#379AFD">25岁</van-tag></van-col>
                  </van-row>
                  <van-row type="flex" justify="space-between" style="margin-top: 1rem;">
                    <van-col><van-tag type="primary" size="large" color="#917FFE">武汉</van-tag></van-col>
                    <van-col><van-tag type="primary" size="large" color="#917FFE">未婚</van-tag></van-col>
                    <van-col><van-tag type="primary" size="large" color="#917FFE">本科</van-tag></van-col>
                  </van-row>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24">照片</van-col>
          </van-row>
          <van-row>
            <van-col span="24">自我介绍</van-col>
          </van-row>
          <van-row>
            <van-col span="24">标签</van-col>
          </van-row>
        </div>
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
        title: 'TA'
      }, {
        id: 1,
        title: '我的'
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
  i {
    vertical-align: middle;
  }
  .user_info_box {
    padding: 12px;
  }
</style>
