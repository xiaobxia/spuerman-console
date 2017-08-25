<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'5px'}">
      <div class="clearfix" style="padding:5px;">
        <span style="line-height: 36px;">{{$t('DETAIL')}}</span>
      </div>

      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('APP_NAME')" prop="appName">
              <el-input v-model="form.appName" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('APP_CODE')" prop="appCode">
              <el-input v-model="form.appCode" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('APP_TYPE')" prop="appType">
              <el-select v-model="form.appType" placeholder="Please Select APP Type" :disabled="disableForm"
                         style="width:100%">
                <el-option v-for="item in appTypes" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item :label="$t('DESCRIPTION')" prop="description">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Input Description"
                      v-model="form.description" :disabled="disableForm">
            </el-input>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-button type="info" @click="saveHandler" :disabled="disableForm">{{$t('SAVE')}}</el-button>
          <el-button type="danger" @click="resetHandler" :disabled="disableForm">{{$t('CANCEL')}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script type="text/babel">
  import assignDeep from 'assign-deep'
  import { mapActions } from 'vuex'

  import moduleStore from './bll/appStore'
  import store from '../../store'
  (!store.state.sysApp) && store.registerModule('sysApp', moduleStore)

  export default{
    data() {
      return {
        disableForm: true,
        pageModel: 'ADD',
        appTypes: [
          {value: 1, label: 'Android'},
          {value: 2, label: 'IOS'},
          {value: 3, label: 'Win Phone'},
          {value: 4, label: 'Web'}
        ],
        form: {
          appId: null,
          appCode: '',
          appName: '',
          appType: '',
          description: ''
        },
        rules: {
          appName: [
            {required: true, message: 'This field is required.'}
          ],
          appType: [
            {required: true, message: 'This field is required.'}
          ],
          appCode: [
            {required: true, message: 'This field is required.'}
          ],
          description: [
            {required: true, message: 'This field is required.'}
          ]
        }
      }
    },

    locales: {
      zh: {
        APP_NAME: '应用名称',
        APP_TYPE: '应用类型',
        APP_CODE: '应用编码'
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
          this.form.appId = record.appId;
          this.form.appCode = record.appCode;
          this.form.appName = record.appName;
          this.form.appType = record.appType;
          this.form.description = record.description;
        } else {
          assignDeep(this.form, {
            appId: '',
            addCode: '',
            appName: '',
            appType: '',
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
      ...mapActions(['saveSysApp', 'querySysApp', 'updateSysApp', 'updateSysAppList']),
      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            self[self.pageModel === 'ADD' ? 'saveSysApp' : 'updateSysApp'](self.form).then(() => {
              self.disable();
              if (self.pageModel === 'ADD') {
                self.resetHandler();
                self.$message.success('Succeed in adding App info.');
              } else {
                self.$alert('Succeed in update App info.', 'Information', {
                  confirmButtonText: 'OK'
                });
              }
            })
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
  }
</script>
