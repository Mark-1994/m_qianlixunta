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

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >

            <van-cell center v-for="(item,index) in 5" :key="index" title-style="text-align:left;margin-left:10px;overflow:hidden;">
              <template #icon>
                <van-image width="40" height="40" radius="2" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </template>
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">小花</div>
                <div style="color:rgba(0,0,0,.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">很高兴认识你很高兴认识你很高兴认识你</div>
              </template>
              <template #default>
                <span class="custom-title">10:11</span>
              </template>
            </van-cell>

          </van-list>
        </van-pull-refresh>

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
  name: 'Message_lists',
  components: {
  },
  data () {
    return {
      active: 0,
      tabbar_active: 0,
      // 首页两个 tab title
      tab_title: [{
        id: 0,
        title: '私信'
      }, {
        id: 1,
        title: '系统消息'
      }],
      // 下拉刷新显示隐藏
      refreshing: false,
      loading: false,
      finished: false
    }
  },
  methods: {
    // 下拉刷新事件
    onRefresh () {
      console.log('下拉刷新了')
      setTimeout(() => {
        this.refreshing = false
      }, 1000)
    },
    // 加载更多事件
    onLoad () {
      console.log('加载更多了')
      setTimeout(() => {
        // 数据没加载完
        // this.finished = false
        // 数据加载完
        this.finished = true
      }, 1000)
    }
  }
}
</script>

<style lang="less">
  .van-nav-bar {
    background: linear-gradient(154deg,#ff2a86, #927ffe 65%, #917fff 83%, #9effff 181%);
  }
  .van-nav-bar i.van-icon {
    color: #fff;
  }
</style>
