<template>
  <div class="bt-switch">
    <el-switch v-bind="$attrs" v-model="inputValue" @change="change"></el-switch>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
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
  mounted () {
    this.inputValue = this.value
  },
  methods: {
    change (value) {
      this.$emit('success', {
        value,
        sensor: this.sensor
      })
    }
  }
}
</script>
<style lang="less">
.bt-switch {
  .el-switch {
    width: 100px;
    height: 100px;
    margin-left: 50px;
    //   margin-top: -10px;
  }
}
</style>
