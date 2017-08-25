<template>
  <div>

    <div class="btn-group-wrapper">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
      </el-button-group>

      <el-button-group>
        <el-button type="primary" @click="changeStateHandler">Enable/Disable</el-button>
      </el-button-group>
    </div>

    <!--<el-tree :data="getSysPrivs" :props="defaultProps" style="min-height:500px"-->
    <!--:highlight-current="true"-->
    <!--:default-expand-all="true"-->
    <!--:render-content="renderTreeRowContent"-->
    <!--@node-click="handleNodeClick"></el-tree>-->

    <el-table :data="privList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="privName" label="Priv Name" width="200"/>
      <el-table-column prop="privCode" label="Priv Code" width="200"/>
      <el-table-column prop="type" label="Type" :formatter="formatterHandler" width="100"/>
      <el-table-column prop="path" label="Path"/>
      <el-table-column prop="url" label="URL"/>
      <el-table-column prop="state" label="State" :formatter="formatterHandler" width="80"/>
      <el-table-column prop="createDate" label="Create Date" width="155"/>
      <el-table-column prop="description" label="Description"/>
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

  </div>
</template>

<style lang="scss">
  .btn-group-wrapper {
    padding-bottom: 4px;
  }
</style>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/privStore'
  import store from '../../store'
  (!store.state.sysPriv) && store.registerModule('sysPriv', moduleStore)

  import privUtil from './bll/privUtil';

  export default{
    data() {
      return {
        //defaultProps: {
        //  children: 'children',
        //  label: 'name'
        //},
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null
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
      console.log('[Priv Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryPrivs', 'queryPrivsCount', 'deletePriv']),

      initPage() {
        this.queryPrivs();
        this.queryPrivsCount();
      },

      addHandler() {
        this.$router.push('/priv/add');
      },

      editHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$router.push({path: '/priv/add', query: {privId: this.currentSelectedRecord.privId}})
      },

      delHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deletePriv({privId: this.currentSelectedRecord.privId}).then(data => {
            this.$message.success('Succeed in deleting priv record.');
            this.currentSelectedRecord = null;
          });
        })
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
      },

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
      }

      ////TODO old
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
      //}
    }
  }
</script>
