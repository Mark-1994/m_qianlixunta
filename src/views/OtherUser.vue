<template>
  <div class="other_user">

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
            <van-col span="24">
              <h4 style="text-align: left;">照片</h4>

              <!-- 轮播图滑动 -->
              <van-swipe :loop="false" :width="100" :height="90" :show-indicators="false">
                <van-swipe-item>
                  <van-image :src="require('../assets/life_img01.png')" width="90" height="90" radius="4" lazy-load />
                </van-swipe-item>
                <van-swipe-item>
                  <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" width="90" height="90" radius="4" lazy-load />
                </van-swipe-item>
                <van-swipe-item>
                  <van-image :src="require('../assets/life_img01.png')" width="90" height="90" radius="4" lazy-load />
                </van-swipe-item>
                <van-swipe-item>
                  <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" width="90" height="90" radius="4" lazy-load />
                </van-swipe-item>
                <van-swipe-item>
                  <van-image :src="require('../assets/life_img01.png')" width="90" height="90" radius="4" lazy-load />
                </van-swipe-item>
                <van-swipe-item>
                  <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" width="90" height="90" radius="4" lazy-load />
                </van-swipe-item>
              </van-swipe>

            </van-col>
          </van-row>
          <van-row>
            <van-col span="24" style="text-align: left;">
              <h4>自我介绍</h4>
              <p style="color: rgba(0,0,0,.4)">喜欢玩游戏的宅男喜欢玩游戏的宅男喜欢玩游戏的宅男喜欢玩游戏的宅男喜欢玩游戏的宅男喜欢玩游戏的宅男</p>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24" style="text-align: left;">
              <h4>标签</h4>
              <van-row gutter="10">
                <van-col>
                  <van-tag type="primary" color="#917FFE" size="large">旅游</van-tag>
                </van-col>
                <van-col>
                  <van-tag type="primary" color="#917FFE" size="large">二次元</van-tag>
                </van-col>
                <van-col>
                  <van-tag type="primary" color="#917FFE" size="large">狮子座</van-tag>
                </van-col>
                <van-col>
                  <van-tag type="primary" color="#917FFE" size="large">吃货</van-tag>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24" style="text-align: left;">
              <h4>生活方式</h4>
              <van-row style="line-height: 30px;">
                <van-col>
                  <span style="color: rgba(0,0,0,.5);">吸烟：</span>
                  不抽烟也不讨厌他人抽烟
                </van-col>
              </van-row>
              <van-row style="line-height: 30px;">
                <van-col>
                  <span style="color: rgba(0,0,0,.5);">饮酒：</span>
                  不饮酒
                </van-col>
              </van-row>
              <van-row style="line-height: 30px;">
                <van-col>
                  <span style="color: rgba(0,0,0,.5);">作息时间：</span>
                  偶尔懒散一下
                </van-col>
              </van-row>
              <van-row style="line-height: 30px;">
                <van-col>
                  <span style="color: rgba(0,0,0,.5);">交际圈子：</span>
                  经常和朋友见面
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <!-- <van-row>
            <van-col span="24">标签</van-col>
          </van-row> -->
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
export default {
  name: 'OtherUser',
  components: {
  },
  data () {
    return {
      active: 0,
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
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$http.post('/wpapi/me/select_users_info', {
        users_id: 48,
        token: '1ab47280a262de9cb7320cf16e3c6e6be7c85595b4a3fa7829806f7b69f1f5be',
        bei_users_id: 1
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less">
  .user_info_box {
    padding: 12px;
  }
</style>
