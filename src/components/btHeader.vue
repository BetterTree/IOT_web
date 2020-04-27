<template>
  <el-header height="70px">
      <img
          :src="require(`@/assets/img/logo.png`)"
           style="height:42px"

      />

    <el-dropdown v-if="user!=null" @command="command">
      <span class="el-dropdown-link">
        <img v-if="user.userPhoto!=null" :src="web_site+user.userPhoto" />
        <i v-else class="iconfont icon--header" style="font-size: 42px;vertical-align: middle;"></i>
        <a style="font-size: 16px">{{user.userId}}</a>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="/">我的项目</el-dropdown-item>
        <el-dropdown-item command="/profile">个人中心</el-dropdown-item>
        <el-dropdown-item divided command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <router-link v-else :to="{path:'/login'}">登录</router-link>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data() {
    return {
      web_site: process.env.VUE_APP_ORIGIN_SITE
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'user'])
  },
  mounted() {
    console.log(process.env.VUE_APP_ORIGIN_SITE)
  },
  methods: {
    toggleClick() {
      this.$store.dispatch('ToggleSideBar')
    },
    command(val) {
      if (val.startsWith("/"))
        this.$router.push(val)
      else
        this.logOut()
    },
    logOut() {
      this.$store.dispatch('LoginOutAsync').then(() => {
        localStorage.removeItem('Token')
        window.location.href = '/'
      })
    }
  }
}
</script>
<style lang="less">
.el-header {
  background: #3c4353;
  width: 100%;
  height: 70px;
  // line-height: 60px;
  display: flex;
  align-items: center;
  > div:first-child {
    font-size: 150px;
    svg {
      align-items: center;
    }
  }
  > div:last-child {
    margin-left: auto;
    color: white;
    line-height: 70px;
    img {
      width: 42px;
      height: 42px;
      vertical-align: middle;
      border-radius: 50%;
    }
    .el-dropdown {
      .el-dropdown-link {
        color: white;
      }
      .el-dropdown-menu__item {
        text-align: center;
      }
    }
  }
  a {
    color: white;
    margin-left: auto;
    line-height: 70px;
  }
}
</style>
