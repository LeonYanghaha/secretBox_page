<template>
  <div>
    <div class="add_area">
    </div>
    <div class="table_main">
      <div class="table_control">
        <span @click="addItem"><el-tag>添加新密码</el-tag></span>
        <span><el-tag>批量删除</el-tag></span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="appname" label="应用" width="180"></el-table-column>
        <el-table-column prop="accountname" label="账户名" width="180"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="date" label="创建日期"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import conf from '@/assets/conf.js'
export default {
  name: 'Main',
  data () {
    return {
      tableData: [],
      showAddArea:false
    }
  },
  methods: {
    addItem () {

      // this.$alert('以此填写相关信息，点击添加，就ok了...', '添加新的密码项.😆', {
      //   confirmButtonText: '添加'
      // })
    }
  },
  mounted () {
    let url = conf.url + 'secret/getsecret'
    let _self = this
    _self.$http.get(url).then(function (res) {
      if (res.status !== 200) {
        alert('数据获取失败')
        return
      }
      let data = res.data
      if (data.code && data.code !== 1) {
        alert('数据获取失败1')
        return
      }
      if (!data.data || !data.data['secret'] || data.data === '') {
        console.log('目前没有数据2')
        return
      }
      // 这里都是获取成功的情况，需要解析数据
      let dataObj = data.data ? data.data.secret ? data.data.secret : null : null
      for (let i = 0; i < dataObj.length; i++) {
        let tempObj = dataObj[i]
        _self.tableData.push({
          appname: tempObj['AppName'] ? tempObj['AppName'] : '',
          accountname: tempObj['AccountName'] ? tempObj['AccountName'] : '',
          password: tempObj['Password'] ? tempObj['Password'] : '',
          desc: tempObj['Describe'] ? tempObj['Describe'] : '',
          date: tempObj['CreateDate'] ? tempObj['CreateDate'] : ''
        })
      }
    })
  }
}
</script>

<style scoped>
.table_main{
  /*border: 2px solid red;*/
  width: 70%;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
}
.table_control{
  /*border: 2px solid green;*/
  float: right;
  margin-bottom: 3%;
}
.table_control span {
  margin-left: 5px;
}
.add_area{
  width: 100%;
  height: 100%;
  z-index: 99;
  border: 2px solid green;
  display: none;
}
</style>
