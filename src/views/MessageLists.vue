<template>
  <div class="message_lists">

    <van-tabs v-model="active" animated border @change="messageListsChangeSwitch">
      <van-tab v-for="item in tab_title" :title="item.title" :key="item.id">

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-swipe-cell v-for="(item, index) in unreadMessage" :key="index">
              <template #left>
                <van-button square type="warning" text="举报" style="height: 100%;" />
              </template>
              <van-cell center title-style="text-align:left;margin-left:10px;overflow:hidden;" @click="goToChat(active, item.id, item.nickname)">
                <template #icon>
                  <van-image width="40" height="40" radius="2" style="overflow: unset;" :src="item.head_portrait ? `http://admin.qianlixunta.com${item.head_portrait}` : require('../assets/logo_currency01.png')">
                    <template v-slot:default v-if="active">
                      <van-icon dot style="position: absolute;top: 0;right: 0;" />
                    </template>
                  </van-image>
                </template>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.nickname}}</div>
                  <div style="color:rgba(0,0,0,.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.content}}</div>
                </template>
                <template #default>
                  <span class="custom-title">{{timeFilter(item.time ? item.time.replace(/-/g, '/') : '')}}</span>
                </template>
              </van-cell>
              <template #right>
                <van-button square type="warning" text="拉黑" style="height: 100%;" />
                <van-button square type="danger" text="删除" style="height: 100%;" />
              </template>
            </van-swipe-cell>

          </van-list>
        </van-pull-refresh>

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
export default {
  name: 'MessageLists',
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
        title: '系统消息'
      }],
      // 下拉刷新显示隐藏
      refreshing: false,
      loading: false,
      finished: false,
      // 未读消息
      unreadMessage: {}
    }
  },
  created () {
    this.getUnreadMessage(1)
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
    },
    // 未读消息
    async getUnreadMessage (page) {
      const { data: res } = await this.$http.post('/wpapi/wx/private_letter_init')
      if (res.status !== 200) return this.$notify(res.msg)
      this.unreadMessage = res.data ? res.data : []
    },
    // 消息时间过滤器
    timeFilter (timer) {
      if (!timer) return
      return `${new Date(timer).getMonth() < 9 ? '0' + (new Date(timer).getMonth() + 1) : new Date(timer).getMonth() + 1}-${new Date(timer).getDate() < 9 ? '0' + new Date(timer).getDate() : new Date(timer).getDate()}`
    },
    // tab 滑动切换事件
    messageListsChangeSwitch (name, title) {
      if (name === 0) {
        this.getUnreadMessage(1)
      } else if (name === 1) {
        this.unreadMessage = [{
          content: '欢迎来到千里寻他',
          nickname: '消息小助手',
          id: 0
        }]
      }
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

</style>
