<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <van-button type="danger">危险按钮</van-button>
    </div> -->
    <app-header v-if="header_show"></app-header>
    <router-view/>
    <app-footer v-if="footer_show"></app-footer>
    <div class="tabbar_placeholder" style="height: 50px;"></div>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  data () {
    return {
      header_show: true,
      footer_show: true
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
