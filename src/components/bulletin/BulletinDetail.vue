<template>
  <div class = 'edu_bulletin_detail'>
    <div class="bulletin_main">
      <div class="bulletin_left">
        <h3 class="title">通知公告</h3>
        <ul class= 'bulletin_list'>
          <li v-for = 'item in bulletinList' :key = item.id @click = 'bulletindetail(item.id)'>
            <span class="bulletin_title">{{item.title}}</span>
            <span class="date">{{item.createTime}}</span>
          </li>
        </ul>
      </div>
      <div class="bulletin_right">
        <h3 class = 'bulletin_detail_title'>{{bulletinDetail.title}}</h3>
        <div class="bulletin_detail_tag">
          <div class = 'date'>{{bulletinDetail.createTime ? bulletinDetail.createTime.slice(0,10) : ''}}</div>
          <div class = 'bulletin_detail_right'>
            <span class = 'release'>教育集团</span>
            <span class="click_nu">点击量：22</span>
          </div>
        </div>
        <div class="bulletin_detail_content">{{bulletinDetail.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {queryBulletin, queryBulletinDetail} from '../../axios/index.js'
export default {
  data () {
    return {
      bulletinId: localStorage.getItem('bulletinId'),
      bulletinList: [],
      bulletinDetail: {}
    }
  },
  methods: {
    bulletindetail (id) { // 获取公告详情
      queryBulletinDetail(id).then(res => {
        this.bulletinDetail = res.data
      })
    },
    getBulletinList () {
      queryBulletin('1').then(res => { // 获取最新的十条公告
        this.bulletinList = res.data.list
      })
    }
  },
  mounted () {
    this.getBulletinList()
    this.bulletindetail(this.bulletinId)
  }
}
</script>
<style lang="less" scoped>
.edu_bulletin_detail{
  height:618px;
  padding-top:40px;
  font-family:PingFangSC-Semibold;
  background-color: #fff;
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.2);
  .bulletin_main{
    width:1140px;
    margin: 0 auto;
    padding-bottom:35px;
    overflow: hidden;
    .bulletin_left{
      float:left;
      width:270px;
      height:577px;
      max-height:577px;
      border:1px solid #DDD;
      padding:10px 20px 0 10px;
      box-sizing: border-box;
      .title{
        font-size:18px;
        font-weight:600;
        line-height:48px;
        color:#333;
        border-bottom:1px solid #DDD;
        margin-bottom:8px;
      }
      .bulletin_list{
        li{
          width:100%;
          height:51px;
          padding:10px;
          padding-left:0;
          box-sizing: border-box;
          cursor: pointer;
          span{
            display: block;
          }
          .bulletin_title{
            width:240px;
            font-size:14px;
            color:#303133;
            line-height:14px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            margin-bottom:5px;
          }
          .date{
            font-size:12px;
            color:#999999;
            line-height:12px;
          }
        }
      }
    }
    .bulletin_right{
      float:right;
      width:850px;
      .bulletin_detail_title{
        font-size:16px;
        font-weight:600;
        color:#333;
        text-align: center;
        margin-bottom:12px;
        font-family:PingFangSC-Semibold;
      }
      .bulletin_detail_tag{
          overflow: hidden;
          color:#666;
          margin-bottom:10px;
          padding-right:30px;
          .date{
            float:left;
          }
          .bulletin_detail_right{
            float:right;
            .release{
              margin-right:10px;
            }
          }
        }
    }
  }
}
</style>
