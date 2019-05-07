<template>
  <div class="edu_index">
    <div class="edu_bgc">
      <div class="index_header">
        <div class="header_main">
          <h3 class="logo"></h3>
          <p class = 'user_head'>
            <img src="../../assets/images/userimg.jpg">
          </p>
        </div>
      </div>
      <div class="index_banner">
        <div class='carousel carouselCard'>
          <el-carousel
           :interval="3000"
            arrow="never"
            height="350px"
            trigger = 'click'
            :initial-index="index"
            ref="carousel">
            <el-carousel-item v-for='item in bannerBulletinList' :key="item.id">
              <img :src="item.path" alt="找不到图片" height="350px">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="banner_main">
          <div class="banner_explain">
            <h2 class = 'title'>资源平台介绍</h2>
            <ul class = 'bulletin_list'>
              <li v-for = '(item,index) in bannerBulletinList' :key = 'index' @click="changeCarouselIndex(index)">{{item.title}}</li>
            </ul>
            <button class = 'ban_button' @click = 'queryMoreBulletin'>去了解</button>
          </div>
        </div>
      </div>
    </div>
    <div class="edu_index_main">
      <div class="edu_index_nav">
        <ul>
          <li>
            <h3 class = 'title'>成员数量</h3>
            <div class="echarts">
              <div id="echats_main" style="width: 270px;height:205px;"></div>
            </div>
          </li>
          <li>
            <div class="research">
              <h3 class = 'title'>精准教研</h3>
              <span> Precise </br> teaching </br> and </br>research</span>
              <button class = 'button'>去了解</button>
            </div>
            <div class = 'explain'>
              实现教师随时随地进行听课、评课等日常教学活动。提高教师教学质量和教学效率。
            </div>
          </li>
          <li>
            <div class="research">
              <h3 class = 'title'>资源中心</h3>
              <span> Resource </br> Center</span>
              <button class = 'button'>去了解</button>
            </div>
            <div class = 'explain'>
              资源中心精简文案介绍
            </div>
          </li>
          <li>
            <div class="research">
              <h3 class = 'title'>社区</h3>
              <span>Community</span>
              <button class = 'button'>去了解</button>
            </div>
            <div class = 'explain'>
              资源中心精简文案介绍
            </div>
          </li>
        </ul>
      </div>
      <div class="edu_index_bulletin">
        <div class = 'bulletin_header'>
          <h3 class="title">通知公告</h3>
          <span class = 'more_bulletin' @click = 'queryMoreBulletin'>more</span>
        </div>
        <div class="bulletin_main">
          <ul class = 'bulletin_left'>
            <li v-for = 'item in bulletinListLeft' :key = 'item.id' @click = 'bulletindetail(item.id)'><span class = 'item_left'>{{item.title}}</span><span class = 'item_right'>{{item.createTime.slice(0,10)}}</span></li>
          </ul>
          <ul class = 'bulletin_right' v-if = 'bulletinListRight.length > 0'>
            <li v-for = 'item in bulletinListRight' :key = 'item.id' @click = 'bulletindetail(item.id)'><span class = 'item_left'>{{item.title}}</span><span class = 'item_right'>{{item.createTime.slice(0,10)}}</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {queryBannerBulletin, queryBulletin} from '../../axios/index.js'
