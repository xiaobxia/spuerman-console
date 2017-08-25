<template>
  <aside class="menu app-sidebar animated" :class="{ slideInLeft: show, slideOutLeft: !show }">
    <el-menu :default-active="routePath"
             class="el-menu-vertical-demo"
             @open="handleopen"
             @close="handleclose"
             @select="handleselect"
             unique-opened
             router
             theme="dark"
             v-show="!collapsed" style="height:100%">
      <template v-for="(item,index) in menu">
        <el-submenu :index="index+''" v-if="item.children&&item.children.length>0">
          <template slot="title"><i :class="['el-icon-menu']"></i>{{item.name}}</template>
          <el-menu-item v-for="child in item.children" :index="child.path">{{child.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-if="!item.children" :index="item.path"><i :class="['el-icon-menu']"></i>{{item.name}}
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<script type="text/babel">
  import {mapActions} from 'vuex'

  export default {
    props: {
      show: Boolean
    },

    data () {
      return {
        isReady: false,
        collapsed: false,
        routePath: null
      }
    },

    mounted () {
      this.queryMenu().then(() => {
        this.routePath = this.$route.path;
      });
    },

    computed: {
      menu () {
        return this.$store.state.menu;
      }
    },

    methods: {
      ...mapActions(['queryMenu']),

      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect(a, b) {
      },

      showMenu(i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      }
    }

  }
</script>
