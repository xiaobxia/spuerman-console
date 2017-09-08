<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'5px'}">
      <div class="clearfix" style="padding:5px;">
        <span style="line-height: 36px;">Detail</span>
      </div>

      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Param Code" prop="paramCode">
              <el-input v-model="form.paramCode" :disabled="disableForm || pageModel==='EDIT'"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Param Text" prop="paramText">
              <el-input v-model="form.paramText" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="Param Value" prop="paramValue">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="Input Paramter value."
                      v-model="form.paramValue" :disabled="disableForm"/>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="More Value" prop="paramMoreValue">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="Input Paramter more values here."
                      v-model="form.paramMoreValue" :disabled="disableForm">
            </el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="Description" prop="description">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Input Description"
                      v-model="form.description" :disabled="disableForm">
            </el-input>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-button type="info" @click="saveHandler" :disabled="disableForm">Save</el-button>
          <el-button type="danger" @click="resetHandler" :disabled="disableForm">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script type="text/babel">
  import assignDeep from 'assign-deep';
  import { mapActions } from 'vuex';

  import moduleStore from './bll/paramStore';
  import store from '../../store';
  (!store.state.sysParam) && store.registerModule('sysParam', moduleStore);

  export default{
    data() {
      return {
        disableForm: true,
        pageModel: 'ADD',
        form: {
          Id: null,
          paramCode: '',
          paramValue: '',
          paramText: '',
          paramMoreValue: '',
          description: ''
        },
        rules: {
          paramCode: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          paramValue: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          description: [
            {required: true, message: 'This field is required.', trigger: 'change'}
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
          this.form.id = record.id;
          this.form.paramCode = record.paramCode;
          this.form.paramValue = record.paramValue;
          this.form.paramText = record.paramText;
          this.form.paramMoreValue = record.paramMoreValue;
          this.form.description = record.description;
        } else {
          assignDeep(this.form, {
            id: '',
            paramCode: '',
            paramValue: '',
            paramText: '',
            paramMoreValue: '',
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
      ...mapActions('sysParam', ['saveSysParam', 'querySysParam', 'updateSysParam']),
      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            self[self.pageModel === 'ADD' ? 'saveSysParam' : 'updateSysParam'](self.form).then(() => {
              self.disable();
              if (self.pageModel === 'ADD') {
                self.resetHandler();
                self.$message.success('Succeed in adding param info.');
              } else {
                self.$alert('Succeed in update param info.', 'Information', {
                  confirmButtonText: 'OK'
                });
              }
            });
          } else {
            this.$message({
              showClose: true,
              message: 'Please check this form information.',
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
