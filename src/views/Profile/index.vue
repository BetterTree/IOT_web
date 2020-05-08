<template>
  <div class="profile">
    <el-form ref="editForm" :model="editForm" label-width="200px" label-position="right">
      <h1>个人中心</h1>
      <el-row>
        <el-col :span="12">
          <el-form-item label="头像">
            <img :src="previewImageSrc" v-if="previewImageSrc!=''" />
            <template v-else>
              <img v-if="editForm.userPhoto!=null" :src="web_site+editForm.userPhoto" />
              <i
                v-else
                class="iconfont icon--header"
                style="font-size:80px;vertical-align: middle;"
              ></i>
            </template>
            <el-upload
              ref="upload"
              style="margin-bottom:0"
              action="/api/upload"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleSuccess"
            >
              <br />
              <el-button type="ghost">选择图片</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="editForm.gender">
              <el-radio :label="'1'">男</el-radio>
              <el-radio :label="'0'">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生日">
            <el-date-picker v-model="editForm.birthday"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码">
            <el-input v-model="editForm.userTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱地址">
            <el-input v-model="editForm.userEmail"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="城市">
            <el-input v-model="editForm.city"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学校">
            <el-input v-model="editForm.school"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="年级">
            <el-input v-model="editForm.grade"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="爱好">
            <el-input v-model="editForm.habit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="QQ">
            <el-input v-model="editForm.imAccount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-button class="active" @click="saveAsync()">保存</el-button>
        <el-button @click="cancel()">返回</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { requiredInput } from '@/utils/validate'
export default {
  name: '',
  data() {
    return {
      editForm: {
        gender: '0',
        birthday: '',
        userTel: '',
        userEmail: '',
        city: '',
        school: '',
        imAccount: '',
        grade: '',
        habit: '',
        userPhoto: ''
      },
      file: null,
      previewImageSrc: '',
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
      },
      editFormCopy: {},
      web_site: process.env.VUE_APP_ORIGIN_SITE
    }
  },
  computed: {
    ...mapGetters(['user']),

  },
  mounted() {
    this.editForm = Object.assign({}, this.editForm, this.user)
    this.editFormCopy = { ...this.editForm }
  },
  methods: {
    beforeUpload(file) {
      console.log(1)
      this.file = file
      let reader = new FileReader()
      reader.readAsDataURL(file)
      const _this = this
      reader.onloadend = function (e) {
        _this.previewImageSrc = reader.result
      }
      //return false;
    },
    handleSuccess(file) {
      this.editForm.userPhoto = file.data
    },
    cancel() {
      //this.editForm = { ...this.editFormCopy }
      this.$router.go(-1)
    },
    async saveAsync() {
      let { resultcode } = await this.$api.editUser(this.editForm)
      if (resultcode == 0) {
        let user = { ...this.user, ...this.editForm }
        this.$message.success('修改成功')
        this.$store.commit('SET_USER', user)
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="less">
.profile {
  background: #f7f6fb;
  height: calc(100vh - 70px - 50px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .el-form {
    margin-top: 50px;
    width: 1080px;
    text-align: center;
    h1 {
      font-size: 36px;
      margin-bottom: 30px;
    }
    .el-row {
      margin-bottom: 15px;
      .el-col {
        .el-form-item {
          .el-input {
            width: 300px;
          }
          .el-form-item__label {
            font-size: 30px;
            color: #3c4353;
          }
          .el-form-item__content {
            text-align: left;
            img {
              width: 80px;
              height: 80px;
              object-fit: fit;
            }
            .el-date-editor.el-input,
            .el-date-editor.el-input__inner {
              width: 260px;
            }
            .el-radio-group {
              .el-radio {
                .el-radio__inner {
                  height: 20px;
                  width: 20px;
                  &::after {
                    width: 8px;
                    height: 8px;
                  }
                }
                .el-radio__input.is-checked .el-radio__inner {
                  background: #3c4353;
                  border-color: #3c4353;
                }
                .el-radio__input.is-checked + .el-radio__label {
                  color: #3c4353;
                }
              }
            }
          }
        }
      }
    }
    .el-button {
      width: 150px;
      background: #f6f7f9;
      margin-top: 10px;
      &.active,
      &:hover,
      &:focus {
        background: #3c4353;
        color: white;
      }
    }
  }
}
</style>
