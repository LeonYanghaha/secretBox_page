<template>
    <div class="table_main">
      <div class="table_control">
        <span @click="changeArea">
          <el-tag>
            <span v-if="!showAddArea">添加新密码</span>
            <span v-if="showAddArea">返回密码列表</span>
          </el-tag>
        </span>
        <span><el-tag>批量删除</el-tag></span>
      </div>
      <div class="content_area">
        <div  v-if="!showAddArea">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="appname" label="应用" width="180"></el-table-column>
              <el-table-column prop="accountname" label="账户名" width="180"></el-table-column>
              <el-table-column prop="password" label="密码"></el-table-column>
              <el-table-column prop="desc" label="描述"></el-table-column>
              <el-table-column prop="date" label="创建日期"></el-table-column>
            </el-table>
        </div>
        <div v-if="showAddArea">
            <AddItem></AddItem>
        </div>
      </div>
    </div>
</template>

<script>
import conf from '@/assets/conf.js'
import AddItem from '@/components/AddItem'
export default {
  name: 'Main',
  components: {
    AddItem
  },
  data () {
    return {
      tableData: [],
      showAddArea: false
    }
  },
  methods: {
    changeArea () {
      this.showAddArea = (!this.showAddArea)
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
  /*margin-bottom: 3%;*/
}
.table_control span {
  margin-left: 5px;
}
.content_area{
  padding-top: 10%;
}
</style>
