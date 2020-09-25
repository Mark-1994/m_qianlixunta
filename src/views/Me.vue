<template>
  <div class="me">

    <van-nav-bar
      title="千里寻TA"
      left-arrow>
      <template #right>
        <van-icon name="weapp-nav" />
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
      <van-field>
        编辑昵称
      </van-field>
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
      tabbar_active: 0,
      // 是否展示
      showSex: false,
      // 性别
      sex: '',
      // 性别列表
      columnsSex: ['男', '女']
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
</style>
