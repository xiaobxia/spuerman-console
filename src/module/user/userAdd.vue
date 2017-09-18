<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="110px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="User Code" prop="userCode">
            <el-input v-model="form.userCode" :disabled="pageModel==='EDIT'"/>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="User Name" prop="userName">
            <el-input v-model="form.userName"/>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="Mobile" prop="mobile">
            <el-input v-model="form.mobile"/>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="IsLocked" prop="isLocked">
            <el-select v-model="form.isLocked" placeholder="Is Locked or not">
              <el-option label="No" value="N"/>
              <el-option label="Yes" value="Y"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="Effect Date" prop="userEffDate">
            <el-date-picker type="datetime" placeholder="Please select effect date"
                            v-model="form.userEffDate" style="width:100%"/>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="Expired Date" prop="userExpDate">
            <el-date-picker type="datetime" placeholder="Please select expired date"
                            v-model="form.userExpDate" style="width: 100%;"/>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="Force Login" prop="forceLogin">
            <el-select v-model="form.forceLogin" placeholder="Force Login or not">
              <el-option label="No" value="N"/>
              <el-option label="Yes" value="Y"/>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="User Src" prop="userSrc">
            <el-select v-model="form.userSrc" placeholder="User Source">
              <el-option label="DB" :value="0"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item label="Description" prop="memo">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Input Description"
                    v-model="form.memo">
          </el-input>
        </el-form-item>
      </el-row>

      <el-form-item>
        <el-button type="info" @click="saveHandler">Save</el-button>
        <el-button type="danger" @click="resetHandler">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/babel">

  import { mapActions } from 'vuex';
  import assignDeep from 'assign-deep';
  import dateUtil from 'superUtil/dateUtil';

  import moduleStore from './bll/userStore';
  import store from '../../store';
  (!store.state.sysUser) && store.registerModule('sysUser', moduleStore);

  export default{
    data() {
      return {
        pageModel: 'ADD',
        form: {
          userId: null,
          userCode: '',
          userName: '',
          mobile: '',
          isLocked: 'N',
          userEffDate: new Date(),
          userExpDate: '',
          forceLogin: 'Y',
          userSrc: 0,
          memo: ''
        },
        rules: {
          userCode: [
            {required: true, message: 'This field is required.', trigger: 'change'},
            {min: 4, message: '至少4个字符', trigger: 'change'}
          ],
          userName: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          mobile: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          effDate: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          memo: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ]
        }
      };
    },

    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions('sysUser', ['saveUser', 'queryUser', 'updateUser']),
      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            let userInfo = assignDeep({}, self.form);

            if (userInfo.userEffDate) {
              if (typeof userInfo.userEffDate === 'object') {
                userInfo.userEffDate = dateUtil.formatToDayTime(userInfo.userEffDate);
              }
            } else {
              delete userInfo.userEffDate;
            }

            if (userInfo.userExpDate) {
              if (typeof userInfo.userExpDate === 'object') {
                userInfo.userExpDate = dateUtil.formatToDayTime(userInfo.userExpDate);
              }
            } else {
              delete userInfo.userExpDate;
            }

            self[self.pageModel === 'ADD' ? 'saveUser' : 'updateUser'](userInfo).then(function () {
              if (self.pageModel === 'ADD') {
                self.$confirm('Succeed in adding user.', 'Information', {
                  confirmButtonText: 'Continue to Add',
                  cancelButtonText: 'Back to List',
                  type: 'info'
                }).then(() => {
                  self.resetHandler();
                }).catch(() => {
                  self.$router.push('/user/index');
                });
              } else {

                self.$alert('Succeed in update user info.', 'Information', {
                  confirmButtonText: 'OK'
                });

              }

            });
          } else {
            this.$message({
              showClose: true,
              message: 'Please check this form information.',
              type: 'error'
            });

            return false;
          }
        });
      },

      resetHandler() {
        this.$refs.form.resetFields();
      },


      initPage() {
        console.log(this.$route);

        if (this.$route.query) {
          const userId = this.$route.query.userId;
          if (userId) {
            this.pageModel = 'EDIT';
            this.queryUser({userId}).then(user => {
              console.log(user);
              this.form = user; //TODO 不是很优雅
            });
          }
        }

      }
    }
  };
</script>
