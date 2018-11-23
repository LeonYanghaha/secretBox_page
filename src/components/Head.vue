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
        <router-link to="/logout">退出登录</router-link>
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
