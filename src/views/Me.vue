<template>
  <div class="me">

    <van-form @submit="onSubmit">
      <van-field name="head_portrait">
        <template #input>
          <van-row type="flex" align="center" justify="center" style="width: 100%;">
            <van-col span="6">
              <van-uploader :after-read="afterRead" v-model="fileList" :show-upload="!fileList.length" upload-icon="plus" />
            </van-col>
            <van-col span="18">
              上传头像真实头像更容易找到另一半哦~
            </van-col>
          </van-row>
        </template>
      </van-field>

      <van-field name="head_portrait_list" label="头像列表">
        <template #input>
          <van-row>
            <van-col span="24">
              <van-image v-for="item in headList" :key="item.id" style="margin-right: 8px;" @click="clickChooseHead(item.head_portrait_src)" width="80" height="80" :src="`http://admin.qianlixunta.com${item.head_portrait_src}`" />
            </van-col>
          </van-row>
        </template>
      </van-field>

      <van-field name="life_imgs" label="照片">
        <template #input>
          <van-uploader v-model="uploader" :after-read="afterReadLifeImgs" :max-count="9" upload-icon="plus" />
        </template>
      </van-field>

      <van-field name="life_imgs_list" label="生活照列表">
        <template #input>
          <van-row>
            <van-col span="24">
              <van-image v-for="item in liftList" :key="item.id" style="margin-right: 8px;" @click="clickChooseLife(item.life_imgs_src)" width="80" height="80" :src="`http://admin.qianlixunta.com${item.life_imgs_src}`" />
            </van-col>
          </van-row>
        </template>
      </van-field>

      <van-field name="name" v-model="name" label="姓名" placeholder="请输入姓名" />
      <van-field
        readonly
        clickable
        name="improve_sex"
        :value="improve_sex"
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
      <van-field
        readonly
        clickable
        name="birth_day"
        :value="birth_day"
        label="出生日期"
        placeholder="点击选择时间"
        @click="showBirthday = true"
      />
      <van-popup v-model="showBirthday" round position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="new Date(1930, 0, 1)"
          :max-date="new Date()"
          @confirm="onBirthday"
          @cancel="showBirthday = false"
          :formatter="formatter"
        />
      </van-popup>

      <!-- 生肖 -->
      <van-field
        readonly
        clickable
        name="the_chinese_zodiac"
        :value="the_chinese_zodiac"
        label="生肖"
        placeholder="点击选择"
        @click="showTheChineseZodiac = true"
      />
      <van-popup v-model="showTheChineseZodiac" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsTheChineseZodiac"
          @confirm="onConfirmTheChineseZodiac"
          @cancel="showTheChineseZodiac = false"
        />
      </van-popup>

      <!-- 星座 -->
      <van-field
        readonly
        clickable
        name="constellation"
        :value="constellation"
        label="星座"
        placeholder="点击选择"
        @click="showConstellation = true"
      />
      <van-popup v-model="showConstellation" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsConstellation"
          @confirm="onConfirmConstellation"
          @cancel="showConstellation = false"
        />
      </van-popup>

      <!-- 婚姻状况 -->
      <van-field
        readonly
        clickable
        name="imp_marital_status"
        :value="imp_marital_status"
        label="婚姻状况"
        placeholder="点击选择婚姻状况"
        @click="showMarriage = true"
      />
      <van-popup v-model="showMarriage" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsMarriage"
          @confirm="onConfirmMarriage"
          @cancel="showMarriage = false"
        />
      </van-popup>

      <!-- 身份证号码 -->
      <van-cell-group>
        <van-field name="id_card" v-model="id_card" label="身份证" placeholder="请输入身份证" type="number" />
      </van-cell-group>

      <!-- 身高 -->
      <!-- <van-cell-group>
        <van-field name="imp_height" v-model="imp_height" label="身高" placeholder="请输入身高" type="number" />
      </van-cell-group> -->

      <van-field name="imp_height" label="身高" style="overflow: unset;">
        <template #input>
          <van-slider v-model="imp_height" bar-height="4px" :min="130" :max="210" @drag-start="startDrag" @drag-end="endDrag">
            <template #button>
              <div class="c-slide-tooltip tooltip" style="position: absolute;top: -58px;left: 50%;transform: translateX(-50%);font-size: 22px;background: rgba(255, 255, 255, 1);border-radius: 4px;padding: 5px;font-weight: bold;box-shadow: 0 0 4px 0 rgba(163, 163, 163, .36);" v-if="heightZoom">
                {{ imp_height }}
              </div>
              <div style="width: 26px;font-size: 10px;line-height: 18px;text-align: center;background-color: #fff;border-radius: 100px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);">{{ imp_height }}</div>
            </template>
          </van-slider>
        </template>
      </van-field>

      <!-- 学历 -->
      <van-field
        readonly
        clickable
        name="imp_education"
        :value="imp_education"
        label="学历"
        placeholder="点击选择学历"
        @click="showImpEducation = true"
      />
      <van-popup v-model="showImpEducation" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsImpEducation"
          @confirm="onConfirmImpEducation"
          @cancel="showImpEducation = false"
        />
      </van-popup>

      <!-- 月薪 -->
      <van-field
        readonly
        clickable
        name="imp_monthly_salary"
        :value="imp_monthly_salary"
        label="月薪"
        placeholder="点击选择月薪"
        @click="showimpMonthlySalary = true"
      />
      <van-popup v-model="showimpMonthlySalary" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsimpMonthlySalary"
          @confirm="onConfirmimpMonthlySalary"
          @cancel="showimpMonthlySalary = false"
        />
      </van-popup>

      <!-- 现住地 -->
      <van-field
        readonly
        clickable
        name="workplace"
        :value="areaValue"
        label="工作地"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom" round>
        <van-area
          :area-list="areaList"
          @confirm="onConfirmArea"
          @cancel="showArea = false"
        />
      </van-popup>

      <!-- 有无子女 -->
      <van-field
        readonly
        clickable
        name="is_children"
        :value="is_children"
        label="有无子女"
        placeholder="点击选择"
        @click="showIsChildren = true"
      />
      <van-popup v-model="showIsChildren" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsIsChildren"
          @confirm="onConfirmIsChildren"
          @cancel="showIsChildren = false"
        />
      </van-popup>

      <!-- 血型 -->
      <van-field
        readonly
        clickable
        name="blood_type"
        :value="blood_type"
        label="血型"
        placeholder="点击选择"
        @click="showbloodType = true"
      />
      <van-popup v-model="showbloodType" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsbloodType"
          @confirm="onConfirmbloodType"
          @cancel="showbloodType = false"
        />
      </van-popup>

      <!-- 购车情况 -->
      <van-field
        readonly
        clickable
        name="car_type"
        :value="car_type"
        label="购车情况"
        placeholder="点击选择"
        @click="showCarType = true"
      />
      <van-popup v-model="showCarType" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsCarType"
          @confirm="onConfirmCarType"
          @cancel="showCarType = false"
        />
      </van-popup>

      <!-- 购房情况 -->
      <van-field
        readonly
        clickable
        name="house_type"
        :value="house_type"
        label="购房情况"
        placeholder="点击选择"
        @click="showHouseType = true"
      />
      <van-popup v-model="showHouseType" position="bottom" round>
        <van-picker
          show-toolbar
          :columns="columnsHouseType"
          @confirm="onConfirmHouseType"
          @cancel="showHouseType = false"
        />
      </van-popup>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          保存
        </van-button>
      </div>

    </van-form>
    <van-loading v-if="showLoad" type="spinner" color="#1989fa" size="24px" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);">加载中...</van-loading>
  </div>
