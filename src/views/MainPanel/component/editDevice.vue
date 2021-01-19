<template>
  <div class="editDevice">
    <ul>
      <li v-for="(item,index) in deviceList" :key="index">
        <el-row>
          <el-col :span="3">
            <span class="index">{{index+1}}</span>
          </el-col>
          <el-col :span="16" class="title">{{item.name}}</el-col>

          <el-col :span="5">
            <span v-if="item.status=='unknown'" style="color:gray" title="unknown">
              <i class="iconfont icon-status"></i>
            </span>
            <span v-else-if="item.status=='online'" style="color:lime" title="online">
              <i class="iconfont icon-status"></i>
            </span>
            <span v-else-if="item.status=='unstable'" style="color:red" title="unstable">
              <i class="iconfont icon-status"></i>
            </span>
            <span v-else title="offline" style="color:red">
              <i class="iconfont icon-status"></i>
            </span>
            <span>
              <i class="el-icon-edit" @click="showDeviceDialog(false,item)"></i>
            </span>
            <span>
              <i class="el-icon-delete" @click="showDeviceDeleteDialog(item)"></i>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            设备识别码:
            <el-input
              style="width:210px;"
              placeholder="识别码"
              v-clipboard:copy="item.code"
              v-clipboard:success="clipboardSuccess"
              v-model="item.code"
              readonly
              disabled
            ></el-input>
          </el-col>
        </el-row>
      </li>
    </ul>
    <div style="align:center">
      <el-button @click="showDeviceDialog()">
        <i class="iconfont icon-add"></i>
        新增设备
      </el-button>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      top="25vh"
      width="450px"
      custom-class="projectDialog"
      :show-close="false"
      append-to-body
    >
      <el-form
        ref="editDeviceForm"
        :model="editDeviceForm"
        :rules="rules"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="editDeviceForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="code" label-width="0px">
          <el-row>
            <el-col :span="8">
              <el-button @click="getCodeAsync()" :disabled="!isAdd">生成识别码</el-button>
            </el-col>
            <el-col :span="16" style="margin-left: -12px;">
              <el-input
                v-model="editDeviceForm.code"
                v-clipboard:copy="editDeviceForm.code"
                v-clipboard:success="clipboardSuccess"
                readonly
                disabled
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="saveDeviceAsync()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="deleteDialogVisible"
      center
      top="25vh"
      width="300px"
      custom-class="deleteDialog"
      :title="selectDevice.name"
      append-to-body
    >
      <span style="font-size:64px">
        <svg-icon iconClass="warn"></svg-icon>
      </span>
      <div class="content">你确定要删除此设备吗？</div>
      <div slot="footer">
        <el-button @click="deleteDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="deleteDeviceAsync()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { requiredInput, maxInput } from '@/utils/validate'
export default {
  name: '',
  data () {
    return {
      editDeviceForm: {
        name: '',
        code: '',
        project: {
          id: ''
        }
      },
      rules: {
        name: maxInput('名称', 20),
        code: requiredInput('识别码不能为空')
      },
      deviceList: [],
      dialogVisible: false,
      deleteDialogVisible: false,
      selectDevice: {
        name: ''
      },
      isAdd: false,
      timer: null
    }
  },
  props: {
    id: {
      type: Number
    },
    code: {
      type: String
    },
    isRunning: {
      type: Boolean
    }
  },
  created () {
    this.getDeviceByIdAsync()
  },
  methods: {
    showDeviceDialog (isAdd = true, row) {
      this.dialogVisible = true
      this.isAdd = isAdd
      if (this.$refs.editDeviceForm) {
        this.$refs.editDeviceForm.resetFields()
      }
      if (isAdd) {
        this.editDeviceForm = {
          name: '',
          code: '',
          project: {
            id: this.id
          }
        }
      } else {
        this.editDeviceForm = { ...this.editDeviceForm, ...row }
      }
    },
    showDeviceDeleteDialog (row) {
      this.deleteDialogVisible = true
      this.selectDevice = row
    },
    clipboardSuccess () {
      this.$message.success('复制成功')
    },
    async getDeviceByIdAsync () {
      let { resultcode, data } = await this.$api.getDeviceByProjectId(this.id)
      if (resultcode === 0) {
        this.deviceList = data && data.rows
      }
    },
    async getCodeAsync () {
      let { resultcode, data } = await this.$api.getCode()
      if (resultcode === 0) {
        this.editDeviceForm.code = data
      }
    },
    async getDeviceStatusAsync () {
      let { resultcode, data } = await this.$api.getDeviceStatus(this.code)
      if (resultcode === 0) {
        this.deviceList.forEach(_ => {
          let item = data.find(o => o.id === _.id)
          if (!item) {
            _.status = item.status
          }
        })
      }
    },
    async saveDeviceAsync () {
      this.$refs.editDeviceForm.validate(async valid => {
        if (valid) {
          let { resultcode } = this.isAdd ? await this.$api.addDevice(this.editDeviceForm) : await this.$api.editDevice(this.editDeviceForm)
          if (resultcode === 0) {
            this.$message.success('操作成功')
            this.dialogVisible = false
            this.getDeviceByIdAsync()
          } else if (resultcode === 100) {
            this.$message.error('重复的识别码')
          }
        }
      })
    },
    async deleteDeviceAsync () {
      let { resultcode } = await this.$api.deleteDevice(this.selectDevice.id)
      if (resultcode === 0) {
        this.$message.success('操作成功')
        this.deleteDialogVisible = false
        this.getDeviceByIdAsync()
      }
    }
  },
  watch: {
    isRunning: function (newVal, oldVal) {
      if (newVal === true) {
        //  this.$store.dispatch('MQTTConnect', this.id)
        this.timer = setInterval(() => {
          this.getDeviceStatusAsync()
        }, 2500)
      }
    }
  },
  destroyed () {
    if (this.timer != null) {
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="less">
.editDevice {
  padding: 10px 0px;
  border-top: 1px solid #ccc;
  ul {
    height: 400px;
    overflow-y: auto;
    text-align: left;
    margin-bottom: 25px;
    padding: 5px 0;
    li {
      line-height: 26px;
      padding-left: 10px;
      .index {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid black;
        padding: 2px 8px;
      }
      .title {
        .ellipsis(1);
      }
      &:first-child {
        padding-top: 5px;
      }
    }
    &::-webkit-scrollbar {
      width: 6px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #cccccc;
      height: 20px;
    }

    &::-webkit-scrollbar-track {
      background: #e6e6e6;
    }
    &::after {
      content: "";
      width: 100px;
      height: 1px;
      background: #ccc;
    }
  }
  .el-button {
    background: #f6f7f9;
    color: #3c4353;
    width: 200px !important;
    &:hover,
    &:focus {
      background: #3c4353;
      color: white;
    }
    i {
      font-size: 18px;
    }
  }
}
</style>
