<template>
  <div>
    <div>
      <el-form :inline="true" :model="form">
        <el-button-group>
          <el-button type="primary" icon="plus" @click="openUploadDialogHandler"/>
          <el-button type="primary" icon="edit" @click="editHandler"/>
          <el-button type="primary" icon="delete" @click="delHandler"/>

          <el-input v-model="form.fileName" clearable placeholder="文件名" style="width:200px;"/>
          <el-form-item>
            <el-button type="primary" @click="_queryPictureByFileName">搜索</el-button>
          </el-form-item>
        </el-button-group>
      </el-form>
    </div>

    <el-table :data="getSysFiles" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <el-table-column type="index" width="60"/>
      <el-table-column inline-template :context="_self" label="图片" width="200">
        <img height="100" width="200" :src="row.bucket === '私有空间'||row.fileName.indexOf('log') > 0  ?'':row.fileUrl"/>
      </el-table-column>
      <el-table-column prop="originFileName" label="文件名" width="250"/>
      <el-table-column prop="mimeType" label="文件类型" width="150"/>
      <el-table-column prop="bucket" label="空间" width="100"/>
      <el-table-column prop="state" label="状态" :formatter="formatterHandler" width="80"/>
      <el-table-column prop="createDate" label="创建日期"/>

      <el-table-column inline-template :context="_self" label="操作" width="200" fixed="right">
      <span>
        <el-button type="info" size="small" @click="copyLinkHandler($index,row)">拷贝链接</el-button>
        <el-button type="info" size="small" @click="viewQRLinkHandler($index,row)">二维码</el-button>
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
        <vue-qrcode :val="qrData" :size="qrcode.size" :level="qrcode.L"></vue-qrcode>
      </div>
    </el-dialog>

    <el-dialog ref="fileBucketDialog" size="large" title="文件空间管理" v-model="showFileBucketDialog">
      <file-bucket-index/>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/pictureUploadStore'
  import store from '../../store'
  (!store.state.sysFileUpload) && store.registerModule('sysFileUpload', moduleStore)

  import UploadDialog from './uploadDialog.vue';
  import UploadForm from './uploadForm.vue';
  import VueQrcode from '../common/vueQRcode.vue';
  import FileBucketIndex from './pictureBucketIndex.vue';


  export default{
    data() {
      return {
        form: {
          fileName: ''
        },
        formMode: null,
        currentRecord: null,
        pageSize: 10,
        //form: {},
        copyData: '',
        qrData: '',
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
      ...mapActions(['searchFilesCount', 'searchFiles', 'queryPictures', 'queryPicturesCount', 'deleteFile', 'queryPrivFileUrl']),

      initPage() {
        this.queryPictures();
        this.queryPicturesCount();
      },

      openUploadDialogHandler() {
        this.$refs.uploadDialog.open();
      },

      editHandler() {
        if (!this.currentRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }

        this.$refs.uploadForm.enable();
        this.formMode = 'EDIT';
      },

      delHandler() {
        if (!this.currentRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }

        this.$confirm('你确定要删除这条记录吗?', '确认', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = this.currentRecord.id;
          this.deleteFile({id}).then(data => {
            this.$message.success('删除成功');
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
          this.qrData = location.protocol + downloadUrl;
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
        if (this.form.fileName === '') {
          this.queryPictures({pageIndex: 1, pageSize: val});
        } else {
          this.searchFiles({fileName: this.form.fileName, pageIndex: 1, pageSize: val});
        }
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        if (this.form.fileName === '') {
          this.queryPictures({pageIndex: val, pageSize: this.pageSize});
        } else {
          this.searchFiles({fileName: this.form.fileName, pageIndex: val, pageSize: this.pageSize});
        }
      },
      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 1 ? 'Yes' : 'Discard';
        }
      },
      _queryPictureByFileName() {
        if (this.form.fileName === '') {
          this.queryPictures();
          this.queryPicturesCount();
        }
        this.searchFiles({fileName: this.form.fileName});
        this.searchFilesCount({fileName: this.form.fileName})
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

