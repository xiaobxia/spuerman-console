
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
      </el-button-group>
    </div>

    <el-table ref="paramTable" :data="getSysParams" height="300" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler" current-row-key="id"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="paramCode" label="Param Code" width="200"/>
      <el-table-column prop="paramValue" label="Param Value" width="200"/>
      <el-table-column prop="paramText" label="Param Text" width="200"/>
      <el-table-column prop="paramMoreValue" label="More Value"/>
      <el-table-column prop="state" label="State" :formatter="formatterHandler" width="80"/>
      <el-table-column prop="description" label="Description"/>
      <el-table-column inline-template :context="_self" label="操作" width="100">
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
        :total="getSysParamTotalCount">
      </el-pagination>
    </div>

    <param-form ref="paramForm" :mode="formMode" :param="currentRecord"/>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex';

  import moduleStore from './bll/paramStore';
  import store from '../../store';
  (!store.state.sysParam) && store.registerModule('sysParam', moduleStore);

  import ParamForm from './paramForm.vue';

  export default{
    data() {
      return {
        formMode: null,
        currentPage: 1,
        pageSize: 10,
        currentRecord: null
      };
    },
    computed: {
      ...mapGetters('sysParam', ['getSysParams', 'getSysParamTotalCount'])
    },

    components: {ParamForm},
    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions('sysParam', ['querySysParams', 'querySysParamsCount', 'deleteSysParam']),

      initPage() {
        console.log('[Param Page] mounted');
        this.currentPage = 1;
        this.querySysParams();
        this.querySysParamsCount();
      },
      addHandler() {
        this.currentRecord = null;

        // hack table again
        let selectedRow = this.$refs.paramTable.$el.querySelector('.current-row');
        if (selectedRow && selectedRow.classList) {
          selectedRow.classList.remove('current-row');
        }
        this.formMode = 'ADD';
        this.$refs.paramForm.enable();
        this.$refs.paramForm.clear();
      },

      editHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$refs.paramForm.enable();
        this.formMode = 'EDIT';
      },

      delHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }

        this._deleteParam(this.currentRecord.id);
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
      },

      tableRowChangeClickHandler (currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRecord = currentRow;
        this.$refs.paramForm.disable();
      },
      enableHandler () {
        console.log('enable');
        this.$message.warning('this function is building...');

      },
      delInGridHandler (index, row) {
        console.log('del user', arguments);
        this._deleteParam(row.id);
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.querySysParams({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        this.querySysParams({pageIndex: val, pageSize: this.pageSize});
      },
      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 'A' ? 'Yes' : 'Discard';
        }
      },

      _deleteParam(paramId) {
        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteSysParam({paramId}).then(data => {
            this.$message.success('Succeed in deleting param record.');
            this.currentRecord = null;
            this.$refs.paramForm.clear();
          });
        });
      }

    }
  };
</script>
