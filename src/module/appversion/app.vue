<template>
  <div>

    <div class="btn-group-wrapper bottom">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
      </el-button-group>
    </div>

    <el-table ref="appTable" :data="getSysApps" height="300" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler" current-row-key="id"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="appId" label="App ID" width="100"/>
      <el-table-column prop="appName" label="App Name" width="150"/>
      <el-table-column prop="appType" label="App Type" :formatter="formatterAppTypeHandler" width="150"/>
      <el-table-column prop="appCode" label="App Code" width="150"/>
      <el-table-column prop="appSecret" label="App Secret"/>
      <el-table-column prop="state" label="State" :formatter="formatterStateHandler" width="80"/>
    </el-table>

    <app-form ref="appForm" :mode="formMode" :param="currentRecord"/>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex';

  import moduleStore from './bll/appStore';
  import store from '../../store';
  (!store.state.sysApp) && store.registerModule('sysApp', moduleStore);

  import AppForm from './appForm.vue';

  export default{
    data() {
      return {
        formMode: null,
        currentRecord: null
      };
    },
    computed: {
      ...mapGetters(['getSysApps'])
    },

    components: {AppForm},
    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions(['querySysApps', 'deleteSysApp']),

      initPage() {
        console.log('[App Page] mounted');
        this.querySysApps();
      },
      addHandler() {
        this.currentRecord = null;

        // hack table again
        let selectedRow = this.$refs.appTable.$el.querySelector('.current-row');
        if (selectedRow && selectedRow.classList) {
          selectedRow.classList.remove('current-row');
        }
        this.formMode = 'ADD';
        this.$refs.appForm.enable();
        this.$refs.appForm.clear();
      },

      editHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$refs.appForm.enable();
        this.formMode = 'EDIT';
      },

      delHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }

        this._deleteApp(this.currentRecord.appId);
      },

      tableRowChangeClickHandler (currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRecord = currentRow;
        this.$refs.appForm.disable();
      },

      enableHandler () {
        console.log('enable');
        this.$message.warning('this function is building...');

      },

      formatterAppTypeHandler(row, column) {
        switch (column.property) {
          case 'appType':
            switch (row.appType) {
              case 1:
                return 'Android';
              case 2:
                return 'IOS';
              case 3:
                return 'Win Phone';
              case 4:
                return 'Web';
            }
            break;
        }
        return 'Unkown key';
      },
      formatterStateHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 'A' ? 'Yes' : 'Discard';
        }
      },

      _deleteApp(appId) {
        this.$confirm('Are you sure to delete this record?', {
          type: 'warning'
        }).then(() => {
          this.deleteSysApp({appId}).then(data => {
            this.$message.success('Succeed in deleting app record.');
            this.currentRecord = null;
            this.$refs.appForm.clear();
          });
        });
      }

    }
  };
</script>
