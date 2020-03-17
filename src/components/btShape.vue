<template>
  <div class="shape">
    <slot name="up"></slot>
    <slot name="down"></slot>
    <slot name="right"></slot>
    <slot name="left"></slot>
    <div :class="['arrow up',isUpActive?'active':'']">
      <span @mousedown="onArrowUpMouseDown" @mouseup="onArrowUpMouseUp">
        <i class="iconfont icon-arrow-up"></i>
      </span>
    </div>
    <div :class="['arrow down',isDownActive?'active':'']">
      <span @mousedown="onArrowDownMouseDown" @mouseup="onArrowDownMouseUp">
        <i class="iconfont icon-arrow-down"></i>
      </span>
    </div>
    <div :class="['arrow right',isRightActice?'active':'']">
      <span @mousedown="onArrowRightMouseDown" @mouseup="onArrowRightMouseUp">
        <i class="iconfont icon-arrow-right"></i>
      </span>
    </div>
    <div :class="['arrow left',isLeftActive?'active':'']">
      <span @mousedown="onArrowLeftMouseDown" @mouseup="onArrowLeftMouseUp">
        <i class="iconfont icon-arrow-left"></i>
      </span>
    </div>
    <div class="center"></div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      isUpActive: false,
      isRightActice: false,
      isDownActive: false,
      isLeftActive: false
    }
  },
  props: {
    code: {
      type: String
    },
    widgetCode: {
      type: String
    },
    map: {
      type: Object
    },
    isClickable: {
      type: false
    }
  },
  methods: {
    onArrowUpMouseDown() {
      if (this.isClickable) {
        this.isUpActive = true
        this.getCommandAsync(this.widgetCode, 'arrowup0')
      }
    },
    onArrowUpMouseUp() {
      if (this.isClickable) {
        this.isUpActive = false
        this.getCommandAsync(this.widgetCode, 'arrowup1')
      }
    },

    onArrowDownMouseDown() {
      if (this.isClickable) {
        this.isDownActive = true
        this.getCommandAsync(this.widgetCode, 'arrowdown0')
      }
    },
    onArrowDownMouseUp() {
      if (this.isClickable) {
        this.isDownActive = false
        this.getCommandAsync(this.widgetCode, 'arrowdown1')
      }
    },

    onArrowLeftMouseDown() {
      if (this.isClickable) {
        this.isLeftActive = true
        this.getCommandAsync(this.widgetCode, 'arrowleft0')
      }
    },
    onArrowLeftMouseUp() {
      if (this.isClickable) {
        this.isLeftActive = false
        this.getCommandAsync(this.widgetCode, 'arrowleft1')
      }
    },

    onArrowRightMouseDown() {
      if (this.isClickable) {
        this.isRightActice = true
        this.getCommandAsync(this.widgetCode, 'arrowright0')
      }
    },
    onArrowRightMouseUp() {
      if (this.isClickable) {
        this.isRightActice = false
        this.getCommandAsync(this.widgetCode, 'arrowright1')
      }
    },

    async getCommandAsync(code, value) {
      let { resultcode } = await this.$api.getWidgetCommand(this.code, code, value)
      if (resultcode == 0) {

      }
    }
  }
}
</script>
<style lang="less">
.shape {
  position: relative;
  width: 360px;
  height: 200px;
  .center {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #343434;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .arrow {
    color: #343434;
    position: absolute;
    span {
      i {
        font-size: 36px;
      }
    }
    &.up {
      top: 21%;
      left: 50%;
      transform: translateX(-50%);
    }
    &.active {
      i {
        color: #ccc;
      }
    }
    &.down {
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
    }
    &.left {
      top: 50%;
      left: 40%;
      transform: translate(-50%, -50%);
    }
    &.right {
      top: 50%;
      left: 60%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>