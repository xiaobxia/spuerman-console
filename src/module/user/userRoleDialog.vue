<template>
  <div>
    <el-dialog ref="dialog" title="User Role List"
               v-model="dialogVisible"
               @close="closeDialogHandler">

      <el-table :data="userRoleList" height="300"
                border :stripe="true" :highlight-current-row="true" style="width: 100%">
        <el-table-column prop="roleName" label="Role Name" width="130"/>
        <el-table-column prop="roleCode" label="Role Code" width="200"/>
        <el-table-column prop="description" label="Description"/>
      </el-table>


      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="okHandler">OK</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex';

  import moduleStore from './bll/userStore';
  import store from '../../store';
  (!store.state.sysUser) && store.registerModule('sysUser', moduleStore);

  export default{
    data() {
      return {
        dialogVisible: false,
        pageSize: 10,
        currentSelectedRecord: null
      };
    },
    props: {
      closeHandler: {
        type: Function
      }
    },
    computed: {
      userRoleList() {
        return this.$store.state.sysUser.userRoleList;
      }
    },
    mounted() {
      console.log('[UserRole Dialog] mounted');
    },

    methods: {
      ...mapActions('sysUser', ['queryUserRoleList']),

      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 'A' ? 'Yes' : 'Discard';
        }
      },
      closeDialogHandler() {
        console.log('close user dialog');
      },

      okHandler() {
        console.log('dialog ok handler');
        this.dialogVisible = false;
      },

      // interface for invoking
      open(userId) {
        this.queryUserRoleList({userId});
        this.dialogVisible = true;
      },
      close() {
        this.dialogVisible = false;
      }

    }
  };
</script>
