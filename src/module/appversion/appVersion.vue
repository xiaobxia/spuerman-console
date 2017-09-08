<template>
  <div>
    <div class="btn-group-wrapper bottom">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
      </el-button-group>
    </div>

    <el-table ref="versionTable" :data="getSysVersions" height="300" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler" current-row-key="id"
              style="width: 100%">
      <el-table-column prop="appName" label="App Name" width="150"/>
      <el-table-column prop="versionNumber" label="Version Number" width="180"/>
      <el-table-column prop="downloadPath" label="Download Path"/>
      <el-table-column prop="versionDesc" label="Description"/>
      <el-table-column prop="createDate" label="Create Date"/>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="getSysVersionCurrentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getSysVersionTotalCount">
      </el-pagination>
    </div>

    <app-version-form ref="versionForm" :mode="formMode" :param="currentRecord"/>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex';

  import version from './bll/versionStore';
  import store from '../../store';
  (!store.state.sysVersion) && store.registerModule('sysVersion', version);

  import AppVersionForm from './appVersionForm.vue';

  export default{
    name: 'APP_VERSION_MGR',
    data() {
      return {
        formMode: null,
        currentRecord: null
      };
    },
    computed: {
      ...mapGetters('sysVersion', [
        'getSysVersionCurrentPage',
        'getSysVersionTotalCount'
      ]),
      getSysVersions() {
        return this.$store.state.sysVersion.versions;
      }
    },
    components: {AppVersionForm},
    mounted () {
      console.log('version page mounted');
      this.initPage();
    },
    methods: {
      ...mapActions('sysVersion', ['queryVersions', 'queryVersionsCount', 'deleteVersion']),
      initPage () {
        this.queryVersions();
        this.queryVersionsCount();
      },
      addHandler () {
        this.currentRecord = null;

        // hack table again
        let selectedRow = this.$refs.versionTable.$el.querySelector('.current-row');
        if (selectedRow && selectedRow.classList) {
          selectedRow.classList.remove('current-row');
        }
        this.formMode = 'ADD';
        this.$refs.versionForm.enable();
        this.$refs.versionForm.clear();
      },
      editHandler () {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$refs.versionForm.enable();
        this.formMode = 'EDIT';
      },
      delHandler () {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }

        this._deleteRecord(this.currentRecord.versionId);
      },

      tableRowChangeClickHandler (currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRecord = currentRow;
        this.$refs.versionForm.disable();
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryVersions(1, val);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.queryVersions(val);
      },
      _deleteRecord(versionId) {
        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteVersion({versionId}).then(data => {
            this.$message.success('Succeed in deleting app record.');
            this.currentRecord = null;
            this.$refs.versionForm.clear();
          });
        });
      }
    }
  };
</script>
