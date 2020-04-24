<template>
  <div class="dashboard">
    <div class="search">
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-button @click="showDialog()">
            <i class="el-icon-circle-plus" style="color:#A6AAB8"></i>
            新建项目
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="搜索栏"
            v-model.trim="name"
            clearable
            @keyup.enter.native="search()"
            @clear="search()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="confirm" @click="search()">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <main>
      <ul>
        <li
          v-for="(item,index) in list"
          :key="index"
          :class="[!item.hasOwnProperty('id')?'empty':'']"
          @click="gotoDetail(item)"
        >
          <div data-v-9feaa67c="" class="el-card box-card is-always-shadow">
            <div class="el-card__header">
              <div data-v-9feaa67c="" class="clearfix">
                <el-col :span="24" :title="item.name">
                  <span class="row1" style="cursor:pointer">{{item.name}}</span>
                </el-col>
                  <el-col class="row1"  :span="12">{{item.updateTime|formatDate('MM-dd')}}</el-col>
                  <el-col :span="12" style="text-align:right">
                    <i style="font-size: 0.5em" class="el-icon-more" @click.stop="showDialog(false,item)"></i>
                    <i style="font-size: 0.5em" class="el-icon-delete" @click.stop="showDeleteDialog(item)"></i>
                  </el-col>
            </div>
            </div>
            <div class="el-card__body">
              <div data-v-9feaa67c="" class="component-item">
                <div data-v-175fbaac="" data-v-9feaa67c="" class="pan-item">
                  <div data-v-175fbaac="" class="pan-info">
                    <div data-v-175fbaac="" class="pan-info-roles-container">
                      <el-row class="row2">
                        <el-col :span="24">{{item.remark}}</el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--
          <el-row class="row1">
            <el-col :span="12" :title="item.name">
              <span style="cursor:pointer">{{item.name}}</span>
            </el-col>
            <el-col :span="8">{{item.updateTime|formatDate('MM-dd hh:mm')}}</el-col>
            <el-col :span="4" style="text-align:right">
              <i class="el-icon-more" @click.stop="showDialog(false,item)"></i>
              <i class="el-icon-delete" @click.stop="showDeleteDialog(item)"></i>
            </el-col>
          </el-row>
          <el-row class="row2">
            <el-col :span="24">{{item.remark}}</el-col>
          </el-row>
          -->
        </li>
      </ul>
      <el-pagination
        :hide-on-single-page="true"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="rows"
        :current-page.sync="page"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </main>

    <el-dialog
      :visible.sync="dialogVisible"
      top="25vh"
      width="450px"
      custom-class="projectDialog"
      :show-close="false"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model.trim="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" rows="2" v-model="editForm.remark" placeholder clearable></el-input>
        </el-form-item>
        <el-form-item prop="code" label-width="0px">
          <el-row :gutter="5">
            <el-col :span="7">
              <el-button @click="getCodeAsync()" :disabled="!isAdd">生成识别码</el-button>
            </el-col>
            <el-col :span="17">
              <el-input
                v-clipboard:copy="editForm.code"
                v-clipboard:success="clipboardSuccess"
                v-model="editForm.code"
                readonly
                disabled
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="saveAsync()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="deleteDialogVisible"
      :center="true"
      width="300px"
      top="25vh"
      custom-class="deleteDialog"
      :title="selectProject.name"
    >
      <span style="font-size:64px">
        <svg-icon iconClass="warn"></svg-icon>
      </span>
      <div class="content">你确定要删除此项目吗？</div>

      <div slot="footer">
        <el-button @click="deleteDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="deleteAsync()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { requiredInput, maxInput } from '@/utils/validate'
