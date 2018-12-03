<template>
  <div class="edit_main">
    <span @click="hiddenEdit" class="close_main">
      <i class="el-icon-circle-close"/>&nbsp;关闭
    </span>
    <div class="form_main">
        <span class="add_item">
        <el-input placeholder="应用名" v-model="newItem.appname">
          <template slot="prepend">应&nbsp;&nbsp;用&nbsp;名:</template>
        </el-input>
        </span>
        <span class="add_item">
        <el-input placeholder="用户名" v-model="newItem.accountname">
          <template slot="prepend">用&nbsp;&nbsp;户&nbsp;名:</template>
        </el-input>
      </span>
        <span class="add_item">
        <el-input placeholder="密码" v-model="newItem.password">
          <template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</template>
        </el-input>
      </span>
        <span class="add_item">
        <el-input placeholder="确认密码" v-model="newItem.repassword">
          <template slot="prepend">确认密码:</template>
        </el-input>
      </span>
        <span class="add_item">
        <el-input placeholder="其他信息" v-model="newItem.desc">
          <template slot="prepend">其他信息:</template>
        </el-input>
      </span>
        <span class="add_item">
          <span>{{info}}</span>
      </span>
        <span class="add_item">
        <el-button type="danger" @click="hiddenEdit" plain>取消</el-button>
        <el-button type="primary" @click="update_data" plain>修改</el-button>
      </span>

    </div>
  </div>
</template>

<script>
import conf from '@/assets/conf.js'
export default {
  name: 'Edit',
  props: ['currentItem', 'newItem'],
  data () {
    return {
      info: ''
    }
  },
  methods: {
    update_data () {
      // 判断是否为空
      var _self = this
      var currentItem = _self.currentItem
      var newItem = {
        appname: _self.newItem.appname.trim(),
        accountname: _self.newItem.accountname.trim(),
        password: _self.newItem.password.trim(),
        repassword: _self.newItem.repassword.trim(),
        desc: _self.newItem.desc.trim()
      }
      if (newItem.appname === '' || newItem.accountname === '' ||
        newItem.password === '' || newItem.repassword === '' || newItem.desc === '') {
        _self.info = '完善信息'
        return false
      }
      console.log(newItem)
      console.log(currentItem)
      if (newItem.password !== newItem.repassword) {
        _self.info = '两次输入的密码不一致'
        return false
      }

      if (newItem.appname === currentItem.appname && newItem.accountname === currentItem.accountname &&
        newItem.password === currentItem.password && newItem.desc === currentItem.desc) {
        _self.info = '没有做任何修改，不能提交'
        return false
      }

    },
    hiddenEdit () {
      this.$emit('hidden', true)
    }
  }
}
</script>

<style scoped>
.form_main{
  /*box-shadow:0 0 30px 10px rgba(255,255,255,.7) inset;*/
  /*box-shadow: 10px 10px 5px #444;*/
  width: 30em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8.5em;
  padding: 4em 12em;
  /*padding-left: 12em;*/
  /*padding-top: 4em;*/
  /*padding-bottom: 4em;*/
  border-radius: 2em;
  /*background-color: rgba(200,200,200,0.5);*/

}
.add_item{
  display: block;
  margin-top: 1em;
  /*padding-top: 20%;*/
  text-align: center;
}
.edit_main{
  /*border: 2px solid red;*/
}
.close_main{
  float: right;
  margin-right: 27em;
  margin-top: 10em;
  font-size: 14px;
}
.close_main:hover{
  color: red;
}
</style>
