<template>
  <div>
    <bt-input-number v-bind="$attrs" :value.sync="mkey0" @change="change('key0')"></bt-input-number>
    <bt-input-number v-bind="$attrs" :value.sync="mkey1" @change="change('key1')"></bt-input-number>
    <bt-input-number v-bind="$attrs" :value.sync="mkey2" @change="change('key2')"></bt-input-number>
    <bt-input-number v-bind="$attrs" :value.sync="mkey3" @change="change('key3')"></bt-input-number>
  </div>
</template>
<script>
import { throttle } from '@/utils/throttle'
export default {
  name: "",
  data() {
    return {
      mkey0: 0,
      mkey1: 0,
      mkey2: 0,
      mkey3: 0
    }
  },
  props: {
    sensor: {
      type: Object
    }
  },
  mounted() {
    this.mkey0 = this.sensor.map.key0
    this.mkey1 = this.sensor.map.key1
    this.mkey2 = this.sensor.map.key2
    this.mkey3 = this.sensor.map.key3
  },
  methods: {
    change(value) {
      throttle(() => {
        this.$emit('success', {
          // map: {
          //   key0: this.mkey0,
          //   key1: this.mkey1,
          //   key2: this.mkey2,
          //   key3: this.mkey3
          // },
          value: [this.mkey0, this.mkey1, this.mkey2, this.mkey3].join(""),
          sensor: this.sensor
        })
      }, 100)
    }
  }
}
</script>
<style lang="less" scoped>
</style>