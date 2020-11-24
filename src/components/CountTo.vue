<template>
  <div class="count-to-wrapper">
    <slot name="left" />
    <p class="content-outer">
      <span :class="['count-to-count-text', countClass]" :id="counterId">{{ init }}</span>
      <i :class="['count-to-unit-text', unitClass]">{{ unitText }}</i>
    </p>
    <slot name="right" />
  </div>
</template>
<script>
import CountUp from 'countup'
export default {
  name: 'CountTo',
  props: {
    init: {
      type: Number,
      default: 0
    },
    /**
         * @description 起始值，即动画开始前显示的数值
         */
    startVal: {
      type: Number,
      default: 0
    },
    /**
         * @description 结束值，即动画结束后显示的数值
         */
    end: {
      type: Number,
      required: true
    },
    /**
         * @description 保留几位小数
         */
    decimals: {
      type: Number,
      default: 0
    },
    /**
         * @description 分隔整数和小数的符号，默认是小数点
         */
    decimal: {
      type: String,
      default: '.'
    },
    /**
         * @description 动画持续的时间，单位是秒
         */
    duration: {
      type: Number,
      default: 1
    },
    /**
         * @description 动画延迟开始的时间，单位是秒
         */
    delay: {
      type: Number,
      default: 0
    },
    /**
         * @description 是否禁用easing动画效果
         */
    uneasing: {
      type: Boolean,
      default: false
    },
    /**
         * @description 是否使用分组，分组后每三位会用一个符号分隔
         */
    useGroup: {
      type: Boolean,
      default: false
    },
    /**
         * @description 用于分组(usegroup)的符号
         */
    separator: {
      type: String,
      default: ','
    },
    /**
         * @description 是否简化显示，设为true后会使用unit单位来做相关省略
         */
    simplify: {
      type: Boolean,
      default: false
    },
    /**
         * @description 自定义单位，如[3, 'K+'], [6, 'M+']即大于3位数小于6位数的用k+来做省略
         *              1000即显示为1K+
         */
    unit: {
      type: Array,
      default () {
        return [[3, 'K+'], [6, 'M+'], [9, 'B+']]
      }
    },
    countClass: {
      type: String,
      default: ''
    },
    unitClass: {
      type: String,
      default: ''
    },
    selfFormat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      counter: null,
      unitText: ''
    }
  },
  computed: {
    counterId () {
      return `count_to_${this._uid}`
    }
  },
  methods: {
    getHandleVal (val, len) {
      return {
        endVal: parseInt(val / Math.pow(10, this.unit[len - 1][0])),
        unitText: this.unit[len - 1][1]
      }
    },
    transformValue (val) {
      let len = this.unit.length
      let res = {
        endVal: 0,
        unitText: ''
      }
      if (val < Math.pow(10, this.unit[0][0])) res.endVal = val
      else {
        for (let i = 1; i < len; i++) {
          if (val >= Math.pow(10, this.unit[i - 1][0]) && val < Math.pow(10, this.unit[i][0])) res = this.getHandleVal(val, i)
        }
      }
      if (val > Math.pow(10, this.unit[len - 1][0])) res = this.getHandleVal(val, len)
      return res
    },
    getValue (val) {
      let res = 0
      if (this.simplify) {
        let { endVal, unitText } = this.transformValue(val)
        this.unitText = unitText
        res = endVal
      } else {
        res = val
      }
      return res
    }
  },
  mounted () {
    this.$nextTick(() => {
      let endVal = this.getValue(this.end)
      let options = {
        useEasing: !this.uneasing,
        useGrouping: this.useGroup,
        separator: this.separator || ',',
        decimal: this.decimal
      }
      if (this.selfFormat) {
        options.formattingFn = function (nStr) {
          nStr = nStr.toFixed(this.decimals)
          nStr += ''
          var x, x1, x2
          x = nStr.split('.')
          if (this.options.useGrouping) {
            x1 = x[0].replace(/\B(?=(?:\d{3})+\b)/g, this.options.separator)
              .split('').map(_ => {
                if (_ === this.options.separator) {
                  return _
                } else {
                  return `<span>${_}</span>`
                }
              })
            x1 = x1.join('')
          } else {
            x1 = x[0].split('').map(_ => {
              return `<span>${_}</span>`
            }).join('')
          }
          x2 = x.length > 1 ? this.options.decimal + x[1] : ''
          return this.options.prefix + x1 + x2 + this.options.suffix
        }
      }
      this.counter = new CountUp(this.counterId, this.startVal, endVal, this.decimals, this.duration, options)

      setTimeout(() => {
        if (!this.counter.error) this.counter.start()
      }, this.delay)
    })
  },
  watch: {
    end (newVal) {
      let endVal = this.getValue(newVal)
      this.counter.update(endVal)
    }
  }
}
</script>
<style lang="less">
@prefix: ~"count-to";

.@{prefix}-wrapper {
  .content-outer {
    display: inline-block;
    .@{prefix}-unit-text {
      font-style: normal;
    }
  }
}
</style>
