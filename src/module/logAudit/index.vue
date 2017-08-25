<template>
  <div>
    <el-table :data="getSysLogAudits" height="500" border :stripe="true" :highlight-current-row="true"
              current-row-key="id"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="logType" label="Log Type" width="200"/>
      <el-table-column prop="userName" label="User Name" width="200"/>
      <el-table-column prop="createDate" label="Create Date" width="200"/>
      <el-table-column prop="description" label="Description"/>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getSysLogAuditTotalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'

  import moduleStore from './bll/logAuditStore'
  import store from '../../store'
  (!store.state.sysLogAudit) && store.registerModule('sysLogAudit', moduleStore)

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
      ...mapGetters(['getSysLogAudits', 'getSysLogAuditTotalCount'])
    },

    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions(['querySysLogAudits', 'querySysLogAuditsCount']),

      initPage() {
        console.log('[LogAudit Page] mounted');
        this.querySysLogAudits();
        this.querySysLogAuditsCount();
      },

      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.querySysLogAudits({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        this.querySysLogAudits({pageIndex: val, pageSize: this.pageSize});
      }
    }
  }
</script>
