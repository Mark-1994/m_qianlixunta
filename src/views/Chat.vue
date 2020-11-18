<template>
  <div class="chat">

    <van-tabs v-model="active" animated border @change="chatSwitch">
      <van-tab v-for="item in tab_title" :title="item.title" :key="item.id" :disabled="!!$store.state.chatType && item.id === 1">

        <van-list v-if="!item.id">
          <van-cell v-for="(item, index) in list.message_info ? list.message_info : list" :key="index" style="background-color: transparent;">
            <template #default>
              <van-row type="flex" justify="space-between">
                <van-col span="4" v-if="item.fromid != users_id">
                  <!-- <van-image
                    width="40"
                    height="40"
                    radius="2"
                    lazy-load
                    :src="item.fromid_head_portrait ? `http://admin.qianlixunta.com${item.fromid_head_portrait}` : require('../assets/logo_currency01.png')"
                  /> -->
                  <van-image
                    width="40"
                    height="40"
                    radius="2"
                    lazy-load
                    class="left_head"
                    :alt="item.fromname"
                    ref="leftHead"
                    :src="item.fromid_head_portrait ? `http://admin.qianlixunta.com${item.fromid_head_portrait}` : require('../assets/logo_currency01.png')"
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
                  <!-- <van-image
                    width="40"
                    height="40"
                    radius="2"
                    lazy-load
                    :src="item.toid_head_portrait ? `http://admin.qianlixunta.com${item.toid_head_portrait}` : require('../assets/logo_currency01.png')"
                  /> -->
                  <van-image
                    width="40"
                    height="40"
                    radius="2"
                    lazy-load
                    class="right_head"
                    :alt="item.fromname"
                    :src="item.fromid_head_portrait ? `http://admin.qianlixunta.com${item.fromid_head_portrait}` : require('../assets/logo_currency01.png')"
                  />
                </van-col>
              </van-row>
            </template>
          </van-cell>
        </van-list>

        <van-list v-if="item.id">
          <div class="user_info_box" style="padding: 12px;">
            <van-row>
              <van-col span="24">
                <van-row type="flex" justify="space-between">
                  <van-col span="10">
                    <van-image
                      width="100%"
                      height="8rem"
                      fit="fill"
                      radius="4"
                      :src="userInfo.head_portrait ? 'http://admin.qianlixunta.com' + userInfo.head_portrait : 'http://admin.qianlixunta.com/upload/admin/article/thumbnail/20200807/nan.png'"
                    />
                  </van-col>
                  <van-col span="12" style="padding-top: 2rem;">
                    <van-row type="flex" justify="space-between" align="center">
                      <van-col span="17" style="font-size: 22px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{userInfo.nickname}}</van-col>
                      <van-col span="7"><van-tag type="primary" size="large" color="#379AFD">{{Number(userInfo.users_year) ? new Date().getFullYear() - userInfo.users_year : '年龄'}}岁</van-tag></van-col>
                    </van-row>
                    <van-row type="flex" justify="space-between" style="margin-top: 1rem;">
                      <!-- <van-col span="7"><van-tag size="large" color="#917FFE" style="display: block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{userInfo.workplace ? userInfo.workplace.split('省')[0] : '城市'}}</van-tag></van-col> -->
                      <van-col span="7"><van-tag size="large" color="#917FFE" style="display: block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{userInfo.workplace ? userInfo.workplace.split('省/').length > 1 ? userInfo.workplace.split('省/')[1].split('市/')[0] : userInfo.workplace.split('市/').length > 1 ? userInfo.workplace.split('市/')[0] : userInfo.workplace.split('区/')[0] : '城市'}}</van-tag></van-col>
                      <van-col span="7"><van-tag size="large" color="#917FFE" style="display: block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{userInfo.marital_status ? userInfo.marital_status : '婚姻'}}</van-tag></van-col>
                      <van-col span="7"><van-tag size="large" color="#917FFE" style="display: block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{userInfo.education ? userInfo.education : '学历'}}</van-tag></van-col>
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
                  <van-swipe-item v-for="(item01, index) in userInfo.life_imgs ? JSON.parse(userInfo.life_imgs) : []" :key="index">
                    <van-image :src="'http://admin.qianlixunta.com' + item01" width="90" height="90" radius="4" lazy-load />
                  </van-swipe-item>
                  <!-- <van-swipe-item>
                    <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" width="90" height="90" radius="4" lazy-load />
                  </van-swipe-item> -->
                </van-swipe>

              </van-col>
            </van-row>

            <div v-if="true">
            <van-row>
              <van-col span="24" style="text-align: left;">
                <h4>自我介绍</h4>
                <p style="color: rgba(0,0,0,.4)">{{userInfo.introduce_oneself}}</p>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24" style="text-align: left;">
                <h4>标签</h4>
                <van-row gutter="10">
                  <van-col>
                    <van-tag type="primary" color="#917FFE" size="large" v-for="(item, index) in userInfo.tag_arr" :key="index" style="margin: 3px;">{{item}}</van-tag>
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
                    {{userInfo.smoke}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">饮酒：</span>
                    {{userInfo.drink_wine}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">饮食习惯：</span>
                    {{userInfo.eating_habits}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">宗教信仰：</span>
                    {{userInfo.religious_belief}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">作息时间：</span>
                    {{userInfo.time_table}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">交际圈子：</span>
                    {{userInfo.social_circle}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">锻炼习惯：</span>
                    {{userInfo.exercise_habits}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">逛街购物：</span>
                    {{userInfo.shopping_habits}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">最大消费：</span>
                    {{userInfo.maximum_consumption}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">家务：</span>
                    {{userInfo.household_distribution}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">宠物：</span>
                    {{userInfo.pet_rearing}}
                  </van-col>
                </van-row>
              </van-col>

              <!-- 婚姻观念 -->
              <van-col span="24" style="text-align: left;">
                <h4>婚姻观念</h4>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">籍贯：</span>
                    {{userInfo.native_place}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">国籍：</span>
                    {{userInfo.nationality}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">性格：</span>
                    {{userInfo.personality}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">幽默感：</span>
                    {{userInfo.sense_of_humor}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">脾气：</span>
                    {{userInfo.bad_temper}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">是否投入看真实情况：</span>
                    {{userInfo.treat_feelings}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">是否愿意要孩子：</span>
                    {{userInfo.about_children}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">结婚：</span>
                    {{userInfo.get_married}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">长时间异地恋：</span>
                    {{userInfo.long_distance_love}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">理想婚姻：</span>
                    {{userInfo.ideal_marriage}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">赡养老人：</span>
                    {{userInfo.parents_live_together}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">是否是独生子女：</span>
                    {{userInfo.home_ranking}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">兄妹还是姐弟：</span>
                    {{userInfo.brothers_and_sisters}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">父母健康情况：</span>
                    {{userInfo.parents}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">父亲工作：</span>
                    {{userInfo.father_job}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">母亲工作：</span>
                    {{userInfo.mother_job}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">父母是否有退休金：</span>
                    {{userInfo.parent_economy}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">父母是否有医疗保险：</span>
                    {{userInfo.parents_medical_insurance}}
                  </van-col>
                </van-row>
              </van-col>

              <!-- 经济实力 -->
              <van-col span="24" style="text-align: left;">
                <h4>经济实力</h4>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">投资理财：</span>
                    {{userInfo.investment_and_financing}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">外债贷款：</span>
                    {{userInfo.foreign_debt_loan}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">经济观念：</span>
                    {{userInfo.economic_concept}}
                  </van-col>
                </van-row>
              </van-col>

              <!-- 体型外貌 -->
              <van-col span="24" style="text-align: left;">
                <h4>体型外貌</h4>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">体重：</span>
                    {{userInfo.weight}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">体型：</span>
                    {{userInfo.shape}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">脸型：</span>
                    {{userInfo.face_shape}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">眼睛：</span>
                    {{userInfo.eye}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">头发：</span>
                    {{userInfo.hair}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">皮肤：</span>
                    {{userInfo.skin}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">肌肉：</span>
                    {{userInfo.muscle}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">穿衣风格：</span>
                    {{userInfo.dressing_style}}
                  </van-col>
                </van-row>
              </van-col>

              <!-- 兴趣爱好 -->
              <van-col span="24" style="text-align: left;">
                <h4>兴趣爱好</h4>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">旅游：</span>
                    {{userInfo.travel_play}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">饮食：</span>
                    {{userInfo.food}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">书籍：</span>
                    {{userInfo.book}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">电影：</span>
                    {{userInfo.film}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">节目：</span>
                    {{userInfo.program}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">娱乐休闲：</span>
                    {{userInfo.entertainment_leisure}}
                  </van-col>
                </van-row>
                <van-row style="line-height: 30px;">
                  <van-col>
                    <span style="color: rgba(0,0,0,.5);">业余爱好：</span>
                    {{userInfo.avocation}}
                  </van-col>
                </van-row>
              </van-col>

            </van-row>
            </div>
            <!-- <van-row>
              <van-col span="24">标签</van-col>
            </van-row> -->
          </div>
        </van-list>

      </van-tab>
    </van-tabs>

    <div v-if="!active" style="position: fixed;bottom: 0;background-color: #dcdcdc;width: 100%;">
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
        // {
        //   id: 0,
        //   nickname: '黎明',
        //   headimg: 'https://img.yzcdn.cn/vant/cat.jpeg',
        //   time: '2020/09/29 上午10:56:59',
        //   content: '你好'
        // }
      ],
      // 输入框的内容
      sms: '',
      // 登录人的users_id
      users_id: localStorage.getItem('users_id'),
      // 用户所有信息
      userInfo: {}
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
  mounted () {
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
      this.$nextTick(() => {
        console.log(this.$refs.leftHead[0].alt)
      })
      this.getMessageStatus()
    },
    // tab 切换事件
    chatSwitch (name, title) {
      if (!name) {
        console.log('私信')
      } else if (name === 1) {
        this.getUserInfo(this.$store.state.faceToFaceId)
      }
    },
    // 获取用户信息
    async getUserInfo (beiUsersid) {
      const { data: res } = await this.$http.post('/wpapi/me/select_users_info', {
        bei_users_id: beiUsersid
      })
      if (res.status !== '200') return this.$notify(res.msg)
      this.userInfo = res.data
      this.userInfo.tag_arr = res.tag_arr
    },
    // 更新消息已读状态
    async getMessageStatus () {
      const { data: res } = await this.$http.post('/wpapi/wx/private_letter_update', {
        to_users_id: this.$store.state.faceToFaceId
      })
      if (res.status !== 200) return this.$notify(res.msg)
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
