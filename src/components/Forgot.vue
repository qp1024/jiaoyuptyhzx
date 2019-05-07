<template>
  <div class="edu_forgot">
    <div class="edu_forgot_main">
      <h3 class="edu_forgot_title">找回密码</h3>
      <div class="edu_forgot_memu">
        <i class = 'step_icon1'></i>
        <i class = 'step_icon2'></i>
        <i class = 'step_icon3'></i>
        <el-tabs v-model="activeName">
          <el-tab-pane label="输入账号" name="first" :disabled="activeName!=='first'">
            <div class="forgot_main">
              <p class = 'code_content'>
                <el-input v-model="mobileAndEmail" placeholder="请输入需要找回的手机／邮箱账号" style = 'width:310px;'></el-input>
                <i class = 'error_content' v-show = 'this.phoneError'>{{this.phoneError}}</i>
              </p>
              <el-button type="primary" @click = 'nextStep("second")'>确认</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="验证身份" name="second" :disabled="activeName!=='second'">
            <div class="forgot_main">
              <p>{{this.phoneNumber}}</p>
              <div class="getCode">
                <p class = 'code_content'>
                  <el-input v-model="authCode" placeholder="请输入验证码" style = 'width:200px'></el-input>
                  <i class = 'phone_error' v-show = 'this.phoneError'>{{this.phoneError}}</i>
                </p>
                <el-button @click = 'getAuthCode'>获取验证码</el-button>
                <el-button
                type="primary"
                @click = 'nextStep("third")'
                style = 'width:100%;margin-top:30px;border-radius:20px;color:#fff'
                >提交</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="重置密码" name="third" :disabled="activeName!=='third'">
            <div class="forgot_main pass_main">
              <span class = 'passwarn'>*8-32位的数字、字母或符号（包含至少两种）</span>
              <el-input type = 'password' v-model="password" placeholder="请输入新密码" style = 'width:310px;margin-bottom:20px;'></el-input>
              <p class = 'code_content'>
                <el-input type = 'password' v-model="password2" placeholder="请再次输入新密码" style = 'width:310px;'></el-input>
                <i class = 'error_content' v-show = 'this.phoneError'>{{this.phoneError}}</i>
              </p>
              <el-button type="primary" @click = 'nextStep("finish")'>确认</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class = 'submit_pass' v-if = 'activeName === "finish"'>
          <p><i class = 'icon'></i><span>修改成功</span></p>
          <p class = 'goindex'>3秒后自动跳转，如未跳转<i @click = 'goLogin'>请点击</i></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {isMobile, isEmail, checkPhone, validatePass, checkEmail} from '../axios/common/common.js'
