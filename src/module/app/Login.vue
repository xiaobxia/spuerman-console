<template>
  <div class="login-wrapper">
    <!--<div id="particles-js" style="position:absolute;left:0;top:0;right:0;bottom:0;"></div>-->

    <header id="header">
      <div>
        <span class="app-name">{{$t('PRODUCT_BRAND')}}</span>
      </div>
    </header>

    <div id="login-main">
      <div id="content" class="container">
        <el-row>
          <el-col :offset="1" :span="14">
            <div class="grid-content bg-purple login-header">
              <h1 class="login-header-big">{{$t('APP_NAME')}}</h1>
              <div>
                <h4 class="watchword">{{$t('APP_SLOGAN')}}</h4>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple login-form-wrapper">
              <div class="login-form-header">{{$t('SIGN_IN')}}</div>

              <el-form ref="form" :model="form" :rules="rules" label-position="top" class="login-form">
                <el-form-item :label="$t('USERNAME')" prop="userCode">
                  <el-input ref="userCodeEl" type="text" v-model="form.userCode"
                            @keyup.enter.native="loginHandler"
                            :placeholder="$t('USER_ID_PLACEHOLDER')"
                            auto-complete="off">
                    <template slot="prepend"><i class="fa fa-user-o fa-fw"></i></template>
                  </el-input>

                </el-form-item>

                <el-form-item :label="$t('PWD')" prop="pwd">
                  <el-input ref="pwdEl" type="password" v-model="form.pwd" :placeholder="$t('PWD_PLACEHOLDER')"
                            :minlength="6"
                            @keyup.enter.native="loginHandler"
                            auto-complete="off">
                    <template slot="prepend"><i class="fa fa-key fa-fw"></i></template>
                  </el-input>
                </el-form-item>

                <el-form-item style="margin-top:20px;text-align:right;">
                  <el-button type="primary" @click="loginHandler" :loading="btnLoginDisabled">{{$t('LOGIN')}}
                  </el-button>
                  <el-button @click="resetHandler">{{$t('RESET')}}</el-button>
                </el-form-item>

              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <footer class="ui-footer">
      <p class="ui-footer-copyright">
        <a rel="nofollow" href="https://www.cd121.com">©2016 Codi All rights reserved.</a>
      </p>
    </footer>
  </div>
</template>

<style lang="scss">
  .login-wrapper {
    position: relative;
    $header-height: 71px;
    #header {
      margin: 0;
      height: $header-height;
      border-bottom: 1px solid #eee !important;
      overflow: hidden;
      padding: 0 30px;
      border-width: 0;
      min-height: 28px;
      background: #f4f4f4 !important;

      .app-name {
        height: $header-height;
        line-height: $header-height;
        font-size: 30px;
        font-weight: bold;
        font-family: "Inconsolata", "Consolas", "Monaco";
      }
    }

    #login-main {
      padding-top: 20px;
      padding-bottom: 52px;
      min-height: 500px;
      position: relative;
      background-color: white;
    }

    #login-content {
      margin-left: auto;
      margin-right: auto;
      padding: 10px 14px;
      position: relative;
    }

    .login-header-big {
      font-weight: 400;
      color: #a90329 !important;

      letter-spacing: -1px;
      font-size: 24px;
      margin: 10px 0;
    }

    .watchword {
      color: #565656;
      font-size: 15px;
      font-weight: 400;
      line-height: 22px;
      margin-top: 15px;
    }

    .login-form-wrapper {
      background-color: #fbfbfb;
      border: 1px solid #ddd;
      box-shadow: 0 1px 1px #ececec;
      -webkit-box-shadow: 0 1px 1px #ececec;
      .login-form {
        padding: 10px 15px;
      }
    }
    .login-form-header {
      padding: 15px 13px;
      margin: 0;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      background: rgba(248, 248, 248, .9);
    }
  }

  .ui-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #F2F3F7;
    p {
      padding: 0 16px;
      margin: 0 auto 6px !important;
      text-align: center;
      a {
        color: #999 !important;
      }
    }
  }
</style>

<script type="text/babel">
  import { mapActions } from 'vuex'

  export default{
    name: 'LOGIN',
    data() {
      return {
        btnLoginDisabled: false,
        btnResetDisabled: false,

        form: {
          userCode: localStorage.getItem('userCode') || '',
          pwd: ''
        },
        rules: {
          userCode: [
            {required: true, message: this.$t('FIELD_REQUIRED'), trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: this.$t('FIELD_REQUIRED'), trigger: 'blur'},
            {min: 4, max: 20, message: this.$t('PWD_CHECK_ERROR'), trigger: 'blur'}
          ]
        }
      };
    },

    mounted() {
      //console.log('login mounted');
      //window.particlesJS('particles-js', 'static/particles.json');
      if (!this.form.userCode) {
        this.$refs.userCodeEl.$el.querySelector('input').focus();
        return;
      }
      if (!this.form.pwd) {
        this.$refs.pwdEl.$el.querySelector('input').focus();
        return;
      }
    },
    methods: {
      ...mapActions(['login']),
      loginHandler () {
        _czc.push(['_trackEvent', 'page', 'login']);

        if (!this.form.userCode) {
          this.$refs.userCodeEl.$el.querySelector('input').focus();
          return;
        }
        if (!this.form.pwd) {
          this.$refs.pwdEl.$el.querySelector('input').focus();
          return;
        }

        this.$refs.form.validate((valid) => {
          if (valid) {
            this.btnLoginDisabled = true;
            this.btnResetDisabled = true;

            let loginInfo = {
              userCode: this.form.userCode,
              pwd: this.form.pwd,
              clearUserInfo: false
            }

            this.login(loginInfo).then(() => {
              console.log('login Success');

              this.$router.push('/dashboard')

            }).then(() => {
              this._resetBtn()
            }, () => {
              this._resetBtn()
            })
          } else {
            this.$message({
              showClose: true,
              message: 'Please check this form information.',
              type: 'error'
            });
          }
        });

      },
      resetHandler () {
        this.$refs.form.resetFields();
      },
      _resetBtn () {
        console.log('reset btn');
        this.btnLoginDisabled = false;
        this.btnResetDisabled = false;
      }
    }
  }
</script>
