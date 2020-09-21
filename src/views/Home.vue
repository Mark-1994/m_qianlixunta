<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <van-nav-bar
      title="千里寻TA"
      left-arrow>
      <template #right>
        <van-icon name="weapp-nav" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated border>
      <van-tab v-for="item in tab_title" :title="item.title" :key="item.id">

        <van-grid :border="true" :column-num="2" :gutter="10">
          <van-grid-item v-for="item01 in user_list" :key="item01.id">
            1
          </van-grid-item>
        </van-grid>

      </van-tab>
    </van-tabs>

    <!-- <van-row>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
    </van-row> -->

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      active: 0,
      // 首页两个 tab title
      tab_title: [{
        id: 0,
        title: '推荐'
      }, {
        id: 1,
        title: '附近'
      }],
      // 首页 tab 列表数据
      user_list: [{
        id: 0,
        nickname: '吴秀波',
        sex: 1,
        age: 18,
        adress: '武汉'
      }, {
        id: 1,
        nickname: '刘德华',
        sex: 1,
        age: 18,
        adress: '武汉'
      }]
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
</style>
