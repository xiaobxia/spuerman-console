<template>
  <div>
    <el-dialog ref="dialog" title="Please Select Privilege"
               v-model="dialogVisible"
               @close="closeDialogHandler">
      <!--<el-tree ref="privTree" :data="privList" :props="defaultProps"-->
      <!--:highlight-current="true"-->
      <!--:default-expand-all="true"-->
      <!--:render-content="renderTreeRowContent"-->
      <!--@node-click="handleNodeClick"></el-tree>-->

      <el-table :data="privList" height="500" border :stripe="true" :highlight-current-row="true"
                @current-change="tableRowChangeClickHandler"
                style="width: 100%">
        <el-table-column prop="privName" label="Priv Name" width="150"/>
        <el-table-column prop="privCode" label="Priv Code" width="200"/>
        <el-table-column prop="type" label="Type" :formatter="formatterHandler" width="100"/>
        <el-table-column prop="path" label="Path"/>
        <el-table-column prop="url" label="URL"/>
        <el-table-column prop="state" label="State" :formatter="formatterHandler" width="80"/>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHandler">Cancel</el-button>
        <el-button type="primary" @click="okHandler">OK</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/privStore'
  import store from '../../store'
  (!store.state.sysPriv) && store.registerModule('sysPriv', moduleStore)

  import privUtil from './bll/privUtil'

  export default{
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        dialogVisible: false,
        currentSelectedRecord: null,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    props: {
      closeHandler: {
        type: Function
      }
    },
    computed: {
      privList() {
        return this.$store.state.sysPriv.privs;
      },
      totalCount() {
        return this.$store.state.sysPriv.totalCount;
      }
    },
    mounted() {
      console.log('[Priv Select dialog] mounted');
    },

    methods: {
      ...mapActions(['queryPrivs', 'queryPrivsCount', 'deletePriv']),

      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 'A' ? 'Yes' : 'Discard';
          case 'type':
            return privUtil.formatPrivType(row.type);
        }
      },

      tableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.currentSelectedRecord = row;
      },

      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.queryPrivs({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        this.queryPrivs({pageIndex: val, pageSize: this.pageSize});
      },

      //renderTreeRowContent(h, {data, node}) {
      //  console.log('render tree row content', data, node);
      //
      //  return h('span', [privUtil.formatRow(data)]);
      //  //return (<div>data.name</div>);
      //},
      //
      //handleNodeClick (row, event, column) {
      //  console.log(row);
      //  this.currentSelectedRecord = row;
      //},


      closeDialogHandler() {
        console.log('close user dialog');
      },

      cancelHandler() {
        this.dialogVisible = false;
      },

      okHandler() {
        console.log('dialog ok handler');
        this.dialogVisible = false;
        this.currentPage = 1;
        if (this.currentSelectedRecord) {
          const record = this.currentSelectedRecord;
          const priv = {
            privId: record.privId,
            privName: record.privName,
            privCode: record.privCode,
            type: record.type,
            description: record.description
          };

          this.closeHandler && this.closeHandler(priv);
        }
      },

      // interface for invoking
      open() {
        this.dialogVisible = true;
        this.queryPrivs();
        this.queryPrivsCount();

        if (this.currentSelectedRecord) {
          this.$nextTick(() => {
            //this.$refs.userTable.clearSelection();
            //this.$refs.userTable.toggleRowSelection(this.currentSelectedRecord, false);
          })
        }
      },
      close() {
        this.dialogVisible = false;
      }

    }
  }
</script>
