<template>
    <div class="main">
      <div class="table_main">
        <div class="table_control">
          <span>
            <el-tag>
              <span v-if="!showAddArea" @click="changeArea" ><b>
                <i class="el-icon-circle-plus"></i></b>&nbsp;新增
              </span>
              <span v-if="showAddArea" @click="changeArea">
                <i class="el-icon-back"></i>返回列表
              </span>
            </el-tag>
            <el-tag>
              <span><b>
                <i class="el-icon-upload"></i></b>&nbsp;导入/出
              </span>
            </el-tag>
          </span>
          <!--<span><el-tag><i class="el-icon-delete"></i>批量删除</el-tag></span>-->
        </div>
        <div class="content_area">
          <div  v-if="!showAddArea">
              <el-table :data="tableData"
                        @cell-mouse-leave="showSecretStr"
                        @cell-mouse-enter="showRealPw"
                        stripe
                        style="width: 100%">
                <el-table-column type="index" width="25">
                </el-table-column>
                <el-table-column width="55" label="操作" >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      plain
                      title="删除"
                      @click="handleDelete(scope.$index, scope.row)">
                      <span class="delete_tag"><i class="el-icon-delete"></i></span>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column width="55" >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      plain
                      title="编辑"
                      @click="updateItem(scope.row)">
                      <span class="update_tag"><i class="el-icon-edit-outline"></i></span>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="appname" label="应用" width="80">
                </el-table-column>
                <el-table-column prop="accountname" label="账户名" width="130">
                </el-table-column>
                <el-table-column prop="password" label="密码" width="250">
                </el-table-column>
                <el-table-column prop="desc" label="描述">
                </el-table-column>
                <el-table-column prop="date" :formatter="formatTime" width="200" label="创建日期">
                </el-table-column>
              </el-table>
          </div>
          <div v-if="showAddArea">
              <AddItem v-on:showindex="changeArea"></AddItem>
          </div>
        </div>
      </div>
      <div v-if="isShowEdit" >
          <div class="edit_main">
            <edit v-bind:newItem="newItem"
                  v-on:hidden="hiddenEdit()"
                  v-bind:currentItem="currentItem">
            </edit>
          </div>
      </div>
    </div>
</template>

