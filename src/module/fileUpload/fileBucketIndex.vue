<!-- Created by shi.pengyan on 2017-04-10. -->
<template>
  <div>
    <div class="btn-group-wrapper bottom">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
        <el-button type="primary" @click="refreshHandler"><i class="fa fa-refresh"/></el-button>
      </el-button-group>
    </div>

    <el-table ref="bucketTable" :data="getSysBuckets" height="300" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler" current-row-key="id"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="bucketName" label="空间名称" width="100"/>
      <el-table-column prop="bucketCode" label="空间编码" width="200"/>
      <el-table-column prop="isPublic" label="是否公开" :formatter="formatterHandler" width="100"/>
      <el-table-column prop="hostName" label="域名" width="300"/>
      <el-table-column prop="createDate" label="创建日期"/>
    </el-table>

    <file-bucket-form ref="bucketForm" :mode="formMode" :param="currentRecord"/>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/fileUploadStore'
  import store from '../../store'
  (!store.state.sysFileUpload) && store.registerModule('sysFileUpload', moduleStore)

  import FileBucketForm from './fileBucketForm.vue'

  export default{
    data() {
      return {
        formMode: null,
        currentRecord: null
      }
    },
    computed: {
      getSysBuckets() {
        return this.$store.state.sysFileUpload.buckets;
      }
    },

    components: {FileBucketForm},
    mounted() {
      console.log('[File Bucket page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryBuckets', 'deleteBucket']),

      initPage() {
        this.queryBuckets();
      },

      addHandler() {
        this.currentRecord = null;

        // hack table again
        let selectedRow = this.$refs.bucketTable.$el.querySelector('.current-row');
        if (selectedRow && selectedRow.classList) {
          selectedRow.classList.remove('current-row');
        }
        this.formMode = 'ADD';
        this.$refs.bucketForm.enable();
        this.$refs.bucketForm.clear();
      },

      editHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$refs.bucketForm.enable();
        this.formMode = 'EDIT';
      },

      delHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }

        this._deleteParam(this.currentRecord.bucketId)
      },

      refreshHandler() {
        this.initPage();
      },

      tableRowChangeClickHandler (currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRecord = currentRow;
        this.$refs.bucketForm.disable();
      },

      formatterHandler (row, column) {
        switch (column.property) {
          case 'isPublic':
            return '' + row.isPublic;
        }
      },

      _deleteParam(bucketId) {
        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteBucket({bucketId}).then(data => {
            this.$message.success('记录删除成功');
            this.currentRecord = null;
            this.$refs.bucketForm.clear();
          });
        });
      }

    }
  }
</script>

