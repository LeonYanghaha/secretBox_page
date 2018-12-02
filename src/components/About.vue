<template>
  <div class="about_main">
    <div class="panel_main">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="关于密码管理器" name="1">
          <div>&nbsp;&nbsp;&nbsp;&nbsp;很恼人的一个问题：密码太多了，记不住了😂😂</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;刚好自己会写点代码，所以自己动手写了这个小工具。</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;关于这个小工具，如果你有更好的想法。<br/></div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;或者在使用过程中出现任何问题.<br/></div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;请联系我。🙂<br/></div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;<br/></div>
        </el-collapse-item>
        <el-collapse-item title="关于yk-" name="2">
          <div>&nbsp;&nbsp;&nbsp;&nbsp;小码农一个☝️☝️</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;学了很多东西，都不够深入</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;想做一些有用的东西。<br/></div>
        </el-collapse-item>
        <el-collapse-item title="捐助" name="3">
          <div>&nbsp;&nbsp;&nbsp;&nbsp;如果你觉得这个小工具对你有用.</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;就打赏作者yk-一杯茶钱💰💰💰吧.</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;🙏🙏🙏.</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      activeNames: ['1']
    }
  },
  methods: {
    handleChange (val) {
      // console.log(val)
    }
  }
}
</script>

<style scoped>
.about_main{
  width: 75%;
  /*border: 2px solid green;*/
  margin-right: auto;
  margin-left: auto;
}
.panel_main{
  width: 80%;
  margin-left: 5%;
  /*margin-right: auto;*/
  /*margin-left: auto;*/
  margin-top: 5%;
}
</style>
