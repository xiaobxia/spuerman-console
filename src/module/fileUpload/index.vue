<!-- Created by shi.pengyan on 2016-10-30. -->
<template>
  <div>
    <div>
      <el-button-group>
        <el-button type="primary" icon="plus" @click="openUploadDialogHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
        <el-button type="primary" @click="fileSpaceHandler">空间管理</el-button>
      </el-button-group>
    </div>

    <el-table :data="getSysFiles" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column prop="fileName" label="File Name" width="400"/>
      <el-table-column prop="originFileName" label="Origin File Name" width="250"/>
      <el-table-column prop="mimeType" label="Mime Type" width="150"/>
      <el-table-column prop="bucket" label="Bucket" width="100"/>
      <el-table-column prop="state" label="State" :formatter="formatterHandler" width="80"/>
      <el-table-column prop="createDate" label="Create Date"/>

      <el-table-column inline-template :context="_self" label="操作" width="200" fixed="right">
      <span>
        <el-button type="info" size="small" @click="copyLinkHandler($index,row)">拷贝链接</el-button>
        <el-button type="info" size="small" @click="viewQRLinkHandler($index,row)">QRCode</el-button>
      </span>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="getSysFileCurrentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getFilesCount">
      </el-pagination>
    </div>

    <upload-form ref="uploadForm" :mode="formMode" :param="currentRecord"/>
    <upload-dialog ref="uploadDialog"/>

    <button v-clipboard="copyData" @success="copySucHandler" @error="copyErrorHandler"
            ref="btnCopy" style="display:none">copy
    </button>

    <el-dialog title="QRCode" v-model="showQRCodeDialog">
      <div class="download-url">
        <a :href="copyData" target="_blank">{{copyData}}</a>
      </div>
      <div class="qrcode-wrapper">
        <vue-qrcode :val="copyData" :size="qrcode.size" :level="qrcode.L"></vue-qrcode>
      </div>
    </el-dialog>

    <el-dialog ref="fileBucketDialog" size="large" title="文件空间管理" v-model="showFileBucketDialog">
      <file-bucket-index/>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/fileUploadStore'
  import store from '../../store'
  (!store.state.sysFileUpload) && store.registerModule('sysFileUpload', moduleStore)

  import UploadDialog from './uploadDialog.vue';
  import UploadForm from './uploadForm.vue';
  import VueQrcode from '../common/vueQRcode.vue';
  import FileBucketIndex from './fileBucketIndex.vue';


  export default{
    data() {
      return {
        formMode: null,
        currentRecord: null,
        pageSize: 10,
        form: {},
        copyData: '',
        privFileUrlFlag: false,
        qrcode: {
          size: 120,
          level: 'L'
        },
        showQRCodeDialog: false,
        showFileBucketDialog: false
      }
    },
    components: {UploadDialog, UploadForm, VueQrcode, FileBucketIndex},
    computed: {

      getSysFiles() {
        return this.$store.state.sysFileUpload.files;
      },
      getFilesCount() {
        return this.$store.state.sysFileUpload.totalCount;
      },
      getSysFileCurrentPage() {
        return this.$store.state.sysFileUpload.currentPage;
      }
    },

    mounted() {
      console.log('file upload page mounted.');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryFiles', 'queryFilesCount', 'deleteFile', 'queryPrivFileUrl']),

      initPage() {
        this.queryFiles();
        this.queryFilesCount();
      },

      openUploadDialogHandler() {
        this.$refs.uploadDialog.open();
      },

      editHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }

        this.$refs.uploadForm.enable();
        this.formMode = 'EDIT';
      },

      delHandler() {
        if (!this.currentRecord) {
          this.$message.warning('Please select one record.');
          return;
        }

        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          const id = this.currentRecord.id;
          this.deleteFile({id}).then(data => {
            this.$message.success('Succeed in deleting record.');
            this.currentRecord = null;
            this.$refs.uploadForm.clear();
          });
        });
      },

      fileSpaceHandler() {
        this.showFileBucketDialog = true;
      },

      copyLinkHandler(index, row) {
        let url = row.fileUrl;
        if (row.privFileUrl) {
          url = row.privFileUrl;
        }

        let p = row.isPublic || row.privFileUrl ? Promise.resolve(url) : this.queryPrivFileUrl({fileId: row.id}).then((privUrl) => {
          row.privFileUrl = privUrl;
          this.privFileUrlFlag = true;

          return privUrl;
        });

        p.then((downloadUrl) => {
          this.copyData = downloadUrl;
          console.log(this.copyData);

          this.$nextTick(() => {
            this.$refs.btnCopy.click();
          });
        });
      },

      viewQRLinkHandler($index, row) {

        let url = row.fileUrl;
        if (row.privFileUrl) {
          url = row.privFileUrl;
        }

        let p = row.isPublic || row.privFileUrl ? Promise.resolve(url) : this.queryPrivFileUrl({fileId: row.id});

        p.then((downloadUrl) => {
          this.copyData = downloadUrl;
          this.showQRCodeDialog = true;
        });
      },

      copySucHandler(e) {
        this.$message.info('链接拷贝成功');
        this.privFileUrlFlag = false;
      },
      copyErrorHandler(e) {
        console.error('fail to copy url', e);
        let msg = '拷贝失败，请手动复制地址';
        if (this.privFileUrlFlag) {
          msg = '拷贝失败，请再尝试一次';
        }
        this.$message.warning(msg);
      },

      tableRowChangeClickHandler (currentRow, oldCurrentRow) {
        console.log(currentRow);
        this.currentRecord = currentRow;
        this.$refs.uploadForm.disable();
      },

      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.queryFiles({pageIndex: 1, pageSize: val});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.queryFiles({pageIndex: val, pageSize: this.pageSize});
      },
      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 1 ? 'Yes' : 'Discard';
        }
      }

    }
  }
</script>

<style lang="scss">
  .download-url {
    padding: 5px;
  }

  .qrcode-wrapper {
    margin: auto;
  }
</style>

