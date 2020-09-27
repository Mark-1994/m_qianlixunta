<template>
  <div class="me">

    <van-nav-bar
      title="千里寻TA"
      left-arrow>
      <template #right>
        <van-dropdown-menu>
          <van-dropdown-item :options="option1" />
          <!-- <van-icon name="ellipsis" /> -->
        </van-dropdown-menu>
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit">
      <van-field>
        <template #input>
          <van-row>
            <van-col>
              <van-uploader :after-read="afterRead" />
            </van-col>
            <van-col>
              上传头像真实头像更容易找到另一半哦~
            </van-col>
          </van-row>
        </template>
      </van-field>
      <van-field>
        <template #input>
          <h4>照片</h4>
          <van-uploader :after-read="afterRead" />
        </template>
      </van-field>
      <van-field v-model="nickname" label="文本" placeholder="请输入用户名" />
      <van-field
        readonly
        clickable
        name="sex"
        :value="sex"
        label="选择器"
        placeholder="点击选择城市"
        @click="showSex = true"
      />
      <van-popup v-model="showSex" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsSex"
          @confirm="onConfirmSex"
          @cancel="showSex = false"
        />
      </van-popup>

      <!-- 现住地 -->
      <van-field
        readonly
        clickable
        name="area"
        :value="areaValue"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirmArea"
          @cancel="showArea = false"
        />
      </van-popup>

      <!-- 婚姻状况 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="marriageValue"
        label="婚姻状况"
        placeholder="点击选择婚姻状况"
        @click="showMarriage = true"
      />
      <van-popup v-model="showMarriage" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsMarriage"
          @confirm="onConfirmMarriage"
          @cancel="showMarriage = false"
        />
      </van-popup>

      <!-- 自我介绍 -->
      <van-field
        v-model="introduction"
        rows="3"
        autosize
        label="自我介绍"
        type="textarea"
        placeholder="介绍一下你自己把~"
      />

      <!-- 标签 -->
      <van-field>
        <template #input>
          <h4>标签</h4>
          <van-tag type="primary" size="medium">旅游</van-tag>
          <van-tag type="primary" size="medium">二次元</van-tag>
          <van-tag type="primary" size="medium">狮子座</van-tag>
        </template>
      </van-field>

      <!-- 生活方式 -->
      <h4>生活方式</h4>
      <!-- 吸烟 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="lifeValue"
        label="吸烟"
        placeholder="点击选择"
        @click="showLife = true"
      />
      <van-popup v-model="showLife" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsLife"
          @confirm="onConfirmLife"
          @cancel="showLife = false"
        />
      </van-popup>
      <!-- 饮酒 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="drinkValue"
        label="饮酒"
        placeholder="点击选择"
        @click="showDrink = true"
      />
      <van-popup v-model="showDrink" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsDrink"
          @confirm="onConfirmDrink"
          @cancel="showDrink = false"
        />
      </van-popup>
      <!-- 作息时间 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="timeValue"
        label="作息时间"
        placeholder="点击选择"
        @click="showTime = true"
      />
      <van-popup v-model="showTime" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsTime"
          @confirm="onConfirmTime"
          @cancel="showTime = false"
        />
      </van-popup>
      <!-- 作息时间 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="contactValue"
        label="交际圈子"
        placeholder="点击选择"
        @click="showContact = true"
      />
      <van-popup v-model="showContact" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsContact"
          @confirm="onConfirmContact"
          @cancel="showContact = false"
        />
      </van-popup>

    </van-form>

    <van-tabbar v-model="tabbar_active" active-color="#379AFD" inactive-color="#0A2250" safe-area-inset-bottom :border="true">
      <van-tabbar-item icon="chat-o">信息</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
      <van-tabbar-item icon="shop-o">购买</van-tabbar-item>
      <van-tabbar-item icon="like-o">邂逅</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: 'Me',
  components: {
  },
  data () {
    return {
      option1: [
        { text: '信息', value: 0 },
        { text: '我的', value: 1 },
        { text: '购买', value: 2 },
        { text: '邂逅', value: 3 }
      ],
      tabbar_active: 0,
      // 是否展示
      showSex: false,
      // 昵称
      nickname: '',
      // 性别
      sex: '',
      // 性别列表
      columnsSex: ['男', '女'],
      // 显示隐藏现住地
      showArea: false,
      // 现住地列表
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          110200: '县',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
        }
      },
      // 省市区选中的值
      areaValue: '',
      // 婚姻状况选中的值
      marriageValue: '',
      // 显示隐藏婚姻状况选择器
      showMarriage: false,
      // 婚姻状况数据列表
      columnsMarriage: ['未婚', '已婚', '离异'],
      // 自我介绍
      introduction: '',
      // 吸烟选中的值
      lifeValue: '',
      // 显示隐藏吸烟弹框
      showLife: false,
      // 吸烟选项
      columnsLife: ['不抽烟也不讨厌他人抽烟', '不吸烟', '经常吸烟'],
      // 饮酒值
      drinkValue: '',
      // 显示隐藏饮酒选项卡
      showDrink: false,
      // 饮酒选项
      columnsDrink: ['饮酒', '不饮酒', '小酌'],
      // 作息时间值
      timeValue: '',
      // 显示隐藏作息时间选项卡
      showTime: false,
      // 作息时间选项
      columnsTime: ['偶尔懒散一下', '懒癌患者', '勤劳的小蜜蜂'],
      // 交际圈子值
      contactValue: '',
      // 显示隐藏交际圈子选项卡
      showContact: false,
      // 交际圈子选项
      columnsContact: ['经常和朋友见面', '五湖四海']
    }
  },
  methods: {
    afterRead (file) {
      console.log(file)
    },
    // 表单提交 保存资料
    onSubmit (values) {
      console.log('submit', values)
    },
    // 性别确定事件
    onConfirmSex () {
      this.showSex = false
    },
    // 现住地确认事件
    onConfirmArea () {
      console.log('现住地')
    },
    // 婚姻状况事件
    onConfirmMarriage () {
      console.log('婚姻状况')
    },
    // 吸烟确定事件
    onConfirmLife () {
      console.log('吸烟')
    },
    // 饮酒确定事件
    onConfirmDrink () {
      console.log('饮酒')
    },
    // 作息时间确定事件
    onConfirmTime () {
      console.log('作息时间')
    },
    // 交际圈子确定事件
    onConfirmContact () {
      console.log('交际圈子')
    }
  }
}
</script>

<style lang="less">
  .van-nav-bar {
    background: linear-gradient(154deg,#ff2a86, #927ffe 65%, #917fff 83%, #9effff 181%);
  }
  .van-nav-bar i.van-icon {
    color: #fff;
  }
  .van-nav-bar .van-nav-bar__right i.van-icon {
    transform: rotate(90deg);
    font-weight: bold;
  }
  .van-dropdown-menu__bar {
    background-color: transparent;
  }
  .van-dropdown-menu__title::after {
    opacity: 1;
    content: '...';
    color: #fff;
    font-size: 24px;
    transform: translateY(-50%) rotate(-90deg);
    border: 0;
    margin-top: 0;
  }
</style>