import {login, verifyPhone, sendCodeToPhone, verifyPhoneCode, resetPassword, verifyEmail, sendCodeToEmail, verifyEmailCode, resetEmailPassword} from '../axios/index.js'
import $ from 'jquery'
export default {
  data () {
    return {
      activeName: 'first',
      phoneNumber: null,
      authCode: null, // 验证码
      phoneError: '', // 验证码的错误提示
      mobileAndEmail: '',
      password: null,
      password2: null
    }
  },
  watch: {
    activeName (newValue, oldValue) {
      this.$nextTick(() => {
        this.mobileAndEmail = localStorage.getItem('mobileAndEmail')
        if (newValue === 'second') {
          if (this.mobileAndEmail.indexOf('@') === -1) {
            this.phoneNumber = '已绑定手机号:' + checkPhone(this.mobileAndEmail)
          } else {
            this.phoneNumber = '已绑定邮箱号:' + checkEmail(this.mobileAndEmail)
          }
          $('.edu_forgot #tab-first').css('color', '#3C96FF')
          $('.step_icon1').addClass('step_icon11')
          $('.step_icon2').addClass('step_icon21')
        } else if (newValue === 'third') {
          $('.step_icon1').addClass('step_icon11')
          $('.step_icon2').addClass('step_icon11')
          $('.step_icon3').addClass('step_icon31')
          $('.edu_forgot #tab-first').css('color', '#3C96FF')
          $('.edu_forgot #tab-second').css('color', '#3C96FF')
        } else if (newValue === 'finish') {
          setTimeout(() => {
            this.goLogin()
          }, 3000)
        }
      })
    },
    phoneError (newValue, oldValue) {
      if (newValue) {
        $('.code_content .el-input').css('borderColor', '#f56c6c')
      } else {
        $('.code_content .el-input').css('borderColor', '#DCDFE6')
      }
    }
  },
  methods: {
    nextStep (next) { // 下一步
      if (next === 'second') {
        this.validateMobile(this.mobileAndEmail, next)
      } else if (next === 'third') {
        this.validatePhoneCode(this.authCode, next)
      } else if (next === 'finish') {
        this.validatePassword(this.password, this.password2, next)
      }
      localStorage.setItem('mobileAndEmail', this.mobileAndEmail)
    },
    getAuthCode () { // 获取验证码
      if (this.mobileAndEmail.indexOf('@') === -1) {
        sendCodeToPhone(this.mobileAndEmail)
      } else {
        sendCodeToEmail(this.mobileAndEmail)
      }
    },
    validateMobile (value, next) { // 验证用户名
      if (value) {
        if (value.indexOf('@') === -1) {
          if (isMobile(value)) { // 验证手机号
            verifyPhone(value).then(res => {
              if (!res.data) {
                this.activeName = next
                this.phoneError = ''
                localStorage.setItem('activeName', next)
              } else {
                this.phoneError = '账号不存在'
              }
            })
          } else {
            this.phoneError = '请输入正确的手机号'
          }
        } else {
          if (isEmail(value)) { // 验证邮箱
            verifyEmail(this.mobileAndEmail).then(res => {
              if (!res.data) {
                this.phoneError = ''
                this.activeName = next
                localStorage.setItem('activeName', next)
              } else {
                this.phoneError = '账号不存在'
              }
            })
          } else {
            if (value.indexOf('.com') === -1) {
              this.phoneError = '请输入完整的手机号或者邮箱号'
            } else {
              this.phoneError = '请输入正确的邮箱号'
            }
          }
        }
      } else {
        this.phoneError = '请输入账号'
      }
    },
    validatePhoneCode (value, next) { // 验证验证码
      if (value) {
        let query = {
          phoneNumber: this.mobileAndEmail,
          code: this.authCode
        }
        if (this.mobileAndEmail.indexOf('@') === -1) {
          verifyPhoneCode(query).then(res => {
            if (res.data) {
              this.activeName = next
              this.phoneError = ''
              localStorage.setItem('activeName', next)
            } else {
              this.phoneError = '验证码不正确'
            }
          })
        } else {
          verifyEmailCode(query).then(res => {
            if (res.data) {
              this.activeName = next
              this.phoneError = ''
              localStorage.setItem('activeName', next)
            } else {
              this.phoneError = '验证码不正确'
            }
          })
        }
      } else {
        this.phoneError = '请输入验证码'
      }
    },
    validatePassword (pass1, pass2, next) { // 验证密码
      if (pass1 === pass2) {
        if (validatePass(pass1)) {
          let query = {
            number: this.mobileAndEmail,
            password: this.password
          }
          if (this.mobileAndEmail.indexOf('@') === -1) {
            resetPassword(query).then(res => {
              this.activeName = next
              this.phoneError = ''
              localStorage.setItem('activeName', next)
              localStorage.setItem('password', this.password)
            })
          } else {
            resetEmailPassword(query).then(res => {
              this.activeName = next
              this.phoneError = ''
              localStorage.setItem('activeName', next)
              localStorage.setItem('password', this.password)
            })
          }
        } else {
          this.phoneError = '密码格式错误'
        }
      } else {
        this.phoneError = '两次密码不一致'
      }
    },
    goLogin () {
      let loginForm = {
        username: this.mobileAndEmail,
        password: localStorage.getItem('password')
      }
      login(loginForm).then(res => {
        let token = res.data.access_token
        let userInfo = res.data.user
        localStorage.setItem('Authorization', token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.$router.replace('/index')
        console.log(res)
      })
    }
  },
  mounted () {
    let activeName = localStorage.getItem('activeName')
    if (activeName) {
      this.activeName = activeName
    }
  }
}
</script>
<style lang="less">
.edu_forgot{
  .el-tabs__header{
    margin-bottom:40px;
  }
  .el-tabs__nav-wrap::after,.el-tabs__active-bar{
    background-color: transparent;
  }
  .el-icon-arrow-left,.el-icon-arrow-right{
    display: none;
  }
  .el-tabs__item {
    width:305px;
    height:54px;
    line-height:54px;
    font-size:16px;
    color:rgba(144,147,153,1);
    font-family:PingFangSC-Regular;
    text-align: center;
    padding:0;
    background:url('../assets/images/icon_arrow@2x.png') no-repeat 100%;
    background-size: 15px 28px;
    position:relative;

  }
  .is-active{
    color:rgba(51,51,51,1);
  }
  .el-tabs__item:last-child{
    width:290px;
    background-image: none;
  }
  .el-tabs__nav-wrap.is-scrollable{
    padding:0;
  }
  .el-input{
    border:1px solid rgba(204,204,204,1);
    border-radius:3px;
    .el-input__inner{
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(153,153,153,1);
    }
  }
  .el-button.el-button--primary{
    width:100%;
    background:rgba(60,150,255,1);
    border-radius:20px;
    margin-top:30px;
    span{
      font-size:14px;
      font-family:PingFangSC-Regular;
    }
  }
}
</style>

<style lang="less" scoped>
.edu_forgot{
  .edu_forgot_main{
    width:960px;
    height:445px;
    background-color: #fff;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:30px;
    box-sizing: border-box;
    font-family:PingFangSC-Semibold;
    .edu_forgot_title{
      font-size:16px;
      color:rgba(153,153,153,1);
      margin-bottom:10px;
    }
    .edu_forgot_memu{
      width:100%;
      height:54px;
      background:rgba(245,247,250,1);
      border-radius:4px;
      position: relative;
      .step_icon1{
        background: url('../assets/images/step-1-normal@2x.png') no-repeat 8% 50%;
      }
      .step_icon11{
        background: url('../assets/images/step_success@2x.png') no-repeat 8% 50%;
      }
      .step_icon2{
        background: url('../assets/images/step_2_disabie@2x.png') no-repeat 42% 50%;
      }
      .step_icon21{
        background: url('../assets/images/step-2-normal@2x.png') no-repeat 42% 50%;
      }
      .step_icon3{
        background: url('../assets/images/step_3_disabie@2x.png') no-repeat 76% 50%;
      }
      .step_icon31{
        background: url('../assets/images/step-3-normal@2x.png') no-repeat 76% 50%;
      }
      .step_icon11{
        background-image: url('../assets/images/step_success@2x.png');
      }
      .step_icon1,.step_icon2,.step_icon3{
        width:100%;
        height:100%;
        position:absolute;
        background-size: 24px 24px;
      /*  width:10px;
        height:10px;
        background-color: red; */
      }
    }

    .forgot_main{
      margin:0 auto;
      width:310px;
      .code_content{
        position: relative;
        .el-input{
          box-sizing: border-box;
          color:rgba(153,153,153,1);
        }
        i{
          position:absolute;
          top:8px;
          right:5px;
          height:26px;
          line-height:26px;
          font-size:12px;
          color:#fff;
          font-family:PingFangSC-Regular;
          background-color: #FF5C01;
          border-radius:1px;
          padding:0 5px;
        }
      }
      .getCode{
        overflow: hidden;
        margin-top:15px;
        position: relative;
        .code_content{
          float:left;
          .el-input{
            box-sizing: border-box;
            color:rgba(153,153,153,1);
          }
          i{
            position:absolute;
            top:8px;
            right:5px;
            height:26px;
            line-height:26px;
            font-size:12px;
            color:#fff;
            font-family:PingFangSC-Regular;
            background-color: #FF5C01;
            border-radius:1px;
            padding:0 5px;
          }
        }
        .el-button{
          float:right;
          width:90px;
          height:40px;
          line-height:40px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(153,153,153,1);
          text-align: center;
          padding:0;
          border:1px solid rgba(204,204,204,1);
          border-radius:3px;
        }
      }
    }
    .pass_main{
      position:relative;
      .passwarn{
        position: absolute;
        width:100%;
        color:rgba(153,153,153,1);
        font-size:12px;
        font-family:PingFangSC-Regular;
        top:8%;
        left:105%;
      }
    }
    .submit_pass{
      width:360px;
      height:157px;
      text-align: center;
      box-sizing: border-box;
      margin:0 auto;
      padding:30px 76px;
      border-radius:4px;
      border:1px solid rgba(228,231,237,1);
      p{
        font-size:18px;
        font-weight:500;
        height:24px;
        line-height:24px;
        color:rgba(48,49,51,1);
        margin-bottom:30px;
        .icon{
          display: inline-block;
          position:relative;
          top:6px;
          width:24px;
          height:24px;
          border-radius: 50%;
          background:rgba(216,216,216,1);
          margin-right:10px;
        }
      }
      .goindex{
        font-size:14px;
        i{
          color: #3C96FF;
          cursor: pointer;
        }
      }
      /* .el-button {
        width:162px;
        height:40px;
        font-size:14px;
        color:rgba(51,51,51,1);
        font-family:PingFangSC-Regular;
        border-radius:20px;
        border:1px solid rgba(221,221,221,1);
      } */
    }
  }
}
</style>
