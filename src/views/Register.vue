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
      />
      <van-popup v-model="showMonthlySalary" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsMonthlySalary"
          @confirm="onMonthlySalary"
          @cancel="showMonthlySalary = false"
        />
      </van-popup>

      <van-field v-model="form.phone" type="tel" label="手机号" placeholder="请输入手机号" />

      <van-field
        :name="form.code"
        v-model="form.code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请填写短信验证码' }]"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>

      <van-field v-model="form.password" type="password" label="创建密码" placeholder="设置密码" />

      <van-field v-model="form.nickname" type="text" label="昵称" placeholder="设置昵称" />

      <van-field v-model="form.introduce_oneself" type="textarea" label="自我介绍" placeholder="设置自我介绍" />

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
        tag_id: ''
      },
      showPicker: false,
      columns: ['高中及以下', '中专', '大专', '大学本科', '硕士', '博士'],
      showEducation: false,
      showWorkPlace: false,
      areaList: areaList,
      showMonthlySalary: false,
      columnsMonthlySalary: ['3000元以下', '3001-5000元', '5001-8000元', '8001-12000元', '12001-20000元', '20001-50000元', '50000元以上']
    }
  },
  methods: {
    // 注册提交事件
    onSubmit () {
      // 注册
      console.log(this.form)
    },
    // 选择出生日期的回调函数
    onConfirm (value) {
      this.form.birthday = `${new Date(value).getFullYear()}年${new Date(value).getMonth() < 9 ? '0' + (new Date(value).getMonth() + 1) : new Date(value).getMonth() + 1}月${new Date(value).getDate() < 10 ? '0' + new Date(value).getDate() : new Date(value).getDate()}日`
      this.showPicker = false
    },
    // 选择学历的回调函数
    onEducation (value) {
      this.form.education = value
      this.showEducation = false
    },
    // 选择工作地的回调函数
    onWorkPlace (value) {
      console.log(value)
      // this.form.workplace = value
      this.showWorkPlace = false
    },
    // 选择月收入的回调函数
    onMonthlySalary (value) {
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
    }
  }
}
</script>

<style lang="less">

</style>
