<template>
  <div class="chat">

    <van-tabs v-model="active" animated border>
      <van-tab v-for="item in tab_title" :title="item.title" :key="item.id" :disabled="!!$store.state.chatType && item.id === 1">

        <van-list v-if="!item.id">
          <van-cell v-for="(item, index) in list.message_info ? list.message_info : list" :key="index" style="background-color: transparent;">
            <template #default>
              <van-row type="flex" justify="space-between">
                <van-col span="4" v-if="item.fromid != users_id">
                  <van-image
                    width="40"
                    height="40"
                    radius="2"
                    lazy-load
                    :src="require('../assets/logo_currency01.png')"
                  />
                </van-col>
                <van-col span="20" style="background-color: #fff;border-radius: 2px;padding: 10px;">
                  <p style="font-weight: bold;" v-if="item.title">{{item.title}}</p>
                  <p v-if="item.pay_time">{{item.pay_time}}</p>
                  <p v-if="item.content" :style="item.title ? '' : 'margin: 0'">{{item.content}}</p>
                  <p v-if="item.order_osn">{{item.order_osn}}</p>
                  <!-- <p>{{item.status}}</p> -->
                  <!-- <p>{{item.vip_price}}</p> -->
                </van-col>
                <van-col span="4" v-if="item.fromid == users_id" style="text-align: right;">
                  <van-image
                    width="40"
                    height="40"
                    radius="2"
                    lazy-load
                    :src="require('../assets/logo_currency01.png')"
                  />
                </van-col>
              </van-row>
            </template>
          </van-cell>
        </van-list>

        <van-list v-if="item.id">
          TA的资料
        </van-list>

      </van-tab>
    </van-tabs>

    <div style="position: fixed;bottom: 0;background-color: #dcdcdc;width: 100%;">
      <van-form @submit="onSubmit">
        <van-field
          v-model="sms"
          rows="1"
          center
          autosize
          type="textarea"
          :disabled="!!this.$store.state.chatType"
          placeholder="说点什么吧..."
        >
          <template #button>
            <van-button native-type="submit" color="#379AFD" size="small" :disabled="sms ? false : true">发送</van-button>
          </template>
        </van-field>
      </van-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Chat',
  components: {
  },
  data () {
    return {
      active: 0,
      // 首页两个 tab title
      tab_title: [{
        id: 0,
        title: '私信'
      }, {
        id: 1,
        title: 'TA的资料'
      }],
      // 聊天数据
      list: [
        {
          id: 0,
          nickname: '黎明',
          headimg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          time: '2020/09/29 上午10:56:59',
          content: '你好'
        }
      ],
      // 输入框的内容
      sms: '',
      // 登录人的users_id
      users_id: localStorage.getItem('users_id')
    }
  },
  created () {
    this.$emit('footer', false)
    if (!this.$store.state.chatType) {
      // 私信
      this.getChatMessages()
    } else {
      // 系统消息
      this.getSystemMessages(1)
    }
  },
  destroyed () {
    this.$emit('footer', true)
  },
  methods: {
    // 系统消息
    async getSystemMessages (page) {
      const { data: res } = await this.$http.post('/wpapi/member/system_message', {
        page: page
      })
      if (res.status !== '200') return this.$notify(res.msg)
      this.list = res.data
    },
    // 发送消息
    async onSubmit () {
      const { data: res } = await this.$http.post('/wpapi/me/chat_start', {
        // bei_users_id: 57,
        bei_users_id: this.$store.state.faceToFaceId,
        content: this.sms
      })
      if (res.status !== '200') return this.$notify(res.msg)
      this.sms = ''
      this.getChatMessages()
    },
    // 消息列表
    async getChatMessages () {
      const { data: res } = await this.$http.post('/wpapi/me/chat_start_init', {
        fromid: localStorage.getItem('users_id'),
        toid: this.$store.state.faceToFaceId
        // toid: 57
      })
      if (res.status !== '200') return this.$notify(res.msg)
      this.list = res.data
    }
  }
}
</script>

<style lang="less">
  html,
  body {
    background-color: #F3F3F3;
  }
</style>
