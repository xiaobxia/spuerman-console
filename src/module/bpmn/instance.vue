<template>
  <div>
    <el-table :data="dataList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="processInstanceId" label="PID" width="150"/>
      <el-table-column prop="processDefinitionId" label="流程定义ID"/>
      <el-table-column prop="processDefinitionName" label="流程定义名称"/>
      <el-table-column prop="businessKey" label="业务主键"/>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/bpmnStore'
  import store from '../../store'
  (!store.state.sysBpmn) && store.registerModule('sysBpmn', moduleStore)

  import dateUtil from '../../util/dateUtil';

  export default{
    data() {
      return {
        currentPage: 1,
        pageSize: 10
      }
    },
    computed: {
      dataList() {
        return this.$store.state.sysBpmn.processIntances;
      },
      totalCount() {
        return this.$store.state.sysBpmn.processIntancesCount;
      }
    },
    mounted() {
      console.log('[ProcessInstance Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryProcessInstancesCount', 'queryProcessInstances']),

      initPage() {
        this.queryProcessInstancesCount();
        this.queryProcessInstances({pageIndex: 1, pageSize: this.pageSize});
      },
      formatterHandler (row, column) {
        switch (column.property) {
          case 'createTime':
            if (row.createTime) {
              return dateUtil.format(row.createTime);
            }

            break;
        }
      },

      tableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.currentSelectedRecord = row;
      },

      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.queryProcessInstances({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.queryProcessInstances({pageIndex: val, pageSize: this.pageSize});
      }
    }
  }
</script>
