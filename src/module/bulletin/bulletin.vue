/**
* Created by 周翔 on 2017/4/11.
*/

<template>
  <div>
    <div class="btn-group-wrapper bottom">
      <el-form :inline="true" :model="form">
        <el-button-group>
          <el-button type="primary" icon="plus" @click="addHandler"/>
          <el-button type="primary" icon="edit" @click="editHandler"/>
          <el-button type="primary" icon="delete" @click="delHandler"/>
        </el-button-group>
        <el-select v-model="form.groupId" clearable placeholder="分类" style="width:200px;">
          <el-option v-for="item in all" :label="item.label" :value="item.value"/>
          <el-option v-for="item in getSysGroups" :label="item.groupName" :value="item.groupId"/>

        </el-select>
        <el-form-item>
          <el-button type="primary" @click="_queryBulletinByGroupId">查询</el-button>
        </el-form-item>
      </el-form>
    </div>


    <el-table ref="bulletinTable" :data="getSysBulletins" height="500" border :stripe="true"
              :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler" current-row-key="id" style="width: 100%">
      <el-table-column type="index" width="50"/>
      <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"/>
      <el-table-column prop="createDate" label="创建日期" width="180"/>
      <el-table-column prop="groupName" label="分组名称" width="110"/>
      <el-table-column prop="type" label="文章类型" :formatter="formatterTypeHandler" width="80"/>
      <el-table-column prop="state" label="使用状态" :formatter="formatterStateHandler" width="80"/>
      <el-table-column inline-template :context="_self" label="操作" width="200" fixed="right">
      <span>
        <el-button type="info" size="small" @click="PreviewHandler($index,row)">预览</el-button>
        <el-button :type="row.state === 1?'danger':'info'" size="small"
                   @click="reviewHandler($index,row)">{{row.state === 1?'审核':'取消审核'}}</el-button>
      </span>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="getSysBulletinsCurrentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getSysBulletinsTotalCount">
      </el-pagination>
    </div>
    <el-dialog title="文章预览" v-model="showContentDialog">
      <div>
        <p>{{title}}</p>
      </div>
      <div>
        <p v-html="content"></p>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'

  import bulletinStore from './bll/bulletinStore'
  import store from '../../store'
  (!store.state.sysBulletin) && store.registerModule('sysBulletin', bulletinStore)


  export default{
    data() {
      return {
        State: 2,
        pageSize: 10,
        formMode: null,
        currentRecord: null,
        queryModel: 0,
        title: '',
        content: '',
        showContentDialog: false,
        form: {
          groupId: '',
          groupName: ''
        },
        all: [{
          value: 0,
          label: '全部内容'
        }]
      }
    },
    computed: {
      ...mapGetters(['getSysBulletins', 'getSysBulletinsCurrentPage', 'getSysBulletinsTotalCount', 'getSysGroups'])
    },

    mounted() {
      this.initPage();
    },
    mode(val) {
      this.pageModel = val;
    },
    methods: {
      ...mapActions(['queryBulletin', 'querySysBulletins', 'deleteSysBulletin', 'querySysBulletinsCount', 'queryGroup', 'reviewSysBulletin']),
      initPage() {
        console.log('[Bulletin Page] mounted');
        this.querySysBulletins();
        let biz = 'bulletin';
        this.queryGroup({biz});
        this.querySysBulletinsCount({groupId: 0});
        //this.queryGroup('bulletin');
      },
      //addHandler() {
      //  this.currentRecord = null;
      //
      //  // hack table again
      //  let selectedRow = this.$refs.bulletinTable.$el.querySelector('.current-row');
      //  if (selectedRow && selectedRow.classList) {
      //    selectedRow.classList.remove('current-row');
      //  }
      //  this.formMode = 'ADD';
      //  this.$refs.bulletinForm.enable();
      //  this.$refs.bulletinForm.clear();
      //},
      addHandler() {
        this.$router.push('/bulletin/add');
      },
      editHandler() {
        if (!this.currentRecord) {
          this.$message.warning('请选择需要修改的内容');
          return;
        }
        this.$router.push({path: '/bulletin/add', query: {id: this.currentRecord.id}})

      },
      PreviewHandler(index, row) {
        if (row.type === 1) {
          if (row.url) {
            window.open && window.open(row.url);
          } else {
            this.$message('链接地址为空，请检查');
          }
          return;
        }

        let id = row.id;
        this.queryBulletin({id}).then(bulletin => {
          this.title = bulletin.title;
          this.content = bulletin.content;
          this.showContentDialog = true;
        })
      },
      delHandler() {
        if (!this.currentRecord) {
          this.$message.warning('请选择需要删除的内容');
          return;
        }
        this._deleteBulletin(this.currentRecord.id)
      },

      reviewHandler(index, row) {
        this.$confirm(row.state === 1 ? '你确定要审核这条公告吗?' : '你确定要取消这条公告的审核吗?', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.reviewSysBulletin(row).then(data => {
            this.$message.success(row.state === 1 ? '取消审核成功' : '审核成功');
          });
        });
      },
      tableRowChangeClickHandler (currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRecord = currentRow;
      },

      enableHandler () {
        console.log('enable');
        this.$message.warning('this function is building...');
      },

      formatterTypeHandler (row, column) {
        switch (column.property) {
          case 'type':
            switch (row.type) {
              case 0:
                return '常规文章';
              case 1:
                return '超链接';
            }
            break;
        }
        return 'Unkown key'
      },
      formatterStateHandler (row, column) {
        switch (column.property) {
          case 'state':
            switch (row.state) {
              case 0:
                return '废弃';
              case 1:
                return '未审核';
              case 2:
                return '已审核';
            }
            break;
        }
        return 'Unkown key'
      },

      _deleteBulletin(id) {
        this.$confirm('你确定要删除这条记录吗?', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSysBulletin({id}).then(data => {
            this.$message.success('删除成功');
            this.currentRecord = null;
          });
        });
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        if (this.form.groupId === '') {
          this.querySysBulletins({groupId: 0, pageIndex: 1, pageSize: val});
        } else {
          this.querySysBulletins({groupId: this.form.groupId, pageIndex: 1, pageSize: val});
        }
        //this.querySysBulletins({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        if (this.form.groupId === '') {
          this.querySysBulletins({groupId: 0, pageIndex: val, pageSize: this.pageSize});
        } else {
          this.querySysBulletins({groupId: this.form.groupId, pageIndex: val, pageSize: this.pageSize});
        }
        //  this.querySysBulletins({pageIndex: val, pageSize: this.pageSize});
      },
      _queryBulletinByGroupId() {
        if (this.form.groupId === '') {
          this.querySysBulletins({groupId: 0});
          this.querySysBulletinsCount({groupId: 0});
        } else {
          this.querySysBulletins({groupId: this.form.groupId});
          this.querySysBulletinsCount({groupId: this.form.groupId});
        }

      }
    }
  }
</script>
