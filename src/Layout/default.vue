<template>
  <el-container class="layout" direction="vertical">
    <bt-header></bt-header>
    <el-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-main>
    <bt-footer></bt-footer>
  </el-container>
</template>
<script>
export default {
  name: 'layout',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
  /*
.layout {
  display: flex;
  flex-direction: column;
  // height: 100vh;
  background: white;
  .el-main {
    padding: 0;
    flex-grow: 1;
    background-color: #838a9d;
  }
  footer {
    flex-shrink: 1;
    text-align: center;
  }
}
   */

  .layout {
    background: white;
    .el-main {
      padding: 0;
      background-color: #838a9d;
    }
    .el-footer {
      padding: 0;
      text-align: center;
    }
  }
</style>
