<template>
  <div>
    <el-table :data="dataList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="id" label="任务ID" width="150"/>
      <el-table-column prop="name" label="名称" width="200" :show-overflow-tooltip="true"/>
      <el-table-column prop="taskDefinitionKey" label="编码" width="160" :show-overflow-tooltip="true"/>
      <el-table-column prop="priority" label="优先级"/>
      <el-table-column prop="createTime" label="创建时间" :formatter="formatterHandler"/>
      <el-table-column inline-template :context="_self" label="操作" width="200" fixed="right">
      <span>
        <el-button type="danger" size="small" @click="dealWithTaskHandler($index,row)">办理</el-button>
        <el-button type="primary" size="small" @click="transferUserDialog($index,row)">转办</el-button>
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

    <el-dialog title="转办" v-model="dialogVisible">

      <el-form :model="form">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="userCode" label="新处理人" label-width="100">
              <el-input v-model="form.userCode" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferUserHandler">确 定</el-button>
      </div>
    </el-dialog>
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
        pageSize: 10,
        currentSelectedRecord: null,
        dialogVisible: false,
        form: {
          taskId: null,
          userCode: 'shipengyan'
        }
      }
    },
    computed: {
      dataList() {
        return this.$store.state.sysBpmn.myTasks;
      },
      totalCount() {
        return this.$store.state.sysBpmn.myTasksCount;
      }
    },
    mounted() {
      console.log('[BPMN My Task Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryMyTasks', 'queryMyTasksCount', 'queryDiagramUrl', 'transferUser']),

      initPage() {
        this.queryMyTasks();
        this.queryMyTasksCount();
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
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
        this.queryMyTasks({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.queryMyTasks({pageIndex: val, pageSize: this.pageSize});
      },


      dealWithTaskHandler(index, row) {
        console.log(row, row.formKey);
        this.$router.push({
          path: row.formKey,
          query: {pid: row.processInstanceId, _uncheck: true}
        })
      },
      /**
       * 转办用户
       * @param index
       * @param row
       */
      transferUserDialog(index, row) {
        console.log(index, row);
        this.dialogVisible = true;
        this.form.taskId = row.id;
      },

      transferUserHandler() {
        const userCode = this.form.userCode;
        if (userCode && userCode.trim().length) {
          this.transferUser(this.form).then(() => {
            this.dialogVisible = false;
            this.$message('转办成功！');
          });
        } else {
          this.$messge('请输入新办理人');
        }
      }
    }
  }
</script>

