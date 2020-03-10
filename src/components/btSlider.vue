<template>
  <div>
    <el-slider v-bind="$attrs" style v-model="inputValue" @input="change"></el-slider>
  </div>
</template>
<script>
import { throttle } from '@/utils/throttle'
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
      throttle(() => {
        this.$emit('success', {
          value,
          sensor: this.sensor
        })
      }, 150)
    }
  }
}
</script>
<style lang="less">
.el-slide {
  padding: 40px 20px 20px;
}
</style>