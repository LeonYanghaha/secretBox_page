<template>
  <div class="regist_main">
    <span class="regist_item">
      <el-input placeholder="请输入用户名" v-model="un">
        <template slot="prepend">登&nbsp;&nbsp;录&nbsp;名:</template>
      </el-input><br/>
    </span><br/>
    <span class="regist_item">
      <el-input placeholder="请输入密码" v-model="pw">
        <template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</template>
      </el-input><br/>
    </span><br/>
    <span class="regist_item">
      <el-input placeholder="请输入确认密码" v-model="repw">
        <template slot="prepend">确认密码:</template>
      </el-input><br/>
    </span><br/>
    <span class="regist_item regist_item_info">
        <span>{{info}}</span>
    </span><br/>
    <span class="regist_item regist_item_btn">
      <el-button type="primary" @click="submit_data" plain>提交数据</el-button>
    </span>
  </div>
</template>

<script>
import conf from '@/assets/conf.js'
import Qs from 'qs'
export default {
  name: 'Regist',
  data () {
    return {
      un: '',
      pw: '',
      repw: '',
      info: ''
      // isShowInfo: true
    }
  },
  // watch: {
  //   info (oldVal, newVal) {
  //     if (newVal !== '') {
  //       this.isShowInfo = false
  //     } else {
  //       this.isShowInfo = true
  //     }
  //   }
  // },
  methods: {
    submit_data () {
      let url = conf.url + 'user/regist'
      let un = this.un
      let pw = this.pw
      let repw = this.repw
      let _self = this
      if (un === '' || pw === '' || repw === '') {
        _self.info = '参数不能为空'
        return false
      }
      if (pw !== repw) {
        _self.info = '密码不一致'
        return false
      }

      _self.$http.post(url, Qs.stringify({un: un, pw: pw, repw: repw})).then(function (res) {
        console.error(res.header)
        if (res && res.status === 200) {
          let data = res.data
          if (data && data['code'] && data['code'] === 1) {
            _self.info = '注册成功，去登录吧'
            // 跳转到登录页面
            location.reload()
            _self.$router.push({ path: '/' })
          } else {
            _self.info = '当前电脑已经存在一个账户！' // data.info
          }
        } else {
          _self.info = '貌似网络问题'
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.regist_main {
  width: 25%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10%;
}
.regist_item_btn{
  width: 99%;
  display: inline-block;
  text-align: center;
}
.regist_item_info{
  width: 99%;
  display: inline-block;
  text-align: center;
}
</style>
