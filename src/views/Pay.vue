<template>
  <div class="home">

    <van-nav-bar
      title="千里寻TA"
      left-arrow>
      <template #right>
        <van-icon name="weapp-nav" />
      </template>
    </van-nav-bar>

    <van-form style="padding: 20px 20px 0;">
      <h4 style="text-align: left;">购买服务</h4>
      <van-field name="radio" label="" style="padding: 0;">
        <template #input>
          <van-radio-group v-model="radio">
            <van-radio name="1" icon-size="92px">
              <template #icon="props">
                <div :class="props.checked ? 'activeRadio activeSize' : 'activeSize'" :style="'width:' + scrnWidth + 'px'">
                  <van-row type="flex" justify="space-between">
                    <van-col>
                      <span>3000</span>元
                    </van-col>
                    <van-col>
                      <van-row>
                        <van-col>红娘一对一</van-col>
                        <van-col>12个月</van-col>
                      </van-row>
                    </van-col>
                  </van-row>
                </div>
              </template>
            </van-radio>
            <van-radio name="2" icon-size="92px">
              <template #icon="props">
                <div :class="props.checked ? 'activeRadio activeSize' : 'activeSize'" :style="'width:' + scrnWidth + 'px'">
                  <van-row type="flex" justify="space-between">
                    <van-col>span: 8</van-col>
                    <van-col>span: 8</van-col>
                  </van-row>
                </div>
              </template>
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
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
  name: 'Pay',
  components: {
  },
  data () {
    return {
      tabbar_active: 0,
      radio: '1',
      scrnWidth: 0
    }
  },
  created () {
    // 获取屏幕的宽度
    this.scrnWidth = innerWidth - 40
  },
  methods: {
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
  .activeRadio {
    background-color: red;
  }
  .activeSize {
    font-size: 16px;
  }
</style>
