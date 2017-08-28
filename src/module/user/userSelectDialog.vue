<template>
  <div>
    <el-dialog ref="dialog" title="Please Select User"
               v-model="dialogVisible"
               @close="closeDialogHandler">
      <el-table ref="userTable" :data="getSysUsers" height="320"
                border :stripe="true" :highlight-current-row="true"
                @current-change="tableRowClickHandler"
                style="width: 100%">
        <el-table-column prop="userName" label="User Name" width="180"/>
        <el-table-column prop="userCode" label="User Code" width="180"/>
        <el-table-column prop="memo" label="Description"/>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="getSysUserTotalCount">
      </el-pagination>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHandler">Cancel</el-button>
        <el-button type="primary" @click="okHandler">OK</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex';

  import moduleStore from './bll/userStore';
  import store from '../../store';
  (!store.state.sysUser) && store.registerModule('sysUser', moduleStore);

  export default{
    data() {
      return {
        dialogVisible: false,
        currentPage: 1,
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
      ...mapGetters(['getSysUsers', 'getSysUserTotalCount'])
    },
    mounted() {
      console.log('[User Select Dialog] mounted');
    },

    methods: {
      ...mapActions(['queryUsers', 'queryUsersCount', 'deleteUser']),

      tableRowClickHandler (row, event, column) {
        console.log(row);
        this.currentSelectedRecord = row;
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
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
      },

      closeDialogHandler() {
        console.log('close user dialog');
      },

      cancelHandler() {
        this.dialogVisible = false;
      },

      okHandler() {
        console.log('dialog ok handler');
        this.dialogVisible = false;
        if (this.currentSelectedRecord) {
          this.closeHandler && this.closeHandler(this.currentSelectedRecord);
        }
      },

      // interface for invoking
      open() {
        this.dialogVisible = true;
        this.currentPage = 1;
        this.queryUsers();
        this.queryUsersCount();

        if (this.currentSelectedRecord) {
          this.$nextTick(() => {
            //this.$refs.userTable.clearSelection();
            this.$refs.userTable.toggleRowSelection(this.currentSelectedRecord, false);
          });
        }
      },
      close() {
        this.dialogVisible = false;
      }

    }
  };
</script>
