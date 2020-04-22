<template>
  <div class="home">
    <el-tabs class="tab" @tab-remove="removeTab" v-model="editableTabsValue">
      <el-tab-pane label="首页" name="home">
        <Dashboard @openProject="openProject"></Dashboard>
      </el-tab-pane>
      <el-tab-pane closable v-for="(item) in editableTabs" :key="item.id" :name="item.id+''">
        <span slot="label">{{item.name}}</span>
        <Editor v-bind="item"></Editor>
      </el-tab-pane>
    </el-tabs>
    <span class="close" v-if="editableTabs.length>0" @click="closeAll()">
      <i class="el-icon-circle-close"></i>
    </span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Dashboard from './MainPanel/index'
import Editor from './MainPanel/editor'
import eventBus from '@/eventBus.js'
export default {
  name: 'home',
  components: {
    Dashboard,
    Editor
  },
  computed: {
    ...mapGetters(['projects']),
  },
  data() {
    return {
      editableTabs: [],
      editableTabsValue: 'home'
    }
  },
  created() {
    eventBus.$on('edit', ({ id, name }) => {
      let x = this.editableTabs.find(_ => _.id == id)
      x.name = name
    })
  },
  methods: {
    openProject(item) {
      if (this.editableTabs.find(_ => _.id == item.id) == null) {
        this.$store.commit('SET_PROJECTS', item)
        this.editableTabs.push(item)
      }
      this.editableTabsValue = item.id + ''
    },
    removeTab(targetName) {
      let targetIndex = this.editableTabs.findIndex(_ => _.id == targetName)
      let array = this.editableTabs.splice(targetIndex, 1)
      this.$store.commit('REMOVE_PROJECT', array[0])
      if (this.editableTabs.length == 0) {
        this.editableTabsValue = 'home'
      }
      else {
        let index = targetIndex - 1
        if (index < 0)
          index = 0
        this.editableTabsValue = this.editableTabs[index].id + ''
      }

    },
    async closeAll() {
      this.editableTabsValue = 'home'
      this.editableTabs = []
      this.projects.forEach(async  _ => {
        if (_.isRunning) {
          await this.$api.stopProject(_.id)
        }
      })

      this.$store.commit('CLOSE_PROJECT')
    }
  }
}
</script>
<style lang="less">
.home {
  position: relative;
  .el-tabs {
    .el-tabs__header {
      margin: 0;
      .el-tabs__nav-wrap {
        &::after {
          background-color: #838a9d;
        }
        .el-tabs__nav-scroll {
          .el-tabs__active-bar {
            display: none;
          }
          .el-tabs__nav {
            .el-tabs__item {
              background: #e6e9ef;
              color: black;
              text-align: center;
              padding: 0 40px;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              position: relative;
              &:hover {
                background: rgba(230, 233, 239, 0.9);
              }
              span {
                max-width: 85px;
                display: inline-block;
                vertical-align: bottom;
                .ellipsis(1);
              }
              .el-icon-close {
                vertical-align: middle;
                font-weight: bold;
                &:hover {
                  color: black;
                  background: fade(#e6e9ef, 50%);
                }
              }
              &.is-active {
                background: white;
                &::before,
                &::after {
                  content: "";
                  position: absolute;
                  border-top: 12px solid transparent;
                  position: absolute;
                  bottom: 0;
                  z-index: 100;
                }
                &::before {
                  border-right: 15px solid white;
                  left: -5px;
                }
                &::after {
                  border-left: 15px solid white;
                  right: -5px;
                }
              }
            }
            &:first-child {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .close {
    position: absolute;
    right: 20px;
    top: 3px;
    color: white;
    cursor: pointer;
    font-size: 24px;
  }
}
</style>
