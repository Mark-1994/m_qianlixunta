import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 手动按需引入组件
import {
  Button,
  NavBar,
  Col,
  Row,
  Icon,
  Tab,
  Tabs,
  Grid,
  GridItem,
  Image as VanImage,
  Lazyload,
  Tabbar,
  TabbarItem,
  PullRefresh,
  List,
  Form,
  Field,
  Tag,
  Swipe,
  SwipeItem,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Uploader,
  Picker,
  Popup
} from 'vant'
import 'vant/lib/index.css'
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Col)
Vue.use(Row)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(VanImage)
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Form)
Vue.use(Field)
Vue.use(Tag)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Picker)
Vue.use(Popup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
