<template>
  <div class="head-main">
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
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    console.log()
  }
}
</script>

<style scoped>
.head-main{
  /*border: 2px solid red;*/
}
</style>