</template>

<script>
import areaList from '@/assets/json/areaList.json'
export default {
  name: 'Me',
  components: {
  },
  data () {
    return {
      tabbar_active: 0,
      // 头像
      fileList: [{
        url: 'https://img.yzcdn.cn/vant/sand.jpg'
      }],
      // 生活照
      uploader: [{
        url: 'https://img.yzcdn.cn/vant/leaf.jpg'
      }],
      // 昵称
      name: '',
      // 性别
      improve_sex: '',
      // 是否展示
      showSex: false,
      // 性别列表
      columnsSex: ['男', '女'],
      // 出生日期
      birth_day: '',
      // 出生日期下拉框显示隐藏
      showBirthday: false,
      // 生肖
      the_chinese_zodiac: '',
      // 生肖下拉框显示隐藏
      showTheChineseZodiac: false,
      // 生肖下拉框数据
      columnsTheChineseZodiac: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
      // 星座
      constellation: '',
      // 显示隐藏星座下拉框
      showConstellation: false,
      // 星座下拉框数据
      columnsConstellation: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
      // 婚姻状况选中的值
      imp_marital_status: '',
      // 显示隐藏婚姻状况选择器
      showMarriage: false,
      // 婚姻状况数据列表
      columnsMarriage: ['未婚', '离婚', '丧偶'],
      // 身份证
      id_card: '',
      // 身高
      imp_height: 0,
      // 学历
      imp_education: '',
      // 学历显示隐藏
      showImpEducation: false,
      // 学历下拉框数据
      columnsImpEducation: ['高中', '中专', '大专', '本科', '硕士', '博士'],
      // 月薪
      imp_monthly_salary: '',
      // 月薪下拉框显示隐藏
      showimpMonthlySalary: false,
      // 月薪下拉框数据
      columnsimpMonthlySalary: ['3000元以下', '3001-5000元', '5001-8000元', '8001-12000元', '12001-20000元', '20001-50000元', '50000元以上'],
      // 显示隐藏现住地
      showArea: false,
      // 现住地列表
      areaList: areaList,
      // 省市区选中的值
      areaValue: '',
      // 有无子女
      is_children: '',
      // 显示有无子女下拉列表
      showIsChildren: false,
      // 有无子女下拉列表数据
      columnsIsChildren: ['有子女', '无子女'],
      // 血型
      blood_type: '',
      // 显示血型下拉列表
      showbloodType: false,
      // 血型下拉列表数据
      columnsbloodType: ['A型', 'B型', 'AB型', 'O型'],
      // 购车情况
      car_type: '',
      // 购车情况下拉框显示隐藏
      showCarType: false,
      // 购车情况下拉框数据
      columnsCarType: ['有', '无'],
      // 购房情况
      house_type: '',
      // 购房情况下拉框显示隐藏
      showHouseType: false,
      // 购房情况下拉框数据
      columnsHouseType: ['有', '无'],
      // 显示隐藏身高放大镜
      heightZoom: false,
      // loading 显示隐藏
      showLoad: false,
      // 头像列表数据
      headList: [],
      // 生活照列表数据
      liftList: []
    }
  },
  created () {
    this.getUsersDetailInit()
    this.getPictureInit()
    this.getHeadList()
    this.getLifeList()
  },
  methods: {
    // 上传头像图片
    async afterRead (file) {
      const formData = new FormData()
      formData.append('file', file.file)
      const { data: res } = await this.$http.post('/wpapi/register/up_head_portrait', formData)
      if (res.state !== 200) return this.$notify('图片上传失败')
      this.fileList[0].url = res.path ? `http://admin.qianlixunta.com${res.path}` : 'https://img.yzcdn.cn/vant/sand.jpg'
    },
    // 上传生活照
    async afterReadLifeImgs (file) {
      const formData = new FormData()
      formData.append('file', file.file)
      const { data: res } = await this.$http.post('/wpapi/register/up_life_imgs', formData)
      if (res.state !== 200) return this.$notify('图片上传失败')
      this.uploader[this.uploader.length - 1].url = res.path
    },
    // 性别确定事件
    onConfirmSex (value) {
      this.improve_sex = value
      this.showSex = false
    },
    // 出生日期事件
    onBirthday (value) {
      this.birth_day = `${new Date(value).getFullYear()}年${new Date(value).getMonth() < 9 ? '0' + (new Date(value).getMonth() + 1) : new Date(value).getMonth() + 1}月${new Date(value).getDate() < 10 ? '0' + new Date(value).getDate() : new Date(value).getDate()}日`
      this.showBirthday = false
    },
    // 选项时间格式化
    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    },
    // 生肖事件
    onConfirmTheChineseZodiac (value) {
      this.the_chinese_zodiac = value
      this.showTheChineseZodiac = false
    },
    // 星座事件
    onConfirmConstellation (value) {
      this.constellation = value
      this.showConstellation = false
    },
    // 婚姻状况事件
    onConfirmMarriage (value) {
      this.imp_marital_status = value
      this.showMarriage = false
    },
    // 学历事件
    onConfirmImpEducation (value) {
      this.imp_education = value
      this.showImpEducation = false
    },
    // 月薪事件
    onConfirmimpMonthlySalary (value) {
      if (value === '3000元以下') {
        value = '1000-3000'
      } else if (value === '3001-5000元') {
        value = '3001-5000'
      } else if (value === '5001-8000元') {
        value = '5001-8000'
      } else if (value === '8001-12000元') {
        value = '8001-12000'
      } else if (value === '12001-20000元') {
        value = '12001-20000'
      } else if (value === '20001-50000元') {
        value = '20001-50000'
      } else if (value === '50000元以上') {
        value = '50000-100000'
      }
      this.imp_monthly_salary = value
      this.showimpMonthlySalary = false
    },
    // 现住地确认事件
    onConfirmArea (values) {
      this.areaValue = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/')
      this.showArea = false
    },
    // 有无子女事件
    onConfirmIsChildren (value) {
      this.is_children = value
      this.showIsChildren = false
    },
    // 血型事件
    onConfirmbloodType (value) {
      this.blood_type = value
      this.showbloodType = false
    },
    // 购车情况事件
    onConfirmCarType (value) {
      this.car_type = value
      this.showCarType = false
    },
    // 购房情况事件
    onConfirmHouseType (value) {
      this.house_type = value
      this.showHouseType = false
    },
    // 表单提交 保存资料
    async onSubmit (values) {
      console.log(values)
      values.improve_sex = values.improve_sex === '男' ? '1' : '0'
      values.is_children = values.is_children === '有子女' ? '1' : '0'
      values.car_type = values.car_type === '有' ? '1' : '0'
      values.house_type = values.house_type === '有' ? '1' : '0'
      this.showLoad = true
      const { data: res } = await this.$http.post('/wpapi/me/improve_users', values)
      if (res.status !== '200') {
        this.$notify(res.msg)
        this.showLoad = false
        return
      }
      this.showLoad = false
      this.$notify({
        type: 'success',
        message: res.msg
      })
      // 头像和生活照上传
      this.pictureForm()
    },
    // 个人资料数据
    async getUsersDetailInit () {
      const { data: res } = await this.$http.post('/wpapi/me/gzh_improve_users_init')
      if (res.status !== '200') return this.$notify(res.msg)
      this.name = res.data.name
      this.improve_sex = res.data.improve_sex ? '男' : '女'
      this.birth_day = res.data.birth_day
      this.the_chinese_zodiac = res.data.the_chinese_zodiac
      this.constellation = res.data.constellation
      this.imp_marital_status = res.data.imp_marital_status
      this.id_card = res.data.id_card
      this.imp_height = Number(res.data.imp_height)
      this.imp_education = res.data.imp_education
      this.imp_monthly_salary = res.data.imp_monthly_salary
      this.areaValue = res.data.workplace
      this.is_children = res.data.is_children ? '有子女' : '无子女'
      this.blood_type = res.data.blood_type
      this.car_type = res.data.car_type ? '有' : '无'
      this.house_type = res.data.house_type ? '有' : '无'
    },
    // 头像、生活照
    async getPictureInit () {
      const { data: res } = await this.$http.post('/wpapi/register/picture_init')
      if (res.status !== '200') return this.$notify(res.msg)
      this.fileList[0].url = res.data.head_portrait ? `http://admin.qianlixunta.com${res.data.head_portrait}` : 'https://img.yzcdn.cn/vant/sand.jpg'

      const initLifeImgs = []
      JSON.parse(res.data.life_imgs ? res.data.life_imgs : '[]').forEach(item => {
        initLifeImgs.push({ url: 'http://admin.qianlixunta.com' + item })
      })
      this.uploader = initLifeImgs
    },
    // 头像和生活照上传
    async pictureForm () {
      const upLifeImgs = []
      this.uploader.forEach((item) => {
        upLifeImgs.push(item.url.replace('http://admin.qianlixunta.com', ''))
      })
      const { data: res } = await this.$http.post('/wpapi/me/picture_form', {
        head_portrait: this.fileList[0].url.replace('http://admin.qianlixunta.com', ''),
        life_imgs: upLifeImgs
      })
      if (res.status !== '200') return this.$notify(res.msg)
    },
    // 开始拖动
    startDrag () {
      this.heightZoom = true
    },
    // 结束拖动
    endDrag () {
      this.heightZoom = false
    },
    // 获取头像列表
    async getHeadList () {
      const { data: res } = await this.$http.get('/wpapi/member/head_portrait_init')
      if (res.status !== '200') return this.$notify(res.msg)
      this.headList = res.data
    },
    // 点击选择头像
    clickChooseHead (imgVal) {
      this.fileList = this.fileList.length ? this.fileList : [{ url: '' }]
      this.fileList[0].url = `http://admin.qianlixunta.com${imgVal}`
    },
    // 获取生活照列表
    async getLifeList () {
      const { data: res } = await this.$http.get('/wpapi/member/life_imgs_init')
      if (res.status !== '200') return this.$notify(res.msg)
      this.liftList = res.data
    },
    // 点击选择生活照
    clickChooseLife (imgVal) {
      this.uploader.push({ url: 'http://admin.qianlixunta.com' + imgVal })
    }
  }
}
</script>

<style lang="less">
  .c-slide-tooltip::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-left-color: #fff;
    border-bottom-color: #fff;
    transform: rotate(-45deg) translateX(-50%);
    bottom: 0;
    box-shadow: -1px 1px 4px 0 rgba(163, 163, 163, .36);
    left: 50%;
  }
</style>
