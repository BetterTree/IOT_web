<template>
  <div class="login-warpper">
    <div class="login-bg"></div>
    <div class="login-box">
      <div class="login-panel animated fadeIn">
        <h1>物联网创新平台</h1>
        <pre>
          致力于云端描述、调用、采集真实世界数据的载体，提供设备管理、
          数据接入、协议解析等基础功能,即点、即学、即调取各类IOT数据，
          真正为物联网教育的交互式学习带来无限可能。
          从端到云，从数据采集、传输、计算、存储、展现到分析,
          立足于“连接”、“理解”到“唤醒”的各项关键能力，
          构建各类智能物联网应用作品，完成赛事需求。
          互联互通，轻松掌控万物
          传输采集，快捷数据赋能
          一键操控，便利定义功能
        </pre>
        <div>
          <svg-icon iconClass="logo"></svg-icon>
        </div>
      </div>
      <div class="login-form animated slideInRight">
        <h6>欢迎使用bettertree</h6>
        <el-form ref="editForm" :model="editForm" :rules="rules">
          <el-form-item prop="userId">
            <el-input
              v-model.trim="editForm.userId"
              type="text"
              :maxlength="20"
              placeholder="用户名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPwd">
            <el-input
              v-model.trim="editForm.userPwd"
              :min="6"
              :maxlength="30"
              type="password"
              placeholder="密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <router-link :to="{path:'/account/forgetPwd'}">忘记密码?</router-link>
            <router-link :to="{path:'/account/regeister'}">注册一个新账号</router-link>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { requiredInput, password } from '@/utils/validate'
export default {
  name: '',
  data() {
    return {
      editForm: {
        userId: '',
        userPwd: ''
      },
      rules: {
        userId: requiredInput('用户名不能为空'),
        userPwd: password()
      }
    }
  },
  mounted() {
    if (process.env.NODE_ENV == 'development') {
      this.editForm.userId = 'admin'
      this.editForm.userPwd = "123456"
    }
    this.getLoginUserAsync()
  },
  methods: {
    submit() {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          this.LoignAsync()
        }
      })
    },
    async LoignAsync() {
      let { resultcode, resultmsg, data } = await this.$api.login(this.editForm)
      if (resultcode == 0) {
        localStorage.setItem('Token', JSON.stringify(data))
        this.getLoginUserAsync()
      }
      else {
        this.$message.warning(resultmsg)
      }
    },
    async getLoginUserAsync() {
      let { resultcode, data } = await this.$api.getLoginUser()
      if (resultcode == 0) {
        this.$store.commit('SET_USER', data)
        this.$router.push('/')
      }
    }
  }
}
</script>
<style lang="less">
.login-warpper {
  background: url("../../assets/img/bg.png") center center/100% 100% no-repeat;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .login-bg {
    position: absolute;
    background: rgba(0, 0, 0, 0.45);
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .login-box {
    position: absolute;
    z-index: 3;
    display: flex;
    width: 100%;
    height: 100%;
    .login-panel {
      width: 70%;
      h1 {
        margin-top: 170px;
        margin-bottom: 10px;
        margin-left: 105px;
        color: white;
        font-size: 72px;
      }
      pre {
        color: #fefefe;
        font-size: 28px;
      }
      div {
        margin-left: 140px;
        .svg-icon {
          width: 800px;
          height: 200px;
        }
      }
    }
    .login-form {
      flex-grow: 1;
      background: rgba(250, 251, 252, 0.5);
      margin: 55px 80px;
      border-radius: 8px;
      text-align: center;
      h6 {
        margin-top: 135px;
        font-size: 32px;
        color: #414141;
      }
      .el-form {
        margin: 42px 60px 0;
        .el-form-item {
          &:nth-child(1) {
            margin-bottom: 46px;
          }
        }
        .el-input {
          line-height: normal;
          .el-input__inner {
            background: #e6e9ef;
            border: none;
            border-radius: 10px;
            height: 60px;
            font-size: 30px;
            &::-webkit-input-placeholder {
              font-size: 30px;
            }
          }
        }
        a {
          color: black;
          font-size: 18px;
          &:not(:last-child)::after {
            content: "|";
            margin: 0 15px;
          }
        }
        .el-button {
          background: rgba(255, 93, 93, 1);
          border-radius: 10px;
          color: #fefefe;
          width: 450px;
          border: none;
          font-size: 34px;
        }
        .el-form-item__error {
          color: #414141;
          margin-left: 10px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>