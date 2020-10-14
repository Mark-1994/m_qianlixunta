<template>
  <div class="member">

    <van-tabs v-model="active" animated border swipeable>
      <van-tab title="加入会员">

        <van-image width="100%" height="154" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <h4 style="font-size: 18px;"><van-icon name="gem" color="#FAB005" style="margin-right: 8px;" />会员权益</h4>
        <van-row gutter="10" style="margin: 0 10px;">
          <van-col span="8">
            <div style="background-color: #fff;border-radius: 6px;box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);padding: 20px 0 1px;">
              <van-image width="47" height="50" :src="require('../assets/see_more01.png')" />
              <p>无限查看</p>
            </div>
          </van-col>
          <van-col span="8">
            <div style="background-color: #fff;border-radius: 6px;box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);padding: 20px 0 1px;">
              <van-image width="48" height="50" :src="require('../assets/send_msg01.png')" />
              <p>发布消息</p>
            </div>
          </van-col>
          <van-col span="8">
            <div style="background-color: #fff;border-radius: 6px;box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);padding: 20px 0 1px;">
              <van-image width="48" height="50" :src="require('../assets/send_msg01.png')" />
              <p>无限畅聊</p>
            </div>
          </van-col>
        </van-row>

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

        <van-row style="margin: 30px 0 20px;">
          <van-col span="24">开通会员</van-col>
        </van-row>
        <van-row>
          <van-col span="24"><span style="font-size: 30px;">168</span>元/年</van-col>
        </van-row>
        <van-button color="#FF2877" native-type="button" style="border-radius: 6px;margin: 40px 0;" @click="isVipNotify(0)">立即加入会员</van-button>

      </van-tab>

      <van-tab title="红娘一对一">
        <h4 style="font-size: 18px;"><van-icon name="gem" color="#FAB005" style="margin-right: 8px;" />红娘一对一专属服务</h4>
        <van-row gutter="10" style="margin: 0 10px;">
          <van-col span="8">
            <div style="background-color: #fff;border-radius: 6px;box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);padding: 20px 0 1px;">
              <van-image width="47" height="50" :src="require('../assets/private_serve01.png')" />
              <p style="font-size: 12px;">一对一专属服务</p>
            </div>
          </van-col>
          <van-col span="8">
            <div style="background-color: #fff;border-radius: 6px;box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);padding: 20px 0 1px;">
              <van-image width="48" height="50" :src="require('../assets/bulinbulin01.png')" />
              <p style="font-size: 12px;">真实会员，安全可靠</p>
            </div>
          </van-col>
          <van-col span="8">
            <div style="background-color: #fff;border-radius: 6px;box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);padding: 20px 0 1px;">
              <van-image width="48" height="50" :src="require('../assets/privacy01.png')" />
              <p style="font-size: 12px;">个人隐私有保障</p>
            </div>
          </van-col>
        </van-row>

        <van-row style="text-align: left;color: #B7B7B7;margin: 20px 10px 0;">
          <van-col span="24">
            红娘一对一权益及相关说明：
          </van-col>
        </van-row>
        <van-row style="text-align: left;color: #B7B7B7;margin: 0 10px;">
          <van-col span="24">
             1.服务将于在线支付成功后自动开通。2.服务一经开通，不予退款，敬请谅解。
          </van-col>
        </van-row>

        <van-form @submit="isVipNotify(1)" style="padding: 20px 20px 0;">
          <van-field name="radio" label="" style="padding: 0;">
            <template #input>
              <van-radio-group v-model="radio" style="background-color: #f3f3f3;">
                <van-radio name="1" icon-size="92px" style="background-color: #fff;border-radius: 6px;">
                  <template #icon="props">
                    <div :class="props.checked ? 'activeRadio activeSize' : 'activeSize'" :style="'width:' + scrnWidth + 'px'">

                      <van-row style="line-height: 46px;">
                        <van-col>
                          按您的要求精心挑选20位心仪的对象
                        </van-col>
                      </van-row>
                      <van-row style="line-height: 46px;">
                        <van-col>
                          <span>3000</span>元/12个月
                        </van-col>
                      </van-row>

                    </div>
                  </template>
                </van-radio>
                <van-radio name="2" icon-size="92px" style="margin-top: 16px;background-color: #fff;border-radius: 6px;">
                  <template #icon="props">
                    <div :class="props.checked ? 'activeRadio activeSize' : 'activeSize'" :style="'width:' + scrnWidth + 'px'">

                      <van-row style="line-height: 46px;">
                        <van-col>
                          按您的要求精心挑选10位心仪的对象
                        </van-col>
                      </van-row>
                      <van-row style="line-height: 46px;">
                        <van-col>
                          <span>1888</span>元/12个月
                        </van-col>
                      </van-row>

                    </div>
                  </template>
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button color="#FF2877" native-type="submit" style="border-radius: 6px;margin: 40px 0;">
              立即购买服务
            </van-button>
          </div>

        </van-form>

      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
export default {
  name: 'Member',
  components: {
  },
  data () {
    return {
      active: 0,
      radio: '1',
      scrnWidth: 0,
      // 168 VIP
      vipStatus: 0,
      // 红娘 VIP
      superVipStatus: 0
    }
  },
  created () {
    // 获取屏幕的宽度
    this.scrnWidth = innerWidth - 40
    this.isVip()
  },
  methods: {
    // 检测用户身份
    async isVip () {
      const { data: res } = await this.$http.post('/wpapi/member/is_vip')
      if (res.status !== 200) return this.$notify(res.msg)
      this.vipStatus = res.data.vip_status
      this.superVipStatus = res.data.super_vip_status
    },
    // 身份反馈展示
    isVipNotify (type) {
      if (!type) {
        if (this.vipStatus) {
          return this.$notify({
            type: 'success',
            message: '您已经是会员身份'
          })
        } else {
          this.$router.push('/pay')
        }
      } else {
        if (this.superVipStatus) {
          return this.$notify({
            type: 'success',
            message: '您已经购买了红娘一对一专属服务'
          })
        } else {
          this.$router.push('/pay')
        }
      }
    }
  }
}
</script>

<style lang="less">
  html,
  body {
    background-color: #f3f3f3;
  }
  .activeRadio {
    background: linear-gradient(180deg,#ff6262, #9c0ce6);
    color: #fff;
  }
  .activeSize {
    font-size: 16px;
    border-radius: 6px;
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,.1);
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
