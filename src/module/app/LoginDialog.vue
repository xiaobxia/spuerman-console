<template>
  <div>
    <el-dialog :title="$t('SESSION_TIMEOUT')"
               v-model="getGlobalLoginDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               :lock-scroll="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('USERNAME')" prop="userCode">
          <el-input type="text" v-model="form.userCode"
                    @keyup.enter.native="loginHandler"
                    :placeholder="$t('USER_ID_PLACEHOLDER')"/>
        </el-form-item>

        <el-form-item :label="$t('PWD')" prop="pwd">
          <el-input type="password" v-model="form.pwd"
                    @keyup.enter.native="loginHandler"
                    :placeholder="$t('PWD_PLACEHOLDER')" auto-complete="off"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loginHandler" :loading="btnLoginDisabled">{{$t('LOGIN')}}</el-button>
        <el-button @click="resetHandler" :disabled="btnResetDisabled">{{$t('RESET')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import {mapActions, mapGetters} from 'vuex'

  export default{
    name: 'LoginDialog',
    data() {
      return {
        btnLoginDisabled: false,
        btnResetDisabled: false,
        form: {
          userCode: '',
          pwd: ''
        },
        rules: {
          userCode: [
            //{validator: validatePass, trigger: 'blur'}
            {required: true, message: this.$t('FIELD_REQUIRED'), trigger: 'blur'}
          ],
          pwd: [
            //{validator: validatePass2, trigger: 'blur'}
            {required: true, message: this.$t('FIELD_REQUIRED'), trigger: 'blur'},
            {min: 4, max: 20, message: 'The length should in 4-20 letters.', trigger: 'blur'}
          ]
        }
      }
    },
    computed: mapGetters(['getGlobalLoginDialog']),
    methods: {
      ...mapActions(['login', 'dismissGlobalLoginDialog']),
      loginHandler() {

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
              this.$refs.form.resetFields();
              this.$message({message: 'Login Successfully!', type: 'success'});
              this.dismissGlolbalLoginDialog()
            }).then(() => {
              this._resetBtn()
            }, () => {
              this._resetBtn()
            });
          } else {
            this.$message({
              showClose: true,
              message: 'Please check this form information.',
              type: 'error'
            });
          }
        });
      },
      resetHandler() {
        this.$refs.form.resetFields();
      },
      _resetBtn() {
        this.btnLoginDisabled = false;
        this.btnResetDisabled = false;
      }
    }
  }
</script>
