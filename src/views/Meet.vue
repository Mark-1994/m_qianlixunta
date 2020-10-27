<template>
  <div class="meet">

    <van-tabs v-model="active" animated border>
      <van-tab v-for="item in tab_title" :title="item.title" :key="item.id">

        <div class="wrap" style="background: linear-gradient(0deg,#ff2a86, #927ffe 44%, #917fff 57%, #9effff 123%);">
          <div class="box" style="padding: 60px 0 0;">
            <silder-like
              :drag-distance="150"
              :top-space="-30"
              :show-card-number="3"
              height="300px"
              width="300px">
              <silder-like-item
                @silder-left="like(item)"
                @silder-right="nulike(item)"
                v-for="item in items"
                :key="item.users_id">
                <img :src="item.head_portrait ? `http://admin.qianlixunta.com${item.head_portrait}` : require('@/assets/logo_currency01.png')" width="100%" height="200px" style="display: block;padding: 8px;box-sizing: border-box;" />
                <!-- <h2>{{item.title}}</h2>
                <p>{{item.body}}</p> -->

                <van-row type="flex" align="center" style="height: 100px;">
                  <van-col span="16" style="padding: 0 12px;">
                    <van-row style="margin-bottom: 5px;">
                      <van-col>{{item.nickname}}</van-col>
                    </van-row>
                    <van-row>
                      <van-col>
                        <van-tag color="#917FFE" size="large">
                          <template #default>
                            {{item.workplace}}
                          </template>
                        </van-tag>
                        <van-tag color="#917FFE" size="large" style="margin: 0 6px;">VIP</van-tag>
                        <van-tag color="#917FFE" size="large">{{item.education}}</van-tag>
                      </van-col>
                    </van-row>
                  </van-col>
                  <van-col span="8" style="border-left: 1px solid #707070;">
                    <van-row type="flex" justify="center">
                      <van-col style="font-weight: bold;font-size: 20px;">{{item.birthday}}</van-col>
                    </van-row>
                    <!-- <van-row type="flex" justify="center">
                      <van-col style="color: #838383;font-size: 12px;">匹配度</van-col>
                    </van-row> -->
                  </van-col>
                </van-row>

                <div ref="introduce_oneself" style="display: none;">
                  {{item.introduce_oneself}}
                </div>

                <div ref="users_id" style="display: none;">
                  {{item.users_id}}
                </div>

                <div ref="nickname" style="display: none;">
                  {{item.nickname}}
                </div>

              </silder-like-item>
            </silder-like>
          </div>

          <p style="margin: 50px auto 30px;color: #fff;text-align: left;width: 280px;" ref="show_introduce_oneself">
            {{items[0].introduce_oneself}}
          </p>

          <div class="col" style="display: flex;justify-content: center;width: 300px;margin: 0 auto;padding-bottom: 30px;">
            <!-- <van-button color="linear-gradient(180deg,#fffab8, #f552bd)" icon="like-o" style="width: 76px;height: 76px;border-radius: 50%;box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);" @click="like">
              喜欢
            </van-button>
            <van-button color="linear-gradient(180deg,#fffab8, #f552bd)" icon="close" style="width: 76px;height: 76px;border-radius: 50%;box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);" @click="nulike">
              不喜欢
            </van-button> -->
            <van-button color="linear-gradient(180deg,#fffab8, #f552bd)" icon="chat-o" style="width: 76px;height: 76px;border-radius: 50%;box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);" @click="goToChat(0, users_id, nickname)">
              发消息
            </van-button>
            <!-- <button @click="addItem">增加一个item</button> -->
          </div>
        </div>

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { SilderLike, SilderLikeItem } from 'vue-silder-like'

export default {
  name: 'Meet',
  components: {
    SilderLike,
    SilderLikeItem
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
      items: [
        { title: '卡片1', body: '内容1', img: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        { title: '卡片2', body: '内容2', img: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        { title: '卡片3', body: '内容3', img: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        { title: '卡片4', body: '内容4', img: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        { title: '卡片5', body: '内容5', img: 'https://img.yzcdn.cn/vant/cat.jpeg' }
      ],
      // 当前用户的 id 值
      users_id: 0,
      // 当前用户的 昵称
      nickname: ''
    }
  },
  created () {
    this.getAlluser()
  },
  mounted () {
  },
  methods: {
    addItem () {
      this.items.push({ title: '卡片' + (this.items.length + 1), body: '卡片' + (this.items.length + 1), img: '//static.51kcwc.com/car/static/activity/spring/zunyi/h1@2x.png' })
    },
    nulike (item) {
      console.log('不喜欢', item)
      this.$refs.show_introduce_oneself[0].innerText = this.$refs.introduce_oneself[1].innerText
      this.dislike(item.users_id)
      this.users_id = Number(this.$refs.users_id[1].innerText.trim())
      this.nickname = this.$refs.nickname[1].innerText.trim()
    },
    like (item) {
      console.log('喜欢', item)
      this.$refs.show_introduce_oneself[0].innerText = this.$refs.introduce_oneself[1].innerText
      // this.dislike(item.users_id)
      this.users_id = Number(this.$refs.users_id[1].innerText.trim())
      this.nickname = this.$refs.nickname[1].innerText.trim()
    },
    // 获取所有用户
    async getAlluser () {
      const { data: res } = await this.$http.post('/wpapi/wx/meet_init')
      if (res.status !== 200) return this.$notify(res.msg)
      this.items = res.data
      this.users_id = res.data[0].users_id
      this.nickname = res.data[0].nickname
    },
    // 不喜欢标记
    async dislike (dislikeUsersid) {
      const { data: res } = await this.$http.post('/wpapi/wx/dislike', {
        dislike_users_id: dislikeUsersid
      })
      if (res.status !== 200) return this.$notify(res.msg)
    },
    // 聊天页
    goToChat (chatType, faceToFaceId, nickname) {
      this.$store.commit('getChatType', {
        chatType,
        faceToFaceId
      })
      this.$store.dispatch('getActionsChatName', nickname)
      this.$router.push('/chat')
    }
  }
}
</script>

<style lang="less">
  .van-button__content {
    flex-direction: column;
    i {
      font-size: 30px;
    }
  }
  .card:nth-child(2) {
    opacity: .6 !important;
  }
  .card:nth-child(3) {
    opacity: .3 !important;
  }
</style>