export default {
  data () {
    return {
      index: 0,
      bannerBulletinList: [], // 置顶公告
      bulletinListLeft: [], // 左侧公告
      bulletinListRight: [] // 右侧公告
    }
  },
  methods: {
    drawEcharts () {
      let myChart = this.$echarts.init(document.getElementById('echats_main'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = {}
            obj[['right', 'left'][+(pos[0] < size.viewSize[0] / 2)]] = 20
            obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 20
            return obj
          }
        },
        legend: {
          orient: 'vertical',
          left: 23,
          top: 43,
          itemWidth: 15,
          itemHeight: 15,
          data: ['在校学生数', '在校教师数', '成员学校数']
        },
        series: [
          {
            name: '成员数量',
            type: 'pie',
            radius: '55%',
            center: ['74%', '43%'],
            hoverAnimation: false,
            color: ['#A5E0FF', '#47B0FF', '#F4879E'],
            data: [
              {value: 335, name: '在校学生数'},
              {value: 310, name: '在校教师数'},
              {value: 234, name: '成员学校数'}
            ],
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#ffffff',
                borderWidth: 10
              },
              emphasis: {
                borderWidth: 0,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    changeCarouselIndex (index) { // 点击公告的索引
      this.$refs.carousel.setActiveItem(index)
    },
    bulletindetail (id) { // 跳转公告详情页
      localStorage.setItem('bulletinId', id)
      this.$router.push('/bulletin/detail')
    },
    queryMoreBulletin () { // 获取更多公告并跳转页面
      this.$router.push('/bulletin')
    },
    getBulletin () { // 获取公告
      queryBannerBulletin().then(res => {
        this.bannerBulletinList = res.data
      })
      queryBulletin('1').then(res => {
        if (res.data.list.length > 5) {
          this.bulletinListLeft = res.data.list.slice(0, 5)
          this.bulletinListRight = res.data.list.slice(5, res.data.list.length)
        } else {
          this.bulletinListLeft = res.data.list
        }
      })
    }
  },
  mounted () {
    this.getBulletin()
    this.drawEcharts()
  }
}
</script>
<style lang="less">
.edu_index{
  .carouselCard {
    .el-carousel__indicator .el-carousel__button {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #FFFFFF;
    }
    .el-carousel__indicator.is-active button {
      width: 32px;
      height: 16px;
      background: #FFFFFF;
      border-radius: 100px;
    }
  }
}
</style>

<style lang="less" scoped>
.edu_index{
  width:100%;
  background-color: #F7F7F7;
  padding-bottom:40px;
  .edu_bgc{
    width:100%;
    height:520px;
    background:linear-gradient(200deg,rgba(2,185,255,1) 0%,rgba(124,111,255,1) 100%);
    margin-bottom:40px;
    .index_header{
      width:100%;
      height:151px;
      background-color: rgba(255,255,255,0.05);
      .header_main{
        width:1155px;
        margin: 0 auto;
        padding-top:37px;
        overflow: hidden;
        .logo{
          float:left;
          width:274px;
          height:64px;
          border-radius: 32px;
          background-color: #CCC;
        }
        .user_head{
          float:right;
          padding-top:9px;
          img{
            width:60px;
            height:60px;
            border-radius: 50%;
          }
        }
      }
    }
    .index_banner{
      height:369px;
      .banner_main{
        width:1155px;
        margin:0 auto;
        position:relative;
        .banner_explain{
          position: absolute;
          bottom:65px;
          right:0;
          width:270px;
          height:241px;
          color:#fff;
          padding:21px 10px;
          box-sizing: border-box;
          background:rgba(255,255,255,0.04);
          z-index : 2;
          .title{
            height:24px;
            line-height:24px;
            font-size:24px;
            font-weight:600;
            font-family:PingFangSC-Semibold;
            margin-bottom:18px;
          }
          .bulletin_list{
            font-size:14px;
            line-height:20px;
            li{
              width:100%;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              cursor: pointer;
            }
          }
          .ban_button{
            cursor: pointer;
            position: absolute;
            bottom:12px;
            left:10px;
            width:160px;
            height:40px;
            color:#3998FF;
            font-family:PingFangSC-Regular;
            border-radius:22px;
            background-color: #fff;
            // z-index:2;
          }
        }
      }
    }
  }
  .edu_index_main{
    width:1140px;
    margin:0 auto;
    .edu_index_nav{
      margin-bottom:20px;
      ul{
        overflow: hidden;
        li{
          float:left;
          width:270px;
          height:265px;
          color:#FFF;
          background-color: #fff;
          margin-right:20px;
          .title{
            font-size:18px;
            color:#FFF;
            font-weight:600;
            font-family:PingFangSC-Semibold;
          }
          .button{
            position: absolute;
            bottom:15px;
            right:15px;
            width:120px;
            height:40px;
            color:#FFFFFF;
            font-family:PingFangSC-Semibold;
            cursor: pointer;
            border-radius:30px;
            border:1px solid #FFFFFF;
            background-color: transparent;
          }
          .research{
              height:165px;
              box-sizing: border-box;
              padding:30px 15px 15px 20px;
              position:relative;
              .title{
                margin-bottom:20px;
              }
            }
            .explain{
              font-size:14px;
              color:rgba(153,153,153,1);
              line-height:20px;
              padding:20px 15px;

            }
          &:last-child{
            margin-right:0;
          }
          &:nth-child(1){
            .title{
              height:60px;
              background-color: #3D95FF;
              box-sizing: border-box;
              padding:18px 20px;
            }
            .echarts{
              width:100%;
            }
          }
          &:nth-child(2){
            .research{
              background:linear-gradient(90deg,rgba(252,148,34,1) 0%,rgba(252,120,31,1) 100%);
            }
          }
          &:nth-child(3){
            .research{
              background:linear-gradient(90deg,rgba(253,75,115,1) 0%,rgba(240,27,70,1) 100%);
            }
          }
          &:nth-child(4){
            .research{
              background:linear-gradient(90deg,rgba(132,221,231,1) 0%,rgba(56,200,215,1) 100%);
            }
          }
        }
      }
    }
    .edu_index_bulletin{
      height:293px;
      padding:0 20px 5px 20px;
      background-color: #fff;
      .bulletin_header{
        overflow: hidden;
        height:46px;
        font-family:PingFangSC-Semibold;
        box-sizing: border-box;
        border-bottom:1px solid #DDDDDD;
        .title{
          float:left;
          font-size:18px;
          color:#333333;
          line-height:46px;
          font-weight:600;
        }
        .more_bulletin{
          float:right;
          font-size:12px;
          font-weight:600;
          line-height:16px;
          color:#2A4E99;
          padding-top:22px;
          cursor: pointer;
        }
      }
      .bulletin_main{
        padding-top:21px;
        position: relative;
        overflow: hidden;
        font-family:PingFangSC-Regular;
        &:before {
          content:"";
          width:1px;
          height:200px;
          background: #D8D8D8;
          position:absolute;
          left:50%;
        }
        .bulletin_left,.bulletin_right{
          box-sizing: border-box;
          width:550px;
        }
        .bulletin_left{
          float:left;
          padding-right:123px;
        }
        .bulletin_right{
          float:right;
          padding-left:120px;
        }
        li{
          font-size:14px;
          color:#666666;
          line-height:20px;
          margin-bottom:24px;
          overflow: hidden;
          .item_left{
            float:left;
            width:280px;
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
}
</style>