import eventBus from '@/eventBus.js'
export default {
  name: "",
  data() {
    return {
      name: '',
      page: 1,
      rows: 8,
      total: 0,
      list: [],
      dialogVisible: false,
      deleteDialogVisible: false,
      editForm: {
        name: '',
        remark: '',
        code: ''
      },
      rules: {
        name: maxInput('项目名称', 36),
        code: requiredInput('项目识别码不能为空')
      },
      isAdd: false,
      selectProject: {
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'projects'])
  },
  mounted() {
    this.getListAsync()
  },
  created() {
    eventBus.$on('edit', () => {
      this.getListAsync()
    })
  },
  methods: {
    showDialog(isAdd = true, row) {
      this.dialogVisible = true
      this.isAdd = isAdd
      if (this.$refs.editForm)
        this.$refs.editForm.resetFields()
      if (isAdd) {
        this.editForm = {
          name: '',
          remark: '',
          code: ''
        }
      }
      else {
        this.editForm = { ...this.editForm, ...row }
      }
    },
    showDeleteDialog(row) {
      this.deleteDialogVisible = true
      this.selectProject = row
    },
    search() {
      this.page = 1
      this.getListAsync()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getListAsync()
    },
    gotoDetail(item) {
      if (item.id != undefined)
        this.$emit('openProject', item)
    },
    clipboardSuccess() {
      this.$message.success('复制成功')
    },
    async getCodeAsync() {
      let { resultcode, data } = await this.$api.getCode()
      if (resultcode == 0)
        this.editForm.code = data
    },

    async getListAsync() {
      let { resultcode, data } = await this.$api.getProjectList(this.page, this.rows, this.name)
      if (resultcode == 0) {
        let { total, rows } = data
        this.total = total
        if (rows.length < 8) {
          let newObj = {}
          this.list = rows.concat(new Array(8 - rows.length).fill(newObj))
        }
        else
          this.list = rows
      }
    },
    async saveAsync() {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          if (this.isAdd)
            this.editForm.user = this.user
          let { resultcode } = this.isAdd ? await this.$api.addProject(this.editForm) : await this.$api.editProject(this.editForm)
          if (resultcode == 0) {
            this.$message.success('操作成功')
            this.dialogVisible = false
            this.getListAsync()
          }
          else if (resultcode == 100) {
            this.$message.error('重复的识别码')
          }
        }
      })
    },
    async deleteAsync() {
      let project = this.projects.find(_ => _.id == this.selectProject.id)
      if (project != null) {
        this.$message.error('项目已打开,无法删除')
        this.deleteDialogVisible = false
        return
      }
      let { resultcode } = await this.$api.deleteProject(this.selectProject.id)
      if (resultcode == 0) {
        if (this.list.filter(_ => _.id != undefined).length == 1 && this.page != 1) {
          this.page = this.page - 1
        }
        this.getListAsync()
        this.deleteDialogVisible = false
        this.$message.success('删除成功')
      }
      else {
        this.$message.error('删除失败')
      }
    }
  }
}
</script>
<style lang="less">
.dashboard {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px - 104px);
  overflow: auto;
  .search {
    background: white;
    .el-form {
      padding: 25px 0px 25px 95px;
      margin: 0;
      flex-grow: 1;
      .el-form-item {
        vertical-align: middle;
        margin-bottom: 0;
        .el-button {
          background: #f6f7f9;
          width: 230px;
          color: #3c4353;
          border: 1px solid #3c4353;
          border-radius: 10px;
          font-size: 30px;
          &.confirm {
            width: 100px;
          }
        }
        .el-input {
          width: 500px;
          .el-input__inner {
            height: 57px;
            background: #f6f7f9;
            line-height: 57px;
            border-radius: 10px;
            font-size: 30px;
            border-color: #3c4353;
            &::-webkit-input-placeholder {
              font-size: 30px;
            }
          }
        }
      }
    }
  }
  main {
    border-top: 1px solid #a6aab8;
    border-bottom: 1px solid #a6aab8;
    background: #f7f6fb;
    flex-grow: 1;
    & > ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding: 0 100px;
      li {
        margin-top: 30px;
        list-style: none;
        color: black;
        flex: 0 0 21%;
        margin-bottom: 1.5vh;
        border: 1px solid #aaaaaa;
        background: white;
        box-shadow: 0px 3px 10px 0px rgba(52, 52, 52, 0.5);
        // height: 250px;
        min-width: 300px;
        transition: transform 1s linear;
        .box-card {
          height: 18em;
        }
        &.empty {
          opacity: 0;
        }
        /*
        .row1 {
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #aaaaaa;
          > :first-child {
            .ellipsis(1);
            span {
              display: inline-block;
              padding-left: 20px;
            }
          }
          > :nth-child(2) {
            .ellipsis(1);
            text-align: center;
          }
          > :last-child {
            text-align: right;
            padding-right: 5px;
            i {
              margin-right: 2px;
            }
          }
        }
        */
        .row1 {
          font-size: 0.5em;
        }

        .row2 {
          padding: 0 20px;
          line-height: 3em;
          font-size: 0.5em;
          // height: calc(25vh - 30px);
          :nth-child(1) {
            .ellipsis(6);
          }
        }
        &:hover {
          transform: scale(1.03, 1.03);
        }
      }
    }
    .el-pagination {
      display: block;
      padding: 20px;
      // margin-top: 30px;
      text-align: center;
      align-self: center;
      .el-pager li:not(.disabled).active {
        background: #313131;
      }
    }
  }
}
</style>
