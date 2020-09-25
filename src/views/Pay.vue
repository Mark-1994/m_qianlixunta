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
                    <van-col span="8" style="text-align: center;">
                      <span style="font-size: 28px;">3000</span>元
                    </van-col>
                    <van-col span="8">
                      <van-row type="flex" justify="center" style="line-height: 46px;">
                        <van-col>红娘一对一</van-col>
                      </van-row>
                      <van-row type="flex" justify="center" style="line-height: 46px;">
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
                    <van-col span="8" style="text-align: center;">
                      <span style="font-size: 28px;">1888</span>元
                    </van-col>
                    <van-col span="8">
                      <van-row type="flex" justify="center" style="line-height: 46px;">
                        <van-col>红娘一对一</van-col>
                      </van-row>
                      <van-row type="flex" justify="center" style="line-height: 46px;">
                        <van-col>6个月</van-col>
                      </van-row>
                    </van-col>
                  </van-row>
                </div>
              </template>
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-row style="text-align: left;color: #B7B7B7;margin: 20px 10px 0;">
        <van-col span="24">
          会员权益及相关说明：
        </van-col>
      </van-row>
      <van-row style="text-align: left;color: #B7B7B7;margin: 0 10px;">
        <van-col span="24">
          1.可随意查看和筛选资料，联系、发布和接收消息。2.服务将于在线支付成功后自动开通。3.服务一经开通，不予退款，敬请谅解。
        </van-col>
      </van-row>
      <h4 style="text-align: left;">支付方式</h4>

      <van-field name="radio" label="" style="background-color: transparent;">
        <template #input>
          <van-radio-group v-model="payRadio" direction="horizontal" style="width: 100%;display: flex;justify-content: space-between;">
            <van-radio name="1">
              支付宝
              <van-image
                width="3rem"
                height="3rem"
                fit="fill"
                :src="require('../assets/ali_pay01.png')"
              />
            </van-radio>
            <van-radio name="2">
              微信支付
              <van-image
                width="3rem"
                height="3rem"
                fit="fill"
                :src="require('../assets/ali_pay01.png')"
              />
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          确认支付
        </van-button>
      </div>

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
      scrnWidth: 0,
      payRadio: '1'
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
    background: linear-gradient(180deg,#ff6262, #9c0ce6);
    color: #fff;
  }
  .activeSize {
    font-size: 16px;
    border-radius: 6px;
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,.1);
  }
  html,
  body {
    background-color: #f3f3f3;
  }
</style>
