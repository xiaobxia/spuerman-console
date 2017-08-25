/**
* Created by 周翔 on 2017/4/17.
*/

<template>
  <div>

    <div class="btn-group-wrapper bottom">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
      </el-button-group>
    </div>

    <el-table ref="groupTable" :data="getSysGroups" height="400" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler" current-row-key="groupId" style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="groupName" label="分组名称" width="200"/>
      <el-table-column prop="bizGroupCode" label="业务分组" width="200"/>
      <el-table-column prop="bizCode" label="业务编码" width="200"/>
      <el-table-column prop="createDate" label="创建时间" width="200"/>
      <el-table-column prop="updateDate" label="更新时间"/>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="getSysGroupsCurrentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getSysGroupsTotalCount">
      </el-pagination>
    </div>

    <group-form ref="groupForm" :mode="formMode" :param="currentRecord"/>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'
  import groupStore from './bll/groupStore'
  import store from '../../store'
  (!store.state.sysGroup) && store.registerModule('sysGroup', groupStore)
  import GroupForm from './groupForm.vue'

  export default{
    data() {
      return {
        pageSize: 10,
        formMode: null,
        currentRecord: null
      }
    },

    computed: {
      ...mapGetters(['getSysGroups', 'getSysGroupsCurrentPage', 'getSysGroupsTotalCount'])
    },

    components: {GroupForm},

    mounted() {
      this.initPage();
    },
    methods: {
      ...mapActions(['querySysGroups', 'deleteSysGroup', 'querySysGroupsCount']),

      initPage() {
        console.log('[Group Page] mounted');
        this.querySysGroups();
        this.querySysGroupsCount();
      },
      addHandler() {
        this.currentRecord = null;

        // hack table again
        let selectedRow = this.$refs.groupTable.$el.querySelector('.current-row');
        if (selectedRow && selectedRow.classList) {
          selectedRow.classList.remove('current-row');
        }
        this.formMode = 'ADD';
        this.$refs.groupForm.enable();
        this.$refs.groupForm.clear();
      },
      editHandler() {
        if (!this.currentRecord) {
          this.$message.warning('请选择您要操作的数据');
          return;
        }
        this.$refs.groupForm.enable();
        this.formMode = 'EDIT';
      },
      delHandler() {
        if (!this.currentRecord) {
          this.$message.warning('请选择您要操作的数据');
          return;
        }

        this.deleteGroup(this.currentRecord.groupId)
      },
      tableRowChangeClickHandler (currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRecord = currentRow;
        this.$refs.groupForm.disable();
      },
      deleteGroup(groupId) {
        this.$confirm('您确定要删除这条数据吗', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSysGroup({groupId}).then(data => {
            this.$message.success('删除成功');
            this.currentRecord = null;
            this.$refs.groupForm.clear();
          });
        });
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.querySysGroups({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.querySysGroups({pageIndex: val, pageSize: this.pageSize});
      }
    }
  }
</script>
