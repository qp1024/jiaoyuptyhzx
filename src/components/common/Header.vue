<template>
  <div class="edu_header">
    <div class = 'edu_header_main'>
      <p class="edu_logo">logo</p>
      <div class="edu_header_memu">
        <el-menu :default-active="this.$route.path" :router="true" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="2">精准教研</el-menu-item>
          <el-menu-item index="3">资源中心</el-menu-item>
          <el-menu-item index="4">社区</el-menu-item>
          <el-menu-item index="5">个人中心</el-menu-item>
        </el-menu>
      </div>
      <div class="edu_userimg">
        <img src="../../assets/images/userimg.jpg">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang = 'less'>
  .edu_header{
    .el-menu--horizontal{
      border-bottom:none;
    }
    .el-menu-item{
      font-size:14px;
      line-height:80px;
      color:rgba(51,51,51,1);
      margin-left:48px;
      border-bottom:none;
    }
    .el-menu{
      .is-active{
        border-bottom:none;
        color:#3C96FF!important;
      }
    }
  }
</style>
<style lang="less" scoped>
  .edu_header{
    width:100%;
    height:80px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.2);
    font-family:PingFangSC-Regular;
    .edu_header_main{
      width:1158px;
      margin:0 auto;
      overflow: hidden;
      .edu_logo{
        float:left;
        width:170px;
        height:80px;
        line-height:80px;
        margin-right:12px;
      }
      .edu_header_memu{
        float:left;
      }
      .edu_userimg{
        float:right;
        padding-top:25px;
        img{
          width:30px;
          height:30px;
        }
      }
    }
  }
</style>
