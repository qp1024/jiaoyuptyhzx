<template>
  <div class="edu_login">
    <div class="edu_login_main">
      <div class="edu_login_cover"></div>
      <div class="edu_login_box">
        <p class = 'edu_register' @click = 'register'><span>手机注册</span></p>
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="账号或学籍号" prefix-icon="el-icon-mobile-phone"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="登录密码" prefix-icon="el-icon-lock" @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="edu_footer_btn">
          <span class = 'forget_pass' @click = 'findPass'>忘记密码？</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login, verifyAccount} from '../axios/index.js'
export default {
  name: 'Login',
  data () {
    const validateUserName = (rule, value, callback) => {
      if (value) {
        // 验证用户名是否存在
        verifyAccount(this.loginForm.username).then(res => {
          if (res.data) {
            callback()
          } else {
            callback(new Error('账号不存在'))
          }
        })
      } else {
        callback(new Error('请输入用户名'))
      }
    }
    const validatePassWord = (rule, value, callback) => {
      if (this.loginForm.password) {
        if (this.loginForm.username) {
          login(this.loginForm).then(res => {
            if (res.status === 200) { // 登录成功后存储token和user信息
              let token = res.data.access_token
              let userInfo = res.data.user
              localStorage.setItem('Authorization', token)
              localStorage.setItem('userInfo', JSON.stringify(userInfo))
              let exudate = new Date() // 获取时间
              exudate.setTime(exudate.getTime() + 6 * 60 * 60 * 1000) // 保存6h
              // 字符串拼接cookie
              window.document.cookie = 'Authorization' + '=' + token + ';path=/;expires=' + exudate.toGMTString() // token保存6h
              if (userInfo.roleId && this.islogin) {
                callback()
                if (userInfo.roleId === 1) {
                  this.$router.push('/index')
                }
              }
            } else if (res.status === 400) { // 密码错误
              callback(new Error('密码错误，请重新输入'))
            }
          })
        } else {
          callback()
        }
      } else {
        if (this.loginForm.username) {
          callback(new Error('请输入密码'))
        }
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassWord, trigger: 'blur' }
        ]
      },
      islogin: false
    }
  },
  beforeRouteEnter: (to, from, next) => {
    window.document.body.style.backgroundColor = 'rgba(60,150,255,1)'
    next()
  },
  beforeRouteLeave: (to, from, next) => {
    window.document.body.style.backgroundColor = 'rgba(243,243,243,1)'
    next()
  },
  methods: {
    register () { // 手机注册

    },
    findPass () { // 找回密码
      this.$router.push('/forgot')
      localStorage.setItem('activeName', 'first')
    },
    submitForm (formName) {
      this.islogin = true
    }
  }
}
</script>
<style lang="less">
.edu_login{
  .el-input__inner{
    width:310px;
  }
  .el-button.el-button--primary{
    margin-top:18px;
    width:100%;
    font-family:PingFangSC-Regular;
    font-size:18px;
    border:none;
    background:rgba(60,150,255,0.4);
    &:hover{
      background:rgba(60,150,255,1);
    }
  }
}
</style>
<style lang="less" scoped>
.edu_login{
  width:100%;
  .edu_login_main{
    width:960px;
    height:445px;
    padding:60px 64px;
    box-sizing: border-box;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    overflow: hidden;
    .edu_login_cover{
      float:left;
      width:420px;
      height:325px;
      background-color: rgba(227,227,227,1);
    }
    .edu_login_box{
      float:right;
      .edu_register{
        position: relative;
        width:100%;
        height:30px;
        text-align: right;
        font-size:14px;
        color:rgba(153,153,153,1);
        margin-bottom:40px;
        span{
          position: absolute;
          right:0;
          width:56px;
          padding:2px 0 10px 0;
          border-bottom:3px solid rgba(216,216,216,1);
          cursor: pointer;
          &:hover{
            color:#00A0ff;
            border-bottom:3px solid #00A0ff;
          }
        }
      }
      .edu_footer_btn{
        width:100%;
        overflow: hidden;
        padding-left:102px;
        box-sizing: border-box;
        .forget_pass{
          float:right;
          color:rgba(153,153,153,1);
          font-family:PingFangSC-Regular;
          cursor: pointer;
          &:hover{
            color:#00A0ff;
          }
        }
      }
    }
  }
}
</style>
