<template>
  <div>
    <div class="btn-group-wrapper">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" @click="changeLockStateHandler">Lock/UnLock</el-button>
        <el-button type="primary" @click="resetPwdHandler">Reset Pwd</el-button>
        <el-button type="primary" icon="document" @click="viewUserRoleHandler">User Role</el-button>
        <el-button type="primary" icon="document" @click="viewUserPrivHandler">User Priv</el-button>
      </el-button-group>
    </div>

    <el-table :data="getSysUsers" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="userName" label="User Name" width="150"/>
      <el-table-column prop="userCode" label="User Code" width="150"/>
      <el-table-column prop="mobile" label="Mobile" width="150"/>
      <el-table-column prop="userEffDate" label="Effect Date" width="160"/>
      <el-table-column prop="state" label="State" :formatter="formatterHandler" width="80"/>
      <el-table-column prop="stateDate" label="State Date" width="160"/>
      <el-table-column prop="isLocked" label="Is Locked" :formatter="formatterHandler" width="100"/>
      <el-table-column prop="createdDate" label="Create Date" width="160"/>
      <el-table-column prop=loginFail" label="Login Fail" width="50"/>
      <el-table-column prop="memo" label="Description" :min-width="200"/>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getSysUserTotalCount">
      </el-pagination>
    </div>
    <user-role-dialog ref="userRoleDialog"/>
    <user-priv-dialog ref="userPrivDialog"/>
  </div>
</template>

<style lang="scss">
  .btn-group-wrapper {
    padding-bottom: 4px;
  }
</style>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'

  import moduleStore from './bll/userStore'
  import store from '../../store'
  (!store.state.sysUser) && store.registerModule('sysUser', moduleStore)

  import UserRoleDialog from './userRoleDialog.vue'
  import UserPrivDialog from './userPrivDialog.vue'

  export default{
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        currentUser: null
      }
    },
    computed: {
      ...mapGetters(['getSysUsers', 'getSysUserTotalCount'])
    },
    components: {UserRoleDialog, UserPrivDialog},

    mounted() {
      console.log('[User Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryUsers', 'queryUsersCount', 'deleteUser', 'lockUser', 'unlockUser', 'resetPwd']),

      initPage() {
        this.currentPage = 1;
        this.queryUsers();
        this.queryUsersCount();
      },

      addHandler() {
        this.$router.push('/user/add');
      },

      editHandler() {
        if (!this.currentUser) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$router.push({path: '/user/add', query: {userId: this.currentUser.userId}})
      },

      delHandler() {
        if (!this.currentUser) {
          this.$message.warning('Please select one record.');
          return;
        }
        if (this.currentUser.state === 'X') {
          this.$message.warning('This user has been deleted.');
          return;
        }

        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteUser({userId: this.currentUser.userId}).then(data => {
            this.$message.success('Succeed in deleting user record.');
          });
        });
      },

      changeLockStateHandler () {
        if (!this.currentUser) {
          this.$message.warning('Please select one record.');
          return;
        }

        const isLocked = this.currentUser.isLocked === 'Y';

        let tip = 'Are you sure to lock this user?';
        let sucTip = 'Succeed in locking this user.';
        if (isLocked) {
          tip = 'Are you sure to unlock this user?'
          sucTip = 'Succeed in unlocking this user.';
        }

        this.$confirm(tip, 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this[isLocked ? 'unlockUser' : 'lockUser']({userId: this.currentUser.userId}).then(data => {
            this.$message.success(sucTip);
            this.currentUser.isLocked = isLocked ? 'N' : 'Y';
          });
        });

      },

      resetPwdHandler () {
        if (!this.currentUser) {
          this.$message.warning('Please select one record.');
          return;
        }

        this.$confirm('Are you sure to reset this user password?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.resetPwd({userId: this.currentUser.userId}).then(data => {
            this.$message.success('Succeed in reset user password.');
          });
        });
      },

      viewUserRoleHandler() {
        if (!this.currentUser) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$refs.userRoleDialog.open(this.currentUser.userId);
      },

      viewUserPrivHandler() {
        if (!this.currentUser) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$refs.userPrivDialog.open(this.currentUser.userId);
      },

      tableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.currentUser = row;
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.queryUsers({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);

        this.currentPage = val;
        this.queryUsers({pageIndex: val, pageSize: this.pageSize});
      },
      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 'A' ? 'Yes' : 'Discard';
          case 'isLocked':
            return row.isLocked === 'N' ? 'No' : 'Yes';
        }
      }
    }
  }
</script>
