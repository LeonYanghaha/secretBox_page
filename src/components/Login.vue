<template>
  <div class="login_main">
    <span class="login_item">
      <el-input placeholder="请输入用户名" v-model="un">
        <template slot="prepend">登录名</template>
      </el-input><br/>
    </span><br/>
    <span class="login_item">
      <el-input placeholder="请输入密码" v-model="pw">
        <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
      </el-input><br/>
    </span><br/>
    <span class="login_item login_item_info">
        <span v-show="isShowInfo">{{info}}</span>
    </span><br/>
    <span class="login_item login_item_btn">
      <el-button type="primary" plain @click="submit_data">登录</el-button>
    </span>
  </div>
</template>

<script>
import conf from '@/assets/conf.js'
import Qs from 'qs'
export default {
  name: 'Login',
  data () {
    return {
      un: '',
      pw: '',
      info: '',
      isShowInfo: false
    }
  },
  watch: {
    info (oldVal, newVal) {
      if (newVal !== '') {
        this.isShowInfo = true
      } else {
        this.isShowInfo = false
      }
    }
  },
  methods: {
    submit_data () {
      let _self = this
      let url = conf.url + 'user/login'

      if (_self.un === '' || _self.pw === '') {
        _self.info = '登录名或者密码不能为空！'
        return false
      }
      this.$http.post(url, Qs.stringify({un: _self.un, pw: _self.pw})).then(function (res) {
        if (res && res.status !== 200) {
          _self.info = '网络貌似出现问题'
          return false
        }
        let data = res.data
        if (data && data['code'] && data['code'] !== 1) {
          _self.info = data.info ? data.info : ''
          return false
        }
        if (data['data'].d === '' || data['data'].n === '' || data['data'].p === '' || data['data'].t === '') {
          _self.info = '数据不合法！'
          return false
        }
        _self.$cookies.set('d', data['data'].d)
        _self.$cookies.set('n', data['data'].n)
        _self.$cookies.set('p', data['data'].p)
        _self.$cookies.set('t', data['data'].t)
        // 应该先刷新页面，然后跳转，要不然title不能及时更新
        location.reload()
        _self.$router.push({ path: '/regist' })
      })
    }
  },
  mounted () {
    let url = conf.url
    let _self = this
    this.$http.get(url).then(function (res) {
      if (res.status === 200) {
        let data = res.data
        if (data.code && data.code !== 1) {
          _self.info = data.info ? data.info : ''
        } else {
          _self.info = 'ok'
        }
      } else {
        _self.info = '貌似网络除了一些问题'
      }
    })
  }
}
</script>

<style scoped>
.login_main{
  /*border: 2px solid green;*/
  width: 20%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10%;
}
.login_item{
}
.login_item_info {
  width: 99%;
  display: inline-block;
  text-align: center;
}
.login_item_btn{
  width: 99%;
  display: inline-block;
  text-align: center;
}
</style>
