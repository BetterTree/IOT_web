<template>
    <el-form
      ref="editForm"
      :model="editForm"
      :rules="rules"
      label-width="70px"
      label-position="right"
    >
      <el-form-item label="项目名" prop="name">
        <el-input v-model.trim="editForm.name" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input placeholder="备注" type="textarea" rows="10" v-model="editForm.remark" clearable></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom:0">
        <el-button @click="saveProjectAsync()">保存</el-button>
      </el-form-item>
    </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import { requiredInput, maxInput } from '@/utils/validate'
import eventBus from '@/eventBus.js'
export default {
  name: 'editProject',
  data () {
    return {
      editForm: {
        name: '',
        remark: '',
        code: ''
      },
      rules: {
        name: maxInput('项目名称', 36),
        code: requiredInput('识别码不能为空')
      },
      dialogTableVisible: false
    }
  },
  props: {
    id: {
      type: Number
    }
  },
  computed: {
    ...mapGetters(['projects'])

  },
  mounted () {
    this.editForm = { ...this.projects.find(_ => _.id === this.id) }
  },
  methods: {
    async saveProjectAsync () {
      console.log(this.dialogTableVisible)
      this.dialogTableVisible = false
      console.log(this.dialogTableVisible)
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          let { resultcode } = await this.$api.editProject(this.editForm)
          if (resultcode === 0) {
            this.$message.success('修改成功')
            this.$store.commit('SET_PROJECTS', this.editForm)
            eventBus.$emit('edit', {
              id: this.editForm.id, name: this.editForm.name
            })
          }
        }
      })
    },
    clipboardSuccess () {
      this.$message.success('复制成功')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
