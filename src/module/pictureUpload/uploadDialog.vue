<!-- Created by shi.pengyan on 2017-03-29. -->
<template>
  <div>
    <el-dialog
      ref="dialog" title="图片上传" v-model="isUploadShow" @close="closeDialogHandler">
      <div v-loading="loading" element-loading-text="上传中...">
        <el-form>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="bucketId">
                <el-select placeholder="请选择存储空间" v-model="bucketId" style="width:100%">
                  <el-option v-for="item in getSysBuckets" :label="item.bucketName" :value="item.bucketId"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <el-upload
          action="//upload.qiniu.com/"
          drag
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="uploadSuccessHandler"
          :on-error="uploadFailHandler"
          :on-progress="uploadProgressHandler"
          :data="form">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">文件大小不能超过10M</div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
  import {mapActions} from 'vuex';
  import fileUtil from '../../util/fileUtil';
  import arrayUtil from '../../util/arrayUtil';

  export default{
    name: 'simple-upload-dialog',
    data() {
      return {
        loading: false,
        isUploadShow: false,  // 是否显示upload组件
        supportWebp: false,   // 是否支持webp
        bucketHost: '',   // 上传图片的外链域名
        form: {},
        bucketId: 1,
        bucket: null
      }
    },

    computed: {
      getSysBuckets() {
        return this.$store.state.sysFileUpload.buckets;
      }
    },

    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions(['queryUploadToken', 'saveUploadFile', 'queryBuckets']),

      initPage() {
        this.queryBuckets();
      },
      beforeUpload (file) {
        if (file == null) {
          this.$message.error('上传文件不能为空');
          return false;
        }

        console.log('before upload', file);

        const largeFile = file.size / 1024 / 1024 > 10;
        if (largeFile) {
          this.$message.error('上传文件不能超过10MB!');
          return false;
        }

        //  this.$nextTick(function () {
        //      resolve();
        //  });

        const suffix = fileUtil.getSuffix(file.name);

        this.loading = true;
        return this.queryUploadToken({suffix, bucketId: this.bucketId}).then((tokenModel) => {
          console.log('query upload token suc', tokenModel);

          this.form = {token: tokenModel.token, key: tokenModel.fileName};

          //
          this.bucket = this.findBucket(this.bucketId);

          this.bucketHost = this.bucket.hostName;

        }, (err) => {
          this.loading = false;
          console.error('query upload token fail', err);
          this.$message({
            showClose: true,
            message: '上传失败，请重新选择文件',
            type: 'error'
          });
        });
      },

      uploadSuccessHandler (response, file, fileList) {
        //response:bucket,fname,fsize,hash,key,mimeType
        console.log(response);

        const fileInfo = {
          fileName: response.key,
          originFileName: file.name,
          hash: response.hash,
          fileUrl: `${this.bucketHost}${response.key}`, //TODO
          mimeType: response.mimeType,
          fileSize: response.fsize || '',
          bucket: response.bucket,
          bucketId: this.bucketId,
          bucketName: this.bucket.bucketName,
          isPublic: this.bucket.isPublic
        };

        console.log(fileInfo);

        this.saveUploadFile(fileInfo).then(() => {
          this.loading = false;
          this.$message.info('上传成功');
        }).catch(() => {
          this.loading = false;

          this.$message({
            showClose: true,
            message: '上传失败，请重新选择文件',
            type: 'error'
          });
        });
      },

      uploadFailHandler(err, file, fileList) {
        if (err) {
          console.error(err);
          this.$message.error(JSON.stringify(err));
          return;
        }
        console.log('uploadFailHandler');
      },

      uploadProgressHandler(event, file, fileList) {
        console.log('uploadProgressHandler');
      },

      closeDialogHandler() {
      },

      findBucket(bucketId) {
        return arrayUtil.findItem(this.getSysBuckets, 'bucketId', bucketId);
      },

      //interface
      open() {
        this.isUploadShow = true;
      },

      close() {
        this.isUploadShow = false;
        this.loading = false;
      }
    }
  }
</script>
