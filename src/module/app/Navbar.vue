<template>
  <div>
    <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
      <div class="nav-left">
        <a class="nav-item is-hidden-tablet" @click="$store.dispatch('TOGGLE_SIDEBAR')">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </a>
        <span class="app-name">SuperMan Console</span>
      </div>
      <div class="nav-right is-flex">
          <span class="btn-refresh header-btn" @click="refreshHandler">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </span>
        <el-dropdown @command="dropdownHandler">
            <span class="el-dropdown-link">
              <i class="fa fa-user-circle fa-2x icon-user"></i>
              {{this.$store.state.loginUser.userName}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown" class="dropdown-menu">
            <el-dropdown-item command="profile"><i class="el-icon-edit"/>{{$t('PROFILE')}}</el-dropdown-item>
            <el-dropdown-item command="setting"><i class=" el-icon-setting"/>{{$t('SETTING')}}</el-dropdown-item>
            <el-dropdown-item command="changePwd"><i class=" el-icon-edit"/>{{$t('CHANGE_PWD')}}</el-dropdown-item>
            <el-dropdown-item command="about"><i class="el-icon-information"/>{{$t('ABOUT')}}</el-dropdown-item>
            <el-dropdown-item command="logout" divided><i class="el-icon-information"/>{{$t('LOGOUT')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </section>
    <change-pwd ref="changePwdDialog"/>
  </div>
</template>

<script type="text/babel">
  import {mapActions} from 'vuex';
  import changePwd from './changePwd.vue';
  export default {
    name: 'NAVBAR',
    props: {
      show: Boolean
    },

    data () {
      return {};
    },

    components: {changePwd},
    methods: {
      ...mapActions(['logout']),
      refreshHandler() {
        //hack vue-router
        if (this.$route.matched && this.$route.matched.length) {
          let firstMatch = this.$route.matched[0];
          if (firstMatch.instances && firstMatch.instances.default) {
            let currentModule = firstMatch.instances.default;
            if (currentModule.initPage) {
              try {
                currentModule.initPage();
              } catch (e) {
                console.log('invoke initPage error, please check.', e);
              }
            } else {
              console.log('no initPage in Vue Component, please check.');
            }
          } else {
            console.warn('firstMatch.instance.default is null');
          }
        } else {
          console.warn('this.$route.matched is null');
        }
      },
      dropdownHandler(cmd, component) {
        console.log('dropdownHandler ', cmd);
        this[cmd + 'Handler']();
      },

      profileHandler() {
        this.$message(this.$t('FUNCTION_IS_COMING'));
      },
      settingHandler() {
        this.$message(this.$t('FUNCTION_IS_COMING'));
      },
      changePwdHandler() {
        this.$refs.changePwdDialog.open();
      },
      aboutHandler() {
        this.$alert(this.$t('APP_ABOUT'), this.$t('ABOUT'));
      },

      logoutHandler() {
        this.$confirm(this.$t('CONFIRM_LOGOUT'), {type: 'warning'}).then(() => {
          this.logout().then(() => {
            console.log('logout suc');
            this.$router.push('/');
          });
        });
      }
    }
  };
</script>
