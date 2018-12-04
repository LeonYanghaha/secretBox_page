<template>
  <div class="add_main">
    <span class="add_item">
      <el-input placeholder="应用名" v-model="appname">
        <template slot="prepend">应&nbsp;&nbsp;用&nbsp;名:</template>
      </el-input>
    </span>
    <span class="add_item">
      <el-input placeholder="用户名" v-model="accountname">
        <template slot="prepend">用&nbsp;&nbsp;户&nbsp;名:</template>
      </el-input>
    </span>
    <span class="add_item">
      <el-input placeholder="密码" v-model="password">
        <template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</template>
      </el-input>
    </span>
    <span class="add_item">
      <el-input placeholder="确认密码" v-model="repassword">
        <template slot="prepend">确认密码:</template>
      </el-input>
    </span>
    <span class="add_item">
      <el-input placeholder="其他信息" v-model="description">
        <template slot="prepend">其他信息:</template>
      </el-input>
    </span>
    <span class="add_item">
        <span>{{info}}</span>
    </span>
    <span class="add_item">
      <el-button type="danger" @click="show_index" plain>取消</el-button>
      <el-button type="primary" @click="submit_data" plain>提交数据</el-button>
    </span>
  </div>
</template>

<script>
import conf from '@/assets/conf.js'
import Qs from 'qs'
export default {
  name: 'AddItem',
  data () {
    return {
      appname: '',
      accountname: '',
      password: '',
      repassword: '',
      description: '',
      info: ' '
    }
  },
  methods: {
    show_index () {
      this.$emit('showindex', true)
    },
    submit_data () {
      let _self = this
      _self.info = '正在处理，稍等哈😊'
      if (_self.accountname === '' || _self.password === '' || _self.repassword === '') {
        _self.info = '关键信息不能为空！'
        return false
      }
      if (_self.password !== _self.repassword) {
        _self.info = '两次输入的密码不一致'
        return false
      }
      // 向后端发送数据
      let url = conf.url + 'secret/addsecret'
      _self.$http.post(url, Qs.stringify({ac: _self.accountname, pw: _self.password, an: _self.appname, repw: _self.repassword, desc: _self.description})).then(function (res) {
        if (res && res.status !== 200) {
          _self.info = '网络貌似出现问题'
          return false
        }
        let data = res.data
        if (data && data['code'] && data['code'] !== 1) {
          _self.info = data.info ? data.info : ''
          return false
        }
        // 以下应该就是添加成功的情况了
        _self.info = '添加成功'
        location.reload()
        _self.$router.push({ path: '/' })
      })
    }
  }
}
</script>

<style scoped>
.add_main{
  /*border: 2px solid green;*/
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
.add_item{
  display: block;
  margin-top: 20px;
  text-align: center;
}
</style>
