<!-- Created by shi.pengyan on 2017-01-10. -->
<template>
  <el-dialog ref="dialog" :title="$tc('CHANGE_PWD')" v-model="dialogVisible">

    <el-form :model="form" :rules="rule" ref="form" label-width="200px">
      <el-form-item :label="$t('ORIGIN_PWD')" prop="oldPwd">
        <el-input type="password" v-model="form.oldPwd" :autofocus="true" auto-complete="off"/>
      </el-form-item>
      <el-form-item :label="$t('NEW_PWD')" prop="newPwd">
        <el-input type="password" v-model="form.newPwd" :minlength="6" :maxlength="20" auto-complete="off"/>
      </el-form-item>
      <el-form-item :label="$t('CONFIRM_NEW_PWD')" prop="newPwd2">
        <el-input type="password" v-model="form.newPwd2" :minlength="6" :maxlength="20" auto-complete="off"/>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="_submitHandler">{{$t('SUBMIT')}}</el-button>
        <el-button @click="_resetHandler">{{$t('RESET')}}</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  export default{
    data() {

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input new password.'));
        } else {
          if (this.form.newPwd2 !== '') {
            this.$refs.form.validateField('newPwd2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input confirm pasword'));
        } else if (value !== this.form.newPwd) {
          callback(new Error('The two passwords are not the same, please check!'));
        } else {
          callback();
        }
      };

      return {
        form: {
          oldPwd: null,
          newPwd: null,
          newPwd2: null
        },
        rule: {
          oldPwd: [
            {required: true, message: 'This field is required.'}
          ],
          newPwd: [
            {required: true, message: 'This field is required.'},
            {min: 6, max: 20, message: 'The length should in 6-20 letters.', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          newPwd2: [
            {required: true, message: 'This field is required.'},
            {min: 6, max: 20, message: 'The length should in 6-20 letters.', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        dialogVisible: false
      }
    },
    methods: {
      ...mapActions(['changePwd']),
      _submitHandler() {
        let self = this;
        this.$refs.form.validate((valid) => {
          if (valid) {
            const {oldPwd, newPwd} = this.form;

            self.changePwd({oldPwd, newPwd}).then(() => {
              self.$alert('Succeed in changing your password. You will logout and login with your new password.', 'Information', {
                confirmButtonText: 'OK',
                callback: action => {
                  self.$router.push('/');
                }
              });
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

      _resetHandler() {
        this.$refs.form.resetFields();
      },

      //interface
      open() {
        this.dialogVisible = true;
      },
      close() {
        this.dialogVisible = false;
      }
    }
  }
</script>
