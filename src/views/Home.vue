<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <van-tabs v-model="active" animated border swipeable @click="homeSwitch" @change="homeSwitch">
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
                <van-image width="100%" height="217" fit="fill" lazy-load :src="item01.head_portrait ? 'http://admin.qianlixunta.com'+item01.head_portrait : item01.head_portrait" radius="4" />
                <van-row type="flex" justify="space-between" class="nickname_sex_age">
                  <van-col span="12" class="item_nickname">{{item01.nickname ? item01.nickname : '昵称'}}</van-col>
                  <van-col span="9" class="item_sex_age">
                    <van-icon name="flower-o" />
                    {{item01.users_year ? new Date().getFullYear() - item01.users_year : '年龄'}}岁
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
                  <van-icon name="chat-o" color="#9BE1FF" size="25" />
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
      user_list: [],
      pages: 1
    }
  },
  created () {
    this.getHomeData(1)
  },
  methods: {
    // 上拉刷新
    onRefresh () {
      this.getHomeData(1, () => {
        this.isLoading = false
        this.pages = 1
        this.finished = false
      })
    },
    // 底部加载更多
    onLoad () {
      // setTimeout(() => {
      //   this.loading = false
      //   this.error = false
      //   this.finished = true
      // }, 1000)

      this.pages += 1
      this.keeponHomeData(this.pages, (flag) => {
        this.loading = false
        if (flag) {
          this.finished = true
        }
      })
    },
    // tab 点击切换事件
    homeSwitch (name, title) {
      if (name === 0) {
        // 推荐
      } else if (name === 1) {
        // 附近
      }
    },
    // 获取推荐第一页数据
    async getHomeData (page, callback) {
      const { data: res } = await this.$http.post('/wpapi/member/find_friend', {
        page: page
      })
      if (res.status !== 200) {
        return this.$notify({
          type: 'danger',
          message: res.msg
        })
      }
      this.user_list = res.data.data
      if (!callback) return false
      callback()
    },
    // 数据追加
    async keeponHomeData (page, callback) {
      const { data: res } = await this.$http.post('/wpapi/member/find_friend', {
        page: page
      })
      if (res.status !== 200) return console.log('加载失败')
      for (let i = 0; i < res.data.data.length; i++) {
        this.user_list.push(res.data.data[i])
      }
      if (!callback) return false
      callback(Boolean(res.data.current_page === res.data.last_page))
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
    text-overflow: ellipsis;
    overflow: hidden;
  }
  i {
    vertical-align: middle;
  }
</style>
