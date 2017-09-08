<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'5px'}">
      <div class="clearfix" style="padding:5px;">
        <span style="line-height: 36px;">详情</span>
      </div>

      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="空间名称" prop="bucketName">
              <el-input v-model="form.bucketName" :disabled="disableForm"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="空间编码" prop="bucketCode">
              <el-input v-model="form.bucketCode" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="域名" prop="hostName">
              <el-input v-model="form.hostName" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否公开" prop="isPublic">
              <el-select v-model="form.isPublic" :disabled="disableForm" style="width:100%">
                <el-option label="私有" value="false"/>
                <el-option label="公开" value="true"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Input Description"
                      v-model="form.description" :disabled="disableForm">
            </el-input>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-button type="info" @click="saveHandler" :disabled="disableForm">保存</el-button>
          <el-button type="danger" @click="resetHandler" :disabled="disableForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/babel">
  import assignDeep from 'assign-deep';
  import { mapActions } from 'vuex';

  import moduleStore from './bll/fileUploadStore';
  import store from '../../store';
  (!store.state.sysFileUpload) && store.registerModule('sysFileUpload', moduleStore);

  export default{
    data() {
      return {
        disableForm: true,
        pageModel: 'ADD',
        form: {
          bucketId: null,
          bucketCode: '',
          bucketName: '',
          hostName: '',
          isPublic: 'true',
          description: ''
        },
        rules: {
          bucketCode: [
            {required: true, message: '该字段必填', trigger: 'change'}
          ],
          bucketName: [
            {required: true, message: '该字段必填', trigger: 'change'}
          ],
          hostName: [
            {required: true, message: '该字段必填', trigger: 'change'}
          ],
          isPublic: [
            {required: true, message: '该字段必填', trigger: 'change'}
          ]
        }
      };
    },

    props: {
      param: {
        type: Object
      },
      mode: {
        type: String
      }
    },

    watch: {
      param(record) {
        if (record) {
          this.form.bucketId = record.bucketId;
          this.form.bucketCode = record.bucketCode;
          this.form.bucketName = record.bucketName;
          this.form.hostName = record.hostName;
          this.form.isPublic = '' + record.isPublic;
          this.form.description = record.description;
        } else {
          assignDeep(this.form, {
            bucketId: null,
            bucketCode: '',
            bucketName: '',
            hostName: '',
            isPublic: 'true',
            description: ''
          });
        }
      },
      mode(val) {
        this.pageModel = val;
      }
    },

    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions('sysFileUpload', ['saveBucket', 'updateBucket']),

      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            self[self.pageModel === 'ADD' ? 'saveBucket' : 'updateBucket'](self.form).then(() => {
              self.disable();
              if (self.pageModel === 'ADD') {
                self.resetHandler();
                self.$message.success('添加文件空间成功');
              } else {
                self.$alert('更新文件空间成功', 'Information', {
                  confirmButtonText: 'OK'
                });
              }
            });
          } else {
            this.$message({
              showClose: true,
              message: '请选择一条记录',
              type: 'error'
            });

            return false;
          }
        });
      },

      resetHandler() {
        this.$refs.form.resetFields();
        this.disableForm = true;
      },

      initPage() {

      },

      // interface for invoking

      disable() {
        this.disableForm = true;
      },
      enable() {
        this.disableForm = false;
      },
      clear() {
        this.$refs.form.resetFields();
      }

    }
  };
</script>
