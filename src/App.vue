<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
    <myheader></myheader>
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
  mounted () {
    this.$cookies.config(1000 * 60 * 10, '/')
  }
}
</script>

<style>
</style>
