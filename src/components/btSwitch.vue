<template>
  <div>
    <el-switch
      style="width:120px;height:120px;margin-left:50px"
      v-bind="$attrs"
      v-model="inputValue"
      @change="change"
    ></el-switch>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      inputValue: 0
    }
  },
  props: {
    sensor: {
      type: Object
    },
    value: {
      type: Number
    }
  },
  mounted() {
    this.inputValue = this.value
  },
  methods: {
    change(value) {
      this.$emit('success', {
        value,
        sensor: this.sensor
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>