<!-- Created by shi.pengyan on 2017-03-30. -->
<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'5px'}">
      <div class="clearfix" style="padding:5px;">
        <span style="line-height: 36px;">详情</span>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="图片地址" prop="fileUrl">
              <el-input v-model="form.fileUrl" :disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-form-item label="备注" prop="description">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="Input Description"
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
  import assignDeep from 'assign-deep'
  import { mapActions } from 'vuex'

  import moduleStore from './bll/pictureUploadStore'
  import store from '../../store'
  (!store.state.sysFileUpload) && store.registerModule('sysFileUpload', moduleStore)

  export default{
    data() {
      return {
        disableForm: true,
        pageModel: 'ADD',
        form: {
          id: null,
          fileUrl: '',
          description: ''
        }
      }
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
          this.form.id = record.id;
          this.form.fileUrl = record.fileUrl;
          this.form.description = record.description;
        } else {
          assignDeep(this.form, {
            id: '',
            fileUrl: '',
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
      ...mapActions(['queryFile', 'updateFile']),
      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            self.updateFile(self.form).then(() => {
              self.disable();
              self.$alert('更新信息成功', '消息', {
                confirmButtonText: 'OK'
              });
            })
          } else {
            this.$message({
              showClose: true,
              message: '请确认表单信息',
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
  }
</script>

