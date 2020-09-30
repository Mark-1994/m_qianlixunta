<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <van-tabs v-model="active" animated border>
      <van-tab v-for="item in tab_title" :title="item.title" :key="item.id">

        <van-pull-refresh
          v-model="isLoading"
          success-text="刷新成功"
          @refresh="onRefresh"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
          >
          <van-grid :border="false" :column-num="2" :gutter="4" :center="false">
            <van-grid-item v-for="item01 in user_list" :key="item01.id" to="/other_user">
              <div class="img_info_box">
                <van-image width="100%" height="217" fit="fill" lazy-load :src="item01.headimg" radius="4" />
                <van-row type="flex" justify="space-between" class="nickname_sex_age">
                  <van-col span="12" class="item_nickname">{{item01.nickname}}</van-col>
                  <van-col span="9" class="item_sex_age">
                    <van-icon name="flower-o" />
                    {{item01.age}}岁
                  </van-col>
                </van-row>
              </div>
              <van-row type="flex" justify="space-between" align="center">
                <van-col span="12">
                  <van-icon name="location" color="#D5004E" size="25" />
                  武汉
                </van-col>
                <van-col span="6" offset="2">
                  <van-icon name="like" color="#FF2877" size="25" />
                </van-col>
                <van-col span="6">
                  <van-icon name="chat-o" dot color="#9BE1FF" size="25" />
                </van-col>
              </van-row>
            </van-grid-item>
          </van-grid>
          </van-list>
        </van-pull-refresh>

      </van-tab>
    </van-tabs>

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
      isLoading: false,
      loading: false,
      error: false,
      finished: false,
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
        headimg: 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nv.png',
        sex: 1,
        age: 18,
        adress: '武汉'
      }, {
        id: 1,
        nickname: '刘德华',
        headimg: 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nv.png',
        sex: 1,
        age: 18,
        adress: '武汉'
      }, {
        id: 2,
        nickname: '刘德华',
        headimg: 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nv.png',
        sex: 1,
        age: 18,
        adress: '武汉'
      }, {
        id: 3,
        nickname: '刘德华',
        headimg: 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nv.png',
        sex: 1,
        age: 18,
        adress: '武汉'
      }, {
        id: 4,
        nickname: '刘德华',
        headimg: 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nv.png',
        sex: 1,
        age: 18,
        adress: '武汉'
      }, {
        id: 5,
        nickname: '刘德华',
        headimg: 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nv.png',
        sex: 1,
        age: 18,
        adress: '武汉'
      }, {
        id: 6,
        nickname: '刘德华',
        headimg: 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nv.png',
        sex: 1,
        age: 18,
        adress: '武汉'
      }, {
        id: 7,
        nickname: '刘德华',
        headimg: 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nv.png',
        sex: 1,
        age: 18,
        adress: '武汉'
      }]
    }
  },
  created () {
    this.$http.post('/wpapi/member/find_friend', {
      page: 1
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    // 上拉刷新
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    // 下拉加载更多
    onLoad () {
      setTimeout(() => {
        this.loading = false
        this.error = false
        this.finished = true
      }, 1000)
    }
  }
}
</script>

<style lang="less">
  .nickname_sex_age {
    background-color: rgba(0, 0, 0, .4);
    color: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: 0 0 4px 4px;
    height: 40px;
  }
  .img_info_box {
    position: relative;
    height: 217px;
    margin-bottom: 10px;
  }
  .item_sex_age {
    background-color: #FF2877;
    border-radius: 2px;
    margin: 8px;
    font-size: 14px;
  }
  .item_nickname {
    line-height: 40px;
  }
  i {
    vertical-align: middle;
  }
</style>
