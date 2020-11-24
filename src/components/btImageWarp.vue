<template>
  <div class="bt-image-warp">
    <img :src="require(`@/assets/img/lattice/${src}.png`)" />
    <el-select placeholder v-model="selectedKey" @change="change" style>
      <el-option v-for="(item,index) in latticeTypes" :key="index" :value="item.desc">
        <img :src="require(`@/assets/img/lattice/${item.src}.png`)" style="width:30px;height:30px" />
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { latticeTypes } from '@/constant'
export default {
  name: '',
  data () {
    return {
      latticeTypes,
      selectedKey: '',
      src: ''
    }
  },
  props: {
    sensor: {
      type: Object
    }
  },
  methods: {
    change (value) {
      let lattice = this.latticeTypes.find(_ => _.desc === value)
      this.src = lattice.src
      this.$emit('success', {
        // map: {
        //   key0: lattice.desc,
        //   key1: lattice.src,
        //   key2: lattice.value,
        // },
        value: lattice.value,
        sensor: this.sensor
      })
    }
  },
  watch: {
    sensor: {
      handler (newVal) {
        this.selectedKey = newVal.map.key0
        this.src = newVal.map.key1
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
.bt-image-warp {
  img {
    width: 120px;
    height: 120px;
  }
  .el-select {
    width: 80px;
    line-height: 120px;
    vertical-align: top;
  }
}
</style>
