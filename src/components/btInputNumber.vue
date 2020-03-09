<template>
  <div class="btInputNumber">
    <span class="el-icon-caret-top" @click="add()"></span>
    <el-input-number
      v-if="isInput"
      v-model="inputValue"
      @change="change"
      :controls="false"
      :min="0"
      :max="9"
      :precision="0"
    ></el-input-number>
    <span v-else class="text">{{this.inputValue}}</span>
    <span class="el-icon-caret-bottom" @click="minus()"></span>
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
    value: {
      type: [Number, String]
    },
    isInput: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    change() {
      this.$emit('update:value', this.inputValue)
      if (this.isInput == false) {
        this.$emit('change')
      }
    },
    add() {
      if (this.inputValue < 9) {
        this.inputValue++
      }
      else {
        this.inputValue = 0
      }
      this.change()
    },
    minus() {
      if (this.inputValue > 0) {
        this.inputValue--
      }
      else {
        this.inputValue = 9
      }
      this.change()
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.inputValue = newVal
      },
      immediate: true
    }
  }
}
</script>
<style lang="less">
.btInputNumber {
  display: inline-block;
  margin-right: 5px;
  span {
    display: block;
    font-size: 22px;
  }
  .el-input-number {
    display: block;
    width: 40px;
  }
  .text {
    font-family: "lcdfont";
    font-size: 72px;
    display: inline-block;
    width: 40px;
  }
}
</style>