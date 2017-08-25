<!-- Created by shi.pengyan on 2016-12-13. -->
<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'5px'}">
      <div class="clearfix" style="padding:5px;">
        <span style="line-height: 36px;">Detail</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="APP" prop="appId">
              <el-select v-model="form.appId" placeholder="Please select App" class="ui-full-width"
                         :disabled="disableForm" @change="appIdChangeHandler">
                <el-option v-for="item in getSysApps" :label="item.appName" :value="item.appId"/>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="Version" prop="versionNumber">
              <el-input v-model="form.versionNumber" placeholder="For example: 1.0.0" class="ui-full-width"
                        :disabled="disableForm"/>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="Force Update" prop="forceUpdate">
              <el-select v-model="form.forceUpdate" placeholder="Wheather force update or not."
                         class="ui-full-width" :disabled="disableForm">
                <el-option v-for="item in forceUpdateList" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="Download URL" prop="downloadPath">
            <el-input v-model="form.downloadPath"
                      placeholder="For example: https://cd121.com/download/CodiFund-1.0.0.apk" :disabled="disableForm"/>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="Description" prop="versionDesc">
            <el-input type="textarea" :rows="5" v-model="form.versionDesc"
                      placeholder="Describle this version." :disabled="disableForm"/>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item>
            <el-button type="primary" @click="saveHandler" :disabled="disableForm">Save</el-button>
            <el-button @click="resetHandler" :disabled="disableForm">Cancel</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/babel">
  import assignDeep from 'assign-deep';
  import { mapActions } from 'vuex';

  import moduleStore from './bll/versionStore'
  import store from '../../store'
  (!store.state.sysVersion) && store.registerModule('sysVersion', moduleStore)

  export default{
    data() {
      return {
        disableForm: true,
        pageModel: 'ADD',
        forceUpdateList: [
          {value: false, label: 'No'},
          {value: true, label: 'Yes'}
        ],
        form: {
          appId: '',
          appName: '',

          versionId: '',
          versionNumber: '1.0.0',
          forceUpdate: false,
          downloadPath: '',
          versionDesc: ''
        },
        rules: {
          appId: [
            {required: true, message: 'This field is required.'}
          ],
          versionNumber: [
            {required: true, message: 'This field is required.'}
          ],
          downloadPath: [
            {required: true, message: 'This field is required.'}
          ],
          forceUpdate: [
            {required: true, message: 'This field is required.'}
          ],
          versionDesc: [
            {required: true, message: 'This field is required.'}
          ]
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
          this.form.appId = record.appId;
          this.form.appName = record.appName;

          this.form.versionId = record.versionId;
          this.form.versionNumber = record.versionNumber;
          this.form.forceUpdate = record.forceUpdate;
          this.form.downloadPath = record.downloadPath;
          this.form.versionDesc = record.versionDesc;

        } else {
          assignDeep(this.form, {
            appId: '',
            appName: '',
            versionId: '',
            versionNumber: '',
            forceUpdate: '',
            downloadPath: '',
            versionDesc: ''
          });
        }
      },
      mode(val) {
        this.pageModel = val;
      }
    },

    mounted () {
      console.log('[app version form] mounted');
      this.initPage();
    },

    computed: {
      //...mapGetters(['getSysApps']),
      getSysApps() {
        return this.$store.state.sysVersion.apps;
      }
    },
    methods: {
      ...mapActions([
        'saveVersion', 'updateVersion', 'deleteVersion',
        'querySysApps'
      ]),
      initPage() {
        this.querySysApps();
      },
      saveHandler () {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            self[self.pageModel === 'ADD' ? 'saveVersion' : 'updateVersion'](self.form).then(() => {
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

      resetHandler () {
        this.$refs.form.resetFields();
        this.disableForm = true;
      },
      appIdChangeHandler(value) {
        console.log('change', arguments);

        for (let i = 0; i < this.getSysApps.length; i++) {
          const item = this.getSysApps[i];
          if (item.appId === value) {
            this.form.appName = item.appName;
          }
        }

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
