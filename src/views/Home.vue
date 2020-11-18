<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <van-dropdown-menu style="background-color: #fff;">
      <van-dropdown-item title="筛选" ref="searchForm">
        <!-- 年龄 -->
        <van-field
          readonly
          clickable
          name="search_age"
          :value="search_age"
          label="年龄"
          placeholder="点击选择年龄"
          @click="showSearchAge = true"
          input-align="right"
        />
        <van-popup v-model="showSearchAge" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsSearchAge"
            @confirm="onConfirmSearchAge"
            @cancel="showSearchAge = false"
          />
        </van-popup>

        <!-- 学历 -->
        <van-field
          readonly
          clickable
          name="search_education"
          :value="search_form.education"
          label="学历"
          placeholder="点击选择学历"
          @click="showSearchEducation = true"
          input-align="right"
        />
        <van-popup v-model="showSearchEducation" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsSearchEducation"
            @confirm="onConfirmSearchEducation"
            @cancel="showSearchEducation = false"
          />
        </van-popup>

        <!-- 婚姻 -->
        <van-field
          readonly
          clickable
          name="search_marital"
          :value="search_form.marital_status"
          label="婚姻"
          placeholder="点击选择婚姻"
          @click="showSearchMarital = true"
          input-align="right"
        />
        <van-popup v-model="showSearchMarital" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsSearchMarital"
            @confirm="onConfirmSearchMarital"
            @cancel="showSearchMarital = false"
          />
        </van-popup>

        <!-- 现工作地 -->
        <van-field
          readonly
          clickable
          name="search_workplace"
          :value="search_form.workplace"
          label="现工作地"
          placeholder="点击选择现工作地"
          @click="showSearchWorkplace = true"
          input-align="right"
        />
        <van-popup v-model="showSearchWorkplace" round position="bottom">
          <van-area
            show-toolbar
            :area-list="columnsSearchWorkplace"
            @confirm="onConfirmSearchWorkplace"
            @cancel="showSearchWorkplace = false"
          />
        </van-popup>

        <!-- 身高 -->
        <van-field
          readonly
          clickable
          name="search_height"
          :value="search_form.height"
          label="身高"
          placeholder="点击选择身高"
          @click="showSearchHeight = true"
          input-align="right"
        />
        <van-popup v-model="showSearchHeight" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsSearchHeight"
            @confirm="onConfirmSearchHeight"
            @cancel="showSearchHeight = false"
          />
        </van-popup>

        <!-- 月收入 -->
        <van-field
          readonly
          clickable
          name="search_monthly_salary"
          :value="search_form.monthly_salary"
          label="月收入"
          placeholder="点击选择月收入"
          @click="showSearchMonthlySalary = true"
          input-align="right"
        />
        <van-popup v-model="showSearchMonthlySalary" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columnsSearchMonthlySalary"
            @confirm="onConfirmSearchMonthlySalary"
            @cancel="showSearchMonthlySalary = false"
          />
        </van-popup>

        <van-cell center title="购房" style="text-align: left;">
          <template #right-icon>
            <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
          </template>
        </van-cell>
        <van-cell center title="购车" style="text-align: left;">
          <template #right-icon>
            <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
          </template>
        </van-cell>
        <van-cell center title="海外工作" style="text-align: left;">
          <template #right-icon>
            <van-switch v-model="switch3" size="24" active-color="#ee0a24" />
          </template>
        </van-cell>

        <div style="padding: 5px 16px;">
          <van-button type="danger" block round @click="onConfirmSearchForm">
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <van-tabs v-model="active" animated border swipeable @click="homeSwitch" @change="homeSwitch" style="background-color: #fff;">
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
                  <van-col span="9" class="item_sex_age" :style="item01.sex ? 'background-color: #1989fa;' : ''">
                    <van-icon name="flower-o" size="10" :class="`iconfont ${item01.sex ? 'icon-male2' : 'icon-nvxing'}`" />
                    {{Number(item01.users_year) ? new Date().getFullYear() - item01.users_year : '年龄'}}岁
                  </van-col>
                </van-row>
              </div>
              <van-row type="flex" justify="space-between" align="center">
                <van-col span="12">
                  <van-icon name="location" color="#D5004E" size="25" />
                  {{item01.workplace.split('/')[0].replace(/省|市/, '')}}
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
import areaList from '@/assets/json/areaList.json'

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
      pages: 0,
      // 有无照片
      switch1: false,
      // 有无购车
      switch2: false,
      // 有无海外工作
      switch3: false,
      // 筛选表单数据
      search_age: '',
      // 筛选表单年龄下拉框显示隐藏
      showSearchAge: false,
      // 筛选表单年龄下拉框数据
      columnsSearchAge: ['20-30', '30-40', '40-50'],
      // 筛选表单学历下拉框显示隐藏
      showSearchEducation: false,
      // 筛选表单学历下拉框数据
      columnsSearchEducation: ['博士', '硕士', '本科', '大专', '高职', '其他'],
      // 筛选表单婚姻下拉框显示隐藏
      showSearchMarital: false,
      // 筛选表单婚姻下拉框数据
      columnsSearchMarital: ['未婚', '离婚', '丧偶'],
      // 筛选表单现工作地下拉框显示隐藏
      showSearchWorkplace: false,
      // 筛选表单现工作地下拉框数据
      columnsSearchWorkplace: areaList,
      // 筛选表单身高下拉框显示隐藏
      showSearchHeight: false,
      // 筛选表单身高下拉框数据
      columnsSearchHeight: ['160-170', '170-180', '180-190', '190-200', '200-210'],
      // 筛选表单月收入下拉框显示隐藏
      showSearchMonthlySalary: false,
      // 筛选表单月收入下拉框数据
      columnsSearchMonthlySalary: ['1000-3000', '3001-5000', '5001-8000', '8001-12000', '12001-20000', '20001-50000', '50001-100000'],
      search_form: {
        page: 1,
        age_low: '',
        age_height: '',
        education: '',
        marital_status: '',
        car_type: '',
        monthly_salary: '',
        height: '',
        workplace: '',
        is_abroad: '',
        house_type: ''
      },
      // 筛选事件 flag
      filterFlag: 0
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
            title: '千里寻他-征婚、交友、相亲，武汉单身婚恋平台',
            desc: '武汉千里寻他致力于为同城单身优质男女创造一个真实可靠一对一的相亲交友平台',
            link: 'http://m.qianlixunta.com/',
            imgUrl: 'http://m.qianlixunta.com/images/wx_share01.jpg'
          })

          // 分享给朋友
          wx.updateAppMessageShareData({
            title: '千里寻他-征婚、交友、相亲，武汉单身婚恋平台',
            desc: '武汉千里寻他致力于为同城单身优质男女创造一个真实可靠一对一的相亲交友平台',
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
        this.filterFlag = 0
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
      if (!this.filterFlag) {
        const { data: res } = await this.$http.post('/wpapi/member/find_friend', {
          page: page
        })
        if (res.status !== 200) return console.log('加载失败')
        for (let i = 0; i < res.data.data.length; i++) {
          this.user_list.push(res.data.data[i])
        }
        if (!callback) return false
        callback(Boolean(res.data.current_page === res.data.last_page))
      } else {
        this.search_form.page = page
        const { data: res } = await this.$http.post('/wpapi/member/select_friend', this.search_form)
        if (res.status !== 200) return console.log('加载失败')
        for (let i = 0; i < res.data.data.length; i++) {
          this.user_list.push(res.data.data[i])
        }
        if (!callback) return false
        callback(Boolean(res.data.current_page === res.data.last_page))
      }
    },
    // 年龄下拉框选中事件
    onConfirmSearchAge (value) {
      this.search_age = value
      this.showSearchAge = false
    },
    // 学历下拉框选中事件
    onConfirmSearchEducation (value) {
      this.search_form.education = value
      this.showSearchEducation = false
    },
    // 婚姻下拉框选中事件
    onConfirmSearchMarital (value) {
      this.search_form.marital_status = value
      this.showSearchMarital = false
    },
    // 现工作地下拉框选中事件
    onConfirmSearchWorkplace (value) {
      this.search_form.workplace = value
        .filter(item => !!item)
        .map(item => item.name)
        .join('/')
      this.showSearchWorkplace = false
    },
    // 身高下拉框选中事件
    onConfirmSearchHeight (value) {
      this.search_form.height = value
      this.showSearchHeight = false
    },
    // 月收入下拉框选中事件
    onConfirmSearchMonthlySalary (value) {
      this.search_form.monthly_salary = value
      this.showSearchMonthlySalary = false
    },
    // 筛选确认按钮
    onConfirmSearchForm () {
      if (this.search_age) {
        this.search_form.age_low = this.search_age.split('-')[0]
        this.search_form.age_height = this.search_age.split('-')[1]
      }
      this.search_form.house_type = this.switch1 ? 1 : 0
      this.search_form.car_type = this.switch2 ? 1 : 0
      this.search_form.is_abroad = this.switch3 ? 1 : 0
      this.$refs.searchForm.toggle()
      this.getSelectFriend(this.search_form)
    },
    // 筛选事件
    async getSelectFriend (searchForm) {
      this.filterFlag = 1
      this.pages = 1
      searchForm.page = 1
      const { data: res } = await this.$http.post('/wpapi/member/select_friend', searchForm)
      if (res.status !== 200) return this.$notify(res.msg)
      this.user_list = res.data.data
      if (res.data.current_page === res.data.last_page || res.data.data) {
        this.finished = true
      } else {
        this.finished = false
      }
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
