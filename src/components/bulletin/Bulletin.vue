<template>
  <div class = 'edu_bulletin'>
    <div class="edu_bulletin_main">
      <h3 class = 'title'>通知公告</h3>
      <ul class="edu_bulletin_list">
        <li v-for = 'item in bulletinList' :key = item.id @click = 'bulletindetail(item.id)'><span class="item_left">{{item.title}}</span><span class="item_right">{{item.createTime.slice(0,10)}}</span></li>
      </ul>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change = 'getBulletinList'
        :total="bulletinSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {queryBulletin} from '../../axios/index.js'
export default {
  data () {
    return {
      bulletinList: [],
      page: '1',
      bulletinSize: null
    }
  },
  methods: {
    getBulletinList (page) { // 获取公告列表
      if (page) {
        this.page = page
      }
      queryBulletin(this.page).then(res => {
        this.bulletinList = res.data.list
        this.bulletinSize = res.data.count
      })
    },
    bulletindetail (id) { // 跳转公告详情页
      localStorage.setItem('bulletinId', id)
      this.$router.push('/bulletin/detail')
    }
  },
  mounted () {
    this.getBulletinList()
  }
}
</script>
<style lang="less">
.edu_bulletin{
  .el-pagination{
    text-align: center;
    margin-bottom:40px;
  }
}
</style>

<style lang="less" scoped>
.edu_bulletin{
  // margin-top:5px;
  padding-top:25px;
  font-family:PingFangSC-Semibold;
  background-color: #fff;
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.2);
  .edu_bulletin_main{
    width:1140px;
    height:630px;
    margin:0 auto;
    .title{
      font-size:18px;
      font-weight:600;
      color:#333;
      line-height:46px;
      border-bottom:1px solid #DDDDDD;
      margin-bottom:21px;
    }
    .edu_bulletin_list{
      height:490px;
      li{
        width:100%;
        font-size:14px;
        line-height:20px;
        color:#666;
        overflow: hidden;
        margin-bottom:24px;
        .item_left{
          float:left;
          width:929px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
          &:hover{
            color:#3998FF;
          }
        }
        .item_right{
          cursor: default;
          float:right;
        }
      }
    }
  }
}
</style>
