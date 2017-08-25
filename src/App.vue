<template>
  <div id="app">
    <template v-if="userHasLogin">
      <nprogress-container></nprogress-container>
      <navbar :show="true"></navbar>
      <sidebar :show="config.sidebar"></sidebar>
      <app-main :open-all="!config.sidebar"></app-main>
      <login-dialog></login-dialog>
    </template>
    <template v-else>
      <nprogress-container></nprogress-container>
      <login></login>
    </template>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex'
  import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
  import { Navbar, Sidebar, AppMain, Login, LoginDialog } from './module/app'
  export default {
    name: 'APP',
    data () {
      return {
        eventBus: new Vue()
      }
    },
    computed: {
      config () {
        return this.$store.state.config
      },
      userHasLogin () {
        return this.$store.state.loginUser != null;
      },
      ...mapState({'fullscreenLoading': 'globalLoading'})
    },
    components: {
      Navbar,
      Sidebar,
      AppMain,
      NprogressContainer,
      Login,
      LoginDialog
    },
    mounted () {
      this.checkLogin();
    },
    methods: {
      ...mapActions(['checkLogin'])
    }
  }
</script>
