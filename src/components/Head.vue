<template>
  <div class="head-main">
    <div class="login_div" v-if="isLogin">
      <el-tag>
        <span @click="user">首页</span>
      </el-tag>
      <el-tag>
        <span @click="regist">注册</span>
      </el-tag>
      <el-tag>
        <span @click="about">关于</span>
      </el-tag>
    </div>
    <div class="not_login_div" v-if="!isLogin">
      <span class="user_name">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img class="user_icon" @click="user" src="@/assets/icon/index_icon.jpeg"/>&nbsp;&nbsp;
            &nbsp;
            {{ currentUn }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
               <span @click="user">
                 <img class="icon index_icon" src="@/assets/icon/index_icon.jpeg"/>
                 返回首页
               </span>
            </el-dropdown-item><el-dropdown-item class="clearfix">
               <span @click="about">
                 <i class="el-icon-info"></i>
                 关于
               </span>
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <img class="icon exit_icon" src="@/assets/icon/exit_icon.jpeg"/>
              <span @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <!--<el-tag>-->
        <!--<router-link to="/user/center">个人中心</router-link>-->
      <!--</el-tag>-->
      <!--<el-tag>-->
        <!--<router-link to="/about">关于</router-link>-->
      <!--</el-tag>-->
      <!--<el-tag>-->
        <!--<router-link to="/logout" @click="logout">退出登录</router-link>-->
        <!--<span @click="logout">退出登录</span>-->
      <!--</el-tag>-->
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
      // this.$cookies.remove('isLogin')
      this.$emit('isLogin', false)
      // location.reload()
    },
    about () {
      this.$router.push({ path: '/about' })
    },
    user () {
      this.$router.push({ path: '/' })
    },
    regist () {
      this.$router.push({ path: '/regist' })
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
.head-main div{
  width: 75%;
  /*border: 2px solid green;*/
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}
.user_name{
  font-size: 30px;
  padding-left: 20px;
  /*border: 2px solid green;*/
  width: 150px;
  display: block;
  font-weight: bolder;
}
.user_icon{
  width: 18px;
  height: 18px;
}
.icon{
  width: 12px;
  height: 12px;
}
</style>
