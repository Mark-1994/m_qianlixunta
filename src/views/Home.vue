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
            <van-grid-item v-for="item01 in user_list" :key="item01.id" :to="'/other_user/' + item01.id">
              <div class="img_info_box">
                <van-image width="100%" height="217" fit="fill" lazy-load :src="item01.head_portrait ? 'http://admin.qianlixunta.com'+item01.head_portrait : 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nan.png'" radius="4" />
                <van-row type="flex" justify="space-between" class="nickname_sex_age">
                  <van-col span="12" class="item_nickname">{{item01.nickname ? item01.nickname : '昵称'}}</van-col>
                  <van-col span="9" class="item_sex_age">
                    <van-icon name="flower-o" />
                    {{Number(item01.users_year) ? new Date().getFullYear() - item01.users_year : '年龄'}}岁
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
import wx from 'weixin-js-sdk'

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
      pages: 0
    }
  },
  created () {
    // this.getHomeData(1)
  },
  mounted () {
    // 微信分享
    if (wx) {
      this.$http.post('http://wxshare.qianlixunta.com/wxJssdk/getJssdk', { url: location.href }).then((response) => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: response.data.appId, // 必填，公众号的唯一标识
          timestamp: response.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
          signature: response.data.signature, // 必填，签名，见附录1
          jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })

        wx.ready(function () {
          // 分享到朋友圈
          wx.updateTimelineShareData({
            title: '千里寻他官网',
            desc: '千里寻他',
            link: 'http://m.qianlixunta.com/',
            imgUrl: 'http://m.qianlixunta.com/images/wx_share01.jpg'
          })

          // 分享给朋友
          wx.updateAppMessageShareData({
            title: '千里寻他官网',
            desc: '千里寻他',
            link: 'http://m.qianlixunta.com/',
            imgUrl: 'http://m.qianlixunta.com/images/wx_share01.jpg'
          })
        })

        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        })
      })
    }
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
