<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
    <myheader :isLogin="isLogin" :currentUn="currentUn"></myheader>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import myheader from './components/Head'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    myheader, Footer
  },
  data () {
    return {
      isLogin: false,
      currentUn: ''
    }
  },
  mounted () {
    let _self = this
    _self.$cookies.config(1000 * 60 * 10, '/')
    let d = _self.$cookies.get('d')
    let n = _self.$cookies.get('n')
    if (!d || !n) {
      _self.isLogin = false
      return
    }
    let nowTime = new Date().getTime()
    let loginTime = new Date(d).getTime()
    if (nowTime - loginTime < 0 || nowTime - loginTime >= 1000 * 60 * 10) {
      _self.isLogin = false
      return
    }
    if (n.length > 0) {
      _self.currentUn = n
      _self.isLogin = true
    }
  }
}
</script>

<style>
</style>
