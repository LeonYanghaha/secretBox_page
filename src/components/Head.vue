<template>
  <div class="head-main">
    <div class="login_div" v-if="!isLogin">
      <el-tag>
        <router-link to="/">首页</router-link>
      </el-tag>
      <el-tag>
        <router-link to="/about">关于</router-link>
      </el-tag>
      <el-tag>
        <router-link to="/regist">注册</router-link>
      </el-tag>
    </div>
    <div class="not_login_div" v-if="isLogin">
      <span>{{ currentUn }}</span>
      <el-tag>
        <router-link to="/user/center">个人中心</router-link>
      </el-tag>
      <el-tag>
        <router-link to="/about">关于</router-link>
      </el-tag>
      <el-tag>
        <!--<router-link to="/logout" @click="logout">退出登录</router-link>-->
        <span @click="logout">退出登录</span>
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head',
  props: ['isLogin', 'currentUn'],
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$cookies.remove('d')
      this.$cookies.remove('n')
      this.$cookies.remove('p')
      this.$cookies.remove('t')
      // 还需要清除cookie的标记
      this.$cookies.remove('isLogin')
      location.reload()
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.head-main{
  /*border: 2px solid red;*/
}
</style>
