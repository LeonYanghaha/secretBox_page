<template>
  <div>
    <div class="login" v-if="!isLogin">
      <Login></Login>
    </div>

    <div class="table" v-if="isLogin">
      <Main></Main>
    </div>

  </div>
</template>

<script>
import Login from '@/components/Login'
import Main from '@/components/Main'
export default {
  name: 'Index',
  components: {
    Login, Main
  },
  data () {
    return {
      isLogin: false
    }
  },
  watch: {
  },
  methods: {
  },
  mounted () {
    let _self = this
    let isLogin = _self.$cookies.get('isLogin')
    if (isLogin) { // 已经登录的情况
      _self.isLogin = true
    } else { // 没有登录的情况
      _self.isLogin = false
    }
  }
}
</script>

<style scoped>
</style>
