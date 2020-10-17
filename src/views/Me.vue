<template>
  <div class="me">

    <van-form @submit="onSubmit">
      <van-field>
        <template #input>
          <van-row type="flex" align="center" justify="center" style="width: 100%;">
            <van-col>
              <van-uploader :after-read="afterRead" v-model="fileList" :show-upload="!fileList.length" upload-icon="plus" />
            </van-col>
            <van-col>
              上传头像真实头像更容易找到另一半哦~
            </van-col>
          </van-row>
        </template>
      </van-field>
      <van-field label="照片">
        <template #input>
          <van-uploader v-model="uploader" :after-read="afterRead" :max-count="9" />
        </template>
      </van-field>
      <van-field v-model="nickname" label="昵称" placeholder="请输入用户名" />
      <van-field
        readonly
        clickable
        name="sex"
        :value="sex"
        label="性别"
        placeholder="点击选择"
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

      <!-- 出生日期 -->

      <!-- 现住地 -->
      <van-field
        readonly
        clickable
        name="area"
        :value="areaValue"
        label="现住地"
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
        placeholder="介绍一下你自己吧~"
      />

      <!-- 标签 -->
      <van-field label="标签">
        <template #input>
          <van-tag color="#917FFE" size="medium" style="margin-right: 6px;">旅游</van-tag>
          <van-tag color="#917FFE" size="medium" style="margin-right: 6px;">二次元</van-tag>
          <van-tag color="#917FFE" size="medium" style="margin-right: 6px;">狮子座</van-tag>
        </template>
      </van-field>

      <!-- 生活方式 -->
      <h4 style="text-align: left;padding: 10px 16px;margin: 0;">生活方式</h4>
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
      <!-- 交际圈子 -->
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

  </div>
</template>

<script>
export default {
  name: 'Me',
  components: {
  },
  data () {
    return {
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
      columnsMarriage: ['未婚', '离婚', '丧偶'],
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
      columnsContact: ['经常和朋友见面', '五湖四海'],
      // 头像
      fileList: [{
        url: 'https://img.yzcdn.cn/vant/sand.jpg'
      }],
      // 生活照
      uploader: [{
        url: 'https://img.yzcdn.cn/vant/leaf.jpg'
      }]
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

</style>
