<template>
  <div class = 'edu_footer'>
    <div class = 'edu_footer_main'>
      <p class="edu_footer_logo">logo</p>
      <i class = 'edu_footer_line'></i>
      <dl class="edu_footer_link">
        <dt class = 'edu_footer_title'>友情链接</dt>
        <dd>未来教育高精尖创新中心</dd>
        <dd>智慧学伴</dd>
        <dd>学习元</dd>
      </dl>
      <i class = 'edu_footer_line'></i>
      <dl class="edu_footer_contact">
        <dt class = 'edu_footer_title'>联系我们</dt>
        <dd>邮箱：gaojingjian@bnu.edu.cn</dd>
        <dd>联系电话：010-58805590</dd>
      </dl>
      <i class = 'edu_footer_line'></i>
      <dl class="edu_footer_help">
        <dt class = 'edu_footer_title'>帮助中心</dt>
        <dd>常见问答</dd>
        <dd>关于我们</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.edu_footer{
  width:100%;
  height:199px;
  background:rgba(219,219,219,1);
  padding-top:46px;
  box-sizing: border-box;
  .edu_footer_main{
    width:1100px;
    margin:0 auto;
    overflow: hidden;
    .edu_footer_line {
      float:left;
      width:1px;
      height:132px;
      background:rgba(204,204,204,1)
    }
    .edu_footer_logo{
      float:left;
      width:99px;
      margin-right:125px;
    }
    .edu_footer_link,.edu_footer_contact,.edu_footer_help{
      float:left;
      box-sizing: border-box;
      padding-left:76px;
      color:rgba(102,102,102,1);
      dd{
        font-size:12px;
        margin-bottom:20px;
      }
    }
    .edu_footer_link{
      width:278px;
    }
    .edu_footer_contact{
      width:320px;
    }
    .edu_footer_help{
      width:200px;
    }
    .edu_footer_title{
      font-size:16px;
      line-height:16px;
      margin-bottom:36px;
    }
  }
}
</style>
