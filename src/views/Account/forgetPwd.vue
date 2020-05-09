<template>
  <div class="forgetPwd">
    <div class="forgetPwd-box">
      <h1>找回密码</h1>
      <el-form ref="editForm" :model="editForm" :rules="rules">
        <template v-if="step==0">
          <el-form-item prop="userId">
            <el-input placeholder="用户名" type="text" v-model.trim="editForm.userId"></el-input>
          </el-form-item>
          <el-form-item v-if="!slideSuccess">
            <slide-check :width="340" :height="200" :src="src" @success="slideSuccess=true"></slide-check>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit()">确定</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/login">
              <el-button >返回登录</el-button>
            </router-link>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item prop="question">
            <el-select popper-append-to-body v-model="editForm.question" placeholder="安全问题">
              <el-option
                v-for="item in question"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="answer">
            <el-input placeholder="答案" type="text" v-model.trim="editForm.answer"></el-input>
          </el-form-item>
          <el-form-item prop="newPwd">
            <el-input
              placeholder="密码"
              auto-complete="newPwd"
              type="password"
              v-model.trim="editForm.newPwd"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPwd">
            <el-input
              placeholder="再次输入新密码"
              type="password"
              auto-complete="confirmPwd"
              v-model.trim="editForm.confirmPwd"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="!slideSuccess">
            <slide-check :height="200" :src="src" @success="slideSuccess=true"></slide-check>
          </el-form-item>
          <el-form-item>
            <el-button v-if="slideSuccess" @click="submit()">确定</el-button>
            <span class="back" @click="step=0">
              <i class="el-icon-back"></i> 返回上一步
            </span>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <!--
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <slide-check :width="340" :height="200" :src="src" @success="slideCheck"></slide-check>
    </el-dialog>
    -->
  </div>
</template>
<script>
import { requiredInput, password } from '@/utils/validate'
import { question } from '@/constant'
export default {
  name: '',
  data() {
    return {
      question,
      editForm: {
        userId: '',
        newPwd: '',
        question: '',
        answer: '',
        confirmPwd: ''
      },
      step: 0,
      src: [
        require("@/assets/img/slideCheck/1.jpg"),
        require("@/assets/img/slideCheck/2.jpg"),
        require("@/assets/img/slideCheck/3.jpg")
      ],
      rules: {
        userId: requiredInput('用户名不能为空'),
        newPwd: password(),
        confirmPwd: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请确认密码'))
              } else if (this.editForm.newPwd != value) {
                callback(new Error('确认密码错误'))
              } else {
                callback()
              }
            },
            required: true,
            trigger: 'change',
            message: '确认密码错误'
          }
        ]
      },
      dialogVisible: false,
      isExistUser: false,
      slideSuccess: false,
    }
  },
  methods: {
    slideCheck() {
      this.dialogVisible = false
      this.slideSuccess = true
    },

    async submit() {
      if (this.step == 0) {
        if (this.slideSuccess == false) {
          this.dialogVisible = true
          return
        }
        this.$refs.editForm.validate(async valid => {
          if (valid) {
            await this.isExistUserAsync()
            if (this.isExistUser) {
              await this.getUserByUserIdAsync()
              this.step++
            }
            else {
              this.$message.error('用户不存在')
            }
          }
        })
      }
      // else if (this.step == 1) {
      //   this.step++
      //   this.slideSuccess = false

      // }
      else {
        this.$refs.editForm.validate(async valid => {
          if (valid) {
            this.forgetPwdAsync()
          }
        })
      }
    },
    async isExistUserAsync() {
      let { existed } = await this.$api.isExistUser(this.editForm.userId)
      this.isExistUser = existed
    },
    async getUserByUserIdAsync() {
      let { resultcode, resultmsg, data } = await this.$api.getUserByUserId(this.editForm.userId)
      if (resultcode == 0) {
        let { id, question } = data
        this.editForm.question = parseInt(question)
        this.editForm.id = id
      }
      else {
        this.$message.warning(resultmsg)
      }
    },
    async forgetPwdAsync() {
      let { userId, confirmPwd, ...data } = this.editForm
      let { resultcode, resultmsg } = await this.$api.chgPwd(data)
      if (resultcode == 0) {
        this.$message.success('修改成功')
      }
      else {
        this.$message.info(resultmsg)
      }
    }
  }
}
</script>
<style lang="less">
.forgetPwd {
  background: #f7f6fb;
  height: calc(100vh - 70px - 50px);
  text-align: center;
  display: flex;
  justify-content: center;
  .forgetPwd-box {
    width: 500px;
    margin-top: 50px;
    h1 {
      font-size: 36px;
    }
    .el-form {
      margin-top: 35px;
      .el-form-item:nth-child(-n + 5) {
        margin-bottom: 30px;
      }
      .el-input {
        .el-input__inner {
          &:focus {
            border: 1px solid #dcdfe6;
          }
        }
      }
      // .wrap {
      //   border: 1px solid #dcdfe6;
      //   width: 480px !important;
      //   .slider-check-wrap {
      //     width: 480px !important;
      //     canvas {
      //       width: 100%;
      //     }
      //   }
      // }
      .el-select {
        width: 100%;
      }
      .el-checkbox {
        color: #a6aab8;
        text-align: left;
      }
      .el-button {
        width: 500px;
        font-size: 28px;
        &:hover,
        &:focus {
          background: #3c4353;
          color: white;
        }
        & + a {
          display: block;
          color: #3c4353;
        }
      }
      .back {
        color: red;
        cursor: pointer;
      }
    }
  }
}
</style>
