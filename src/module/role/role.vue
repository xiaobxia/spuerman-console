<template>
  <div>
    <el-row :gutter="2">
      <!-- Role List -->
      <el-col :span="10">
        <el-card class="box-card" :body-style="{padding:'5px'}">
          <div class="clearfix" style="padding:5px;">
            <span style="line-height: 36px;">Role List</span>
            <div class="btn-group-wrapper bottom right">
              <el-button-group>
                <el-button type="primary" icon="plus" @click="addSysRoleHandler"/>
                <el-button type="primary" icon="edit" @click="editSysRoleHandler"/>
                <el-button type="primary" icon="delete" @click="delSysRoleHandler"/>
              </el-button-group>
              <el-button-group>
                <el-button type="primary" @click="changeStateHandler">Enable/Disable</el-button>
              </el-button-group>
            </div>
          </div>
          <el-table :data="getSysRoles" height="610"
                    @current-change="roleListRowClickHandler"
                    border :stripe="true" :highlight-current-row="true" style="width: 100%">
            <el-table-column prop="roleName" label="Role Name" width="130"/>
            <el-table-column prop="roleCode" label="Role Code" width="200"/>
            <el-table-column prop="description" label="Description"/>
          </el-table>

          <div class="btn-group-wrapper">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="getSysRoleCurrentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, next"
              :total="getSysRoleTotalCount">
            </el-pagination>
          </div>
        </el-card>
      </el-col>

      <el-col :span="14">
        <!--User List-->
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" :body-style="{padding:'5px'}">
              <div class="clearfix" style="padding:5px;">
                <span style="line-height: 36px;">User List</span>
                <div class="btn-group-wrapper bottom right">
                  <el-button-group>
                    <el-button type="primary" icon="plus" @click="addUserRoleBtnHandler"/>
                    <el-button type="primary" icon="delete" @click="delUserRoleBtnHandler"/>
                  </el-button-group>
                </div>
              </div>

              <el-table ref="userTable" :data="getSysUserRoles" height="300"
                        @current-change="userListRowClickHandler"
                        border :stripe="true" :highlight-current-row="true"
                        style="width: 100%">
                <el-table-column prop="userName" label="User Name" width="180"/>
                <el-table-column prop="userCode" label="User Code" width="180"/>
                <el-table-column prop="memo" label="Description"/>
              </el-table>

            </el-card>
          </el-col>
        </el-row>

        <!--Priv List-->
        <el-row>
          <el-col :span="24">
            <el-card class="box-card" :body-style="{padding:'5px'}">
              <div class="clearfix" style="padding:5px;">
                <span style="line-height: 36px;">Priv List</span>
                <div class="btn-group-wrapper bottom right">
                  <el-button-group>
                    <el-button type="primary" icon="plus" @click="addRolePrivBtnHandler"/>
                    <el-button type="primary" icon="delete" @click="delRolePrivBtnHandler"/>
                  </el-button-group>
                </div>
              </div>

              <el-table :data="getSysRolePrivs" height="300"
                        @current-change="privListRowClickHandler"
                        border :stripe="true" :highlight-current-row="true"
                        style="width: 100%">
                <el-table-column prop="privName" label="Priv Name" width="180"/>
                <el-table-column prop="privCode" label="Priv Code" width="180"/>
                <el-table-column prop="type" label="Type" :formatter="privTypeFormatterHandler"/>
                <el-table-column prop="description" label="Description"/>
              </el-table>
            </el-card>
          </el-col>
        </el-row>

      </el-col>

    </el-row>

    <user-select-dialog ref="userDialog" :closeHandler="addUserRoleHandler"/>
    <priv-select-dialog ref="privDialog" :closeHandler="addRolePrivHandler"/>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'

  import moduleStore from './bll/roleStore'
  import store from '../../store'
  (!store.state.sysRole) && store.registerModule('sysRole', moduleStore)

  import UserSelectDialog from '../user/userSelectDialog.vue';
  import PrivSelectDialog from '../privilege/privSelectDialog.vue';


  export default {
    data() {
      return {
        pageSize: 10,
        currentSelectedRoleRecord: null,
        currentSelectedUserRecord: null,
        currentSelectedPrivRecord: null
      }
    },
    computed: {
      ...mapGetters([
        'getSysRoles', 'getSysRoleCurrentPage', 'getSysRoleTotalCount',
        'getSysUserRoles',
        'getSysRolePrivs'
      ])
    },

    components: {UserSelectDialog, PrivSelectDialog},

    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions([
        'querySysRolesCount', 'querySysRoles', 'deleteSysRole',
        'queryUserRolesCount', 'queryUserRoles', 'deleteUserRole', 'saveUserRole',
        'queryRolePrivsCount', 'queryRolePrivs', 'deleteRolePriv', 'saveRolePriv'
      ]),
      initPage() {
        this.querySysRoles(1, 10);
        this.querySysRolesCount();
      },

      addSysRoleHandler() {
        this.$router.push('/role/add');
      },
      editSysRoleHandler() {
        if (this.currentSelectedRoleRecord == null) {
          this.$message.warning('Please select one record.');
          return;
        }
        const roleId = this.currentSelectedRoleRecord.roleId;
        this.$router.push({path: '/role/add', query: {roleId}});

      },
      delSysRoleHandler() {
        if (!this.currentSelectedRoleRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        const roleId = this.currentSelectedRoleRecord.roleId;
        this.$confirm('Are you sure to delete this role?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteSysRole({roleId}).then(() => {
            this.$message.success('Succeed in deleting this role.');
            this.currentSelectedRoleRecord = null;
          });
        });

      },

      addUserRoleBtnHandler() {
        if (!this.currentSelectedRoleRecord) {
          this.$message.warning('Please select one record in Role List.');
          return;
        }

        this.$refs.userDialog.open();
      },
      delUserRoleBtnHandler() {

        if (!this.currentSelectedUserRecord) {
          this.$message.warning('Please select one record in User List.');
          return;
        }

        this.$confirm('Are you sure to delete this record?', 'warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteUserRole({
            userId: this.currentSelectedUserRecord.userId,
            roleId: this.currentSelectedRoleRecord.roleId
          }).then(() => {
            this.$message.success('Succeed in deleting user role.');
          });
        });

      },
      addUserRoleHandler (user) {
        console.log('selected user is ', user);

        const userRole = {userId: user.userId, roleId: this.currentSelectedRoleRecord.roleId};

        this.saveUserRole({userRole, user}).then(() => {
          this.$message.success('Succeed in adding user role.');
        });

      },
      addRolePrivBtnHandler() {
        if (!this.currentSelectedRoleRecord) {
          this.$message.warning('Please select one record in Role List.');
          return;
        }

        this.$refs.privDialog.open();
      },

      delRolePrivBtnHandler() {

        if (!this.currentSelectedPrivRecord) {
          this.$message.warning('Please select one record in Priv List.');
          return;
        }

        this.$confirm('Are you sure to delete this record?', 'warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteRolePriv({
            privId: this.currentSelectedPrivRecord.privId,
            roleId: this.currentSelectedRoleRecord.roleId
          }).then(() => {
            this.$message.success('Succeed in deleting role priv.');
          });
        });
      },

      addRolePrivHandler(priv) {
        console.log('selected priv is ', priv);
        const rolePriv = {roleId: this.currentSelectedRoleRecord.roleId, privId: priv.privId};

        this.saveRolePriv({rolePriv, priv}).then(() => {
          this.$message.success('Succeed in adding role priv.');
        });
      },

      changeStateHandler() {
        this.$message.warning('this function is building.')
      },

      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.querySysRoles({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(`current${val}`);
        this.querySysRoles({pageIndex: val, pageSize: this.pageSize});
      },

      roleListRowClickHandler(row, event, column) {
        console.log(row);
        if (row) {
          this.currentSelectedRoleRecord = row;

          this.queryUserRoles({roleId: row.roleId})
          this.queryRolePrivs({roleId: row.roleId})
        }
      },

      userListRowClickHandler(row, event, column) {
        this.currentSelectedUserRecord = row;
      },
      privListRowClickHandler(row, event, column) {
        this.currentSelectedPrivRecord = row;
      },


      privTypeFormatterHandler (row, column) {
        switch (column.property) {
          case 'type':
            switch (row.type) {
              case 0:
                return 'Directory';
              case 1:
                return 'Menu';
              case 2:
                return 'Data';
            }
            break;
        }
      }
    }
  }
</script>
