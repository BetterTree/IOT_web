<template>
  <el-form
    ref="editForm"
    :model="editForm"
    :rules="rules"
    label-width="70px"
    label-position="right"
  >
    <el-form-item prop="code" label="识别码">
      <el-input
        placeholder="识别码"
        v-clipboard:copy="editForm.code"
        v-clipboard:success="clipboardSuccess"
        v-model="editForm.code"
        readonly
        disabled
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'projectCode',
  data () {
    return {
      editForm: {
        code: ''
      }
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
    clipboardSuccess () {
      this.$message.success('复制成功')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
