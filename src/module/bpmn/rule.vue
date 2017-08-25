<template>
  <div>

    <div class="btn-group-wrapper">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
      </el-button-group>
    </div>

    <el-table :data="dataList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="deploymentId" label="部署ID" width="150"/>
      <el-table-column prop="name" label="名称" width="200" :show-overflow-tooltip="true"/>
      <el-table-column prop="key" label="编码" width="160" :show-overflow-tooltip="true"/>
      <el-table-column prop="resourceName" label="资源名称" :show-overflow-tooltip="true"/>
      <el-table-column prop="diagramResourceName" label="图片" :show-overflow-tooltip="true"/>
      <el-table-column prop="version" label="版本" width="50"/>
      <el-table-column inline-template :context="_self" label="操作" width="200" fixed="right">
      <span>
        <el-button type="info" size="small" @click="ruleHisHandler($index,row)">历史</el-button>
        <el-button type="info" size="small" @click="viewDiagramHandler($index,row)">流程图</el-button>
      </span>
      </el-table-column>
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

    <el-dialog title="流程图" v-model="dialogVisible" size="">
      <div>
        <img :src="imgUrl"/>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
  .btn-group-wrapper {
    padding-bottom: 4px;
  }
</style>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/bpmnStore'
  import store from '../../store'
  (!store.state.sysBpmn) && store.registerModule('sysBpmn', moduleStore)


  export default{
    data() {
      return {
        imgUrl: '',
        dialogVisible: false,
        pageSize: 10,
        currentSelectedRecord: null
      }
    },
    computed: {
      dataList() {
        return this.$store.state.sysBpmn.rules;
      },
      currentPage() {
        return this.$store.state.sysBpmn.currentPage;
      },
      totalCount() {
        return this.$store.state.sysBpmn.totalCount;
      }
    },
    mounted() {
      console.log('[BPMN Rule Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryRules', 'queryRulesCount', 'queryDiagramUrl', 'delRule']),

      initPage() {
        this.queryRules();
        this.queryRulesCount();
      },

      addHandler() {
        //TODO
        //this.$router.push('/priv/add');
      },

      editHandler() {
        //TODO
        //if (!this.currentSelectedRecord) {
        //  this.$message.warning('Please select one record.');
        //  return;
        //}
        //this.$router.push({path: '/priv/add', query: {privId: this.currentSelectedRecord.privId}})
      },

      delHandler() {
        //TODO

        if (!this.currentSelectedRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$confirm(this.$t('DEL_CONFIRM'), 'Confirm', {type: 'warning'}).then(() => {
          this.delRule({deploymentId: this.currentSelectedRecord.deploymentId}).then(data => {
            this.$message.success(this.$t('DEL_SUC'));
            this.currentSelectedRecord = null;
          });
        })
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
      },

      formatterHandler (row, column) {
        //switch (column.property) {
        //  case 'state':
        //    return row.state === 'A' ? 'Yes' : 'Discard';
        //  case 'type':
        //    return privUtil.formatPrivType(row.type);
        //}
      },

      tableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.currentSelectedRecord = row;
      },

      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.queryRules({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.queryRules({pageIndex: val, pageSize: this.pageSize});
      },
      ruleHisHandler(index, row) {

      },
      viewDiagramHandler(index, row) {
        if (row.diagramResourceName) {

          const {deploymentId, diagramResourceName} = row;
          this.queryDiagramUrl({deploymentId, diagramResourceName}).then(imgUrl => {
            this.imgUrl = imgUrl;
            this.$nextTick(() => {
              this.dialogVisible = true;
            });
          });

          return;
        }

        this.$message.warning('没有资源图片');

      }
    }
  }
</script>