<script>
import conf from '@/assets/conf.js'
import AddItem from '@/components/AddItem'
import md5 from 'js-md5'
import Qs from 'qs'
import moment from 'moment'
import Edit from '@/components/Edit'
export default {
  name: 'Main',
  components: {
    AddItem, Edit
  },
  data () {
    return {
      tableData: [],
      showAddArea: false,
      pwMap: {},
      currentItem: {},
      newItem: {},
      isShowEdit: false
      // info: {
      //   edit_in: '编辑',
      //   delete_in: '删除'
      // }
    }
  },
  methods: {
    updateItem (row) {
      var _self = this
      // 禁止页面滑动
      var mo = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false) // 禁止页面滑动

      var tempItem = {
        appname: row['appname'],
        accountname: row['accountname'],
        date: row['date'],
        password: row['password'],
        desc: row['desc']
      }

      // 在这里，需要将密码装换成明文传输
      let key = md5(tempItem['appname'] + tempItem['accountname'] + tempItem['date'])
      let password = _self.pwMap[key] ? (_self.pwMap[key][0] ? _self.pwMap[key][0] : -1) : -1
      var updateDataUI = function (itemObj) {
        //  更新数据
        tempItem.password = _self.pwMap[key][1]
        // 之所以这么写，是为了实现深拷贝，否则两个item指向同一块内存，用户做了修改，会导致一起变化
        _self.currentItem = JSON.parse(JSON.stringify(itemObj))
        _self.newItem = JSON.parse(JSON.stringify(itemObj))
        _self.newItem['repassword'] = itemObj.password
        //  展示UI
        _self.isShowEdit = true
      }

      if (password === -1) {
        let url = conf.url + 'secret/showsecret'
        _self.$http.post(url, Qs.stringify({secret: row.password})).then(function (res) {
          if (!res || res.status !== 200) {
            return false
          }
          let data = res.data
          if (data && data['code'] && data['code'] === 1) {
            let pwArray = [tempItem.password, data.data.secret]
            _self.pwMap[key] = pwArray
            // tempItem.password = _self.pwMap[key][1]
            // console.error(data)
            updateDataUI(tempItem)
          } else {
            console.error('这里是查询密码明文出错的情况')
          }
        })
      } else {
        updateDataUI(tempItem)
      }

      // 2018-12-3    11:19:23
      // 之前的这种写法太麻烦了，而且界面不好调。
      //  换个思路吧。
      // 所以下面这些代码注释了。

      //  点击修改按钮之后，第一件事情是应该去后台查一下密码的明文
      // let _self = this
      // let key = md5(row['appname'] + row['accountname'] + row['date'])
      // let password = _self.pwMap[key] ? (_self.pwMap[key][0] ? _self.pwMap[key][0] : -1) : -1

      // TODO  这里是嵌套了proimse  ,还有很多的问题
      // if (password === -1) {
      //   let url = conf.url + 'secret/showsecret'
      //   _self.$http.post(url, Qs.stringify({secret: row.password})).then(function (res) {
      //     if (!res || res.status !== 200) {
      //       return false
      //     }
      //     let data = res.data
      //     if (data && data['code'] && data['code'] === 1) {
      //       let pwArray = [row.password, data.data.secret]
      //       _self.pwMap[key] = pwArray
      //       password = _self.pwMap[key][0]
      //     } else {
      //       console.error('这里是查询密码明文出错的情况')
      //     }
      //   })
      // }

      // var an = row['appname']
      // var ac = row['accountname']
      // var desc = row['appname']
      // _self.$confirm('<strong>应用名：<input type="text" value="' + an + '"><br/>' +
      //   '账户名：<input type="text" value="' + ac + '"><br/>' +
      //   '密&nbsp;&nbsp;&nbsp;码：<input type="text" value="' + password + '"><br/>' +
      //   '描&nbsp;&nbsp;&nbsp;述：<input type="text" value="' + desc + '"></strong>', '修改', {
      //   dangerouslyUseHTMLString: true
      // })
    },
    // showInfo () {
    //   console.log('show')
    // },
    // noneInfo () {
    //   console.log('none')
    // },
    hiddenEdit (flag) {
      var mo = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = '' // 出现滚动条-
      document.removeEventListener('touchmove', mo, false)
      this.isShowEdit = false
    },
    changeArea () {
      this.showAddArea = (!this.showAddArea)
    },
    showRealPw (row, column, cell, event) {
      // 修改删除按钮的样式
      // console.error(row,'--',column,'--',cell)
      // var current_cell_id = column.id
      // 以下是展示真实密码的code
      let _self = this
      if (column.label !== '密码') {
        return false
      }
      let key = md5(row['appname'] + row['accountname'] + row['date'])
      let url = conf.url + 'secret/showsecret'
      _self.$http.post(url, Qs.stringify({secret: row.password})).then(function (res) {
        if (!res || res.status !== 200) {
          return false
        }
        let data = res.data
        if (data && data['code'] && data['code'] === 1) {
          let pwArray = [row.password, data.data.secret]
          _self.pwMap[key] = pwArray
          row.password = _self.pwMap[key][1]
        }
      })
    },
    showSecretStr (row, column, cell, event) {
      if (column.label !== '密码') {
        return false
      }
      let key = md5(row['appname'] + row['accountname'] + row['date'])
      row.password = this.pwMap[key][0]
    },
    formatTime (row, column) {
      if (!row.date) {
        return ''
      }
      return moment(row.date + '000' - 0).format('YYYY-M-D H:mm:ss')
    },
    handleDelete (index, row) {
      var _self = this
      _self.$confirm('此操作将永久删除,<b>不可恢复！</b> 是否继续?<br/>' + '应用名称:' + row.appname + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '账户名称:' + row.accountname, '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        // 删除操作
        var url = conf.url + 'secret/delete'
        _self.$http.post(url, Qs.stringify({ ac: row.accountname, an: row.appname, pw: row.password })).then(function (res) {
          if (!res || res.status !== 200) {
            _self.$message({
              type: 'error',
              message: '删除失败!..网络故障'
            })
            return false
          }
          let data = res.data
          if (data.code && data.code === 1) {
            _self.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            _self.$message({
              type: 'error',
              message: '删除失败!' + data.info ? data.info : ''
            })
          }
        })
      }).catch(() => {
        _self.$message({
          type: 'info',
          message: '已取消删除'
        })
      }).finally(() => {
        // 不管删除掉 情况怎么样，刷新页面
        location.reload()
        _self.$router.push({ path: '/' })
      })
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
.edit_main{
  left:0;
  top:0;
  width:100%;
  height:100%;
  position:fixed;
  z-index: 99;
  /*opacity:0.5;*/
  /*border-radius: 50px;*/
  /*box-shadow: 5px 5px 2px #888888;*/
  /*color: rgb(100,202,202);*/
  background-color: rgba(40,40,40,0.3);
}
.table_main{
  /*border: 2px solid red;*/
  width: 75%;
  /*margin-top: 5%;*/
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
  /*border: 2px solid  blue;*/
  padding-top: 6%;
}
/*.delete_tag:hover{*/
  /*color: red;*/
  /*font-weight:bold;*/
/*}.update_tag:hover{*/
  /*font-weight:bold;*/
/*}*/
</style>
