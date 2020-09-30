<template>
  <div class="chat">

    <van-tabs v-model="active" animated border>
      <van-tab v-for="item in tab_title" :title="item.title" :key="item.id">

        <van-list>
          <van-cell v-for="item in list" :key="item.id" style="background-color: transparent;">
            <template #default>
              <van-row>
                <van-col span="4">
                  <van-image
                    width="40"
                    height="40"
                    lazy-load
                    :src="item.headimg"
                  />
                </van-col>
                <van-col span="20" style="background-color: #fff;border-radius: 2px;padding: 10px;">
                  span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8span: 8
                </van-col>
              </van-row>
            </template>
          </van-cell>
        </van-list>

      </van-tab>
    </van-tabs>

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
        },
        {
          id: 1,
          nickname: '张学友',
          headimg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          time: '2020/09/29 上午10:57:59',
          content: '你好'
        },
        {
          id: 2,
          nickname: '张学友',
          headimg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          time: '2020/09/29 上午10:57:59',
          content: '你好'
        },
        {
          id: 3,
          nickname: '张学友',
          headimg: 'https://img.yzcdn.cn/vant/cat.jpeg',
          time: '2020/09/29 上午10:57:59',
          content: '你好'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
  html,
  body {
    background-color: #F3F3F3;
  }
</style>
