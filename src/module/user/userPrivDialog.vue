<template>
  <div>
    <el-dialog ref="dialog" title="User Privilege List"
               v-model="dialogVisible"
               @close="closeDialogHandler">

      <el-table :data="userPrivList" height="300"
                border :stripe="true" :highlight-current-row="true" style="width: 100%">
        <el-table-column prop="privName" label="Priv Name" width="180"/>
        <el-table-column prop="privCode" label="Priv Code" width="180"/>
        <el-table-column prop="type" label="Type" :formatter="privTypeFormatterHandler"/>
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
      userPrivList() {
        return this.$store.state.sysUser.userPrivList;
      }
    },
    mounted() {
      console.log('[User Priv Dialog] mounted');
    },

    methods: {
      ...mapActions(['queryUserPrivList']),

      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 'A' ? 'Yes' : 'Discard';
        }
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
        this.queryUserPrivList({userId});
        this.dialogVisible = true;
      },
      close() {
        this.dialogVisible = false;
      }

    }
  };
</script>
