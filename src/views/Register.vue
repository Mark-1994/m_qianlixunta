<template>
  <div class="register">

    <van-form validate-first @submit="onSubmit">
      <van-field label="性别">
        <template #input>
          <van-radio-group v-model="form.sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="0">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="birthday"
        :value="form.birthday"
        label="出生日期"
        placeholder="点击选择时间"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择出生日期' }]"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="new Date(1930, 0, 1)"
          :max-date="new Date()"
          @confirm="onConfirm"
          @cancel="showPicker = false"
          :formatter="formatter"
        />
      </van-popup>

      <van-field label="婚姻状况">
        <template #input>
          <van-radio-group v-model="form.marital_status" direction="horizontal">
            <van-radio name="未婚">未婚</van-radio>
            <van-radio name="离婚">离婚</van-radio>
            <van-radio name="丧偶">丧偶</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field name="height" label="身高">
        <template #input>
          <van-slider v-model="form.height" bar-height="4px" :min="130" :max="210">
            <template #button>
              <div style="width: 26px;font-size: 10px;line-height: 18px;text-align: center;background-color: #fff;border-radius: 100px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);">{{ form.height }}</div>
            </template>
          </van-slider>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="education"
        :value="form.education"
        label="学历"
        placeholder="点击选择学历"
        @click="showEducation = true"
        :rules="[{ required: true, message: '请选择学历' }]"
      />
      <van-popup v-model="showEducation" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onEducation"
          @cancel="showEducation = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="workplace"
        :value="form.workplace"
        label="工作地"
        placeholder="点击选择省市区"
        @click="showWorkPlace = true"
        :rules="[{ required: true, message: '请填写工作地' }]"
      />
      <van-popup v-model="showWorkPlace" round position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onWorkPlace"
          @cancel="showWorkPlace = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="monthly_salary"
        :value="form.monthly_salary"
        label="月收入"
        placeholder="点击选择"
        @click="showMonthlySalary = true"
        :rules="[{ required: true, message: '请填写月收入' }]"
      />
      <van-popup v-model="showMonthlySalary" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsMonthlySalary"
          @confirm="onMonthlySalary"
          @cancel="showMonthlySalary = false"
        />
      </van-popup>

      <van-field v-model="form.phone" type="tel" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请填写手机号' }]" />

      <van-field
        name="code"
        v-model="form.code"
        center
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请填写短信验证码' }]"
      >
        <template #button>
          <van-button native-type="button" size="small" type="primary" @click="sendCode" :disabled="noSendCode">
            <van-count-down :time="60 * 1000" format="ss" style="color: #fff;" v-if="showSendCode" @finish="resetSendCode" />
            <template v-else>发送验证码</template>
          </van-button>
        </template>
      </van-field>

      <van-field v-model="form.password" type="password" label="创建密码" placeholder="设置密码" :rules="[{ required: true, message: '请创建密码' }]" />

      <van-field v-model="form.nickname" type="text" label="昵称" placeholder="设置昵称" :rules="[{ required: true, message: '请填写昵称' }]" />

      <van-field v-model="form.introduce_oneself" type="textarea" label="自我介绍" placeholder="设置自我介绍" :rules="[{ required: true, message: '请填写自我介绍' }]" />

      <van-field name="tag_id" label="个性标签" :rules="[{ required: true, message: '请选择个性标签' }]">
        <template #input>
          <van-checkbox-group v-model="form.tag_id" direction="horizontal" :max="5">
            <van-checkbox :name="item.id" shape="square" v-for="item in tagData" :key="item.id" style="width: 28%;margin: 6px;">{{item.tag_name}}</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import areaList from '@/assets/json/areaList.json'
export default {
  name: 'Register',
  data () {
    return {
      // 注册表单数据
      form: {
        sex: '1',
        birthday: '',
        marital_status: '未婚',
        height: 160,
        education: '',
        workplace: '',
        monthly_salary: '',
        phone: '',
        code: '',
        password: '',
        nickname: '',
        introduce_oneself: '',
        tag_id: []
      },
      showPicker: false,
      columns: ['高中及以下', '中专', '大专', '大学本科', '硕士', '博士'],
      showEducation: false,
      showWorkPlace: false,
      areaList: areaList,
      showMonthlySalary: false,
      columnsMonthlySalary: ['3000元以下', '3001-5000元', '5001-8000元', '8001-12000元', '12001-20000元', '20001-50000元', '50000元以上'],
      // 验证码倒计时显示隐藏
      showSendCode: false,
      // 是否禁用发送验证码按钮
      noSendCode: false,
      // 复选框的数据
      tagData: []
    }
  },
  created () {
    this.getTagData()
  },
  methods: {
    // 注册提交事件
    async onSubmit () {
      // 注册
      const { data: res } = await this.$http.post('/wpapi/register/form', this.form)
      if (res.status !== '200') return this.$notify(res.msg)
      this.$notify({
        type: 'success',
        // message: res.msg,
        message: '注册成功'
      })
      this.$router.push('/login')
    },
    // 选择出生日期的回调函数
    onConfirm (value) {
      this.form.birthday = `${new Date(value).getFullYear()}.${new Date(value).getMonth() < 9 ? '0' + (new Date(value).getMonth() + 1) : new Date(value).getMonth() + 1}.${new Date(value).getDate() < 10 ? '0' + new Date(value).getDate() : new Date(value).getDate()}`
      this.showPicker = false
    },
    // 选择学历的回调函数
    onEducation (value) {
      this.form.education = value
      this.showEducation = false
    },
    // 选择工作地的回调函数
    onWorkPlace (values) {
      this.form.workplace = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/')
      this.showWorkPlace = false
    },
    // 选择月收入的回调函数
    onMonthlySalary (value) {
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
      this.form.monthly_salary = value
      this.showMonthlySalary = false
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
    // 验证码发送事件
    async sendCode () {
      const { data: res } = await this.$http.post('/wpapi/register/send_sms', {
        phone: this.form.phone
      })
      if (res.status !== '200') return this.$notify(res.msg)
      this.$notify({
        type: 'success',
        // message: res.msg,
        message: '短信已发送'
      })
      this.showSendCode = true
      this.noSendCode = true
    },
    // 倒计时结束重置按钮状态
    resetSendCode () {
      this.showSendCode = false
      this.noSendCode = false
    },
    // 获取个性标签的tag数据
    async getTagData () {
      const { data: res } = await this.$http.get('/wpapi/register/get_tag')
      if (res.status !== '200') return this.$notify(res.msg)
      this.tagData = res.data
    }
  }
}
</script>

<style lang="less">

</style>
