<!-- Created by shi.pengyan on 2017-01-05. -->
<template>
  <div>
    <div class="btn-group-wrapper bottom">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" @click="changeStateHandler">Enable/Disable</el-button>
        <el-button type="primary" @click="changeStateHandler">Pause</el-button>
        <el-button type="primary" @click="changeStateHandler">Resume</el-button>
        <el-button type="primary" @click="changeStateHandler">Stop</el-button>
        <el-button type="primary" @click="changeStateHandler">Execute</el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="danger" @click="changeStateHandler">Start</el-button>
        <el-button type="danger" @click="changeStateHandler">Shutdown</el-button>
      </el-button-group>
    </div>

    <el-table ref="jobTable" :data="getSysJobs" height="300" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler" current-row-key="id"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="jobName" label="Job Name" width="200"/>
      <el-table-column prop="jobGroup" label="Job Group" width="200"/>
      <el-table-column prop="clazz" label="clazz" width="250"/>
      <el-table-column prop="cron" label="Cron Expression" width="200"/>
      <el-table-column prop="description" label="Description"/>
      <el-table-column inline-template :context="_self" label="Operation" width="100">
      <span>
        <el-button type="danger" size="small" @click="delInGridHandler($index,row)">Delete</el-button>
      </span>
      </el-table-column>
    </el-table>


    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getSysJobTotalCount">
      </el-pagination>
    </div>

    <jobservice-form ref="jobForm" :mode="formMode" :param="currentRecord"/>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'

  import moduleStore from './bll/store'
  import store from '../../store'
  (!store.state.sysJobService) && store.registerModule('sysJobService', moduleStore)

  import JobserviceForm from './jobserviceForm.vue'

  export default{
    data() {
      return {
        formMode: null,
        currentPage: 1,
        pageSize: 10,
        currentRecord: null
      }
    },
    computed: {
      ...mapGetters(['getSysJobs', 'getSysJobTotalCount'])
    },

    components: {JobserviceForm},
    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions(['querySysJobs', 'querySysJobsCount', 'deleteSysJob']),

      initPage() {
        console.log('[Job Page] mounted');
        this.currentPage = 1;
        //this.querySysJobs();
        //this.querySysJobsCount();
      },
      addHandler() {
        this.currentRecord = null;

        // hack table again
        let selectedRow = this.$refs.jobTable.$el.querySelector('.current-row');
        if (selectedRow && selectedRow.classList) {
          selectedRow.classList.remove('current-row');
        }
        this.formMode = 'ADD';
        this.$refs.jobForm.enable();
        this.$refs.jobForm.clear();
      },

      editHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$refs.jobForm.enable();
        this.formMode = 'EDIT';
      },

      delHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }

        this._deleteJob(this.currentRecord.id)
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
      },

      tableRowChangeClickHandler (currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRecord = currentRow;
        this.$refs.jobForm.disable();
      },
      enableHandler () {
        console.log('enable');
        this.$message.warning('this function is building...');

      },
      delInGridHandler (index, row) {
        console.log('del user', arguments);
        this._deleteJob(row.id);
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.querySysJobs({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        this.querySysJobs({pageIndex: val, pageSize: this.pageSize});
      },
      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 'A' ? 'Yes' : 'Discard';
        }
      },

      _deleteJob(jobId) {
        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteSysJob({jobId}).then(data => {
            this.$message.success('Succeed in deleting job record.');
            this.currentRecord = null;
            this.$refs.jobForm.clear();
          });
        });
      }

    }
  }
</script>

