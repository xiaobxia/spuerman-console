<!-- Created by shi.pengyan on 2017-01-13. -->
<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'5px'}">
      <div class="clearfix" style="padding:5px;">
        <span style="line-height: 36px;">Detail</span>
      </div>

      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="Job Name" prop="jobName">
              <el-input v-model="form.jobName" :disabled="disableForm || pageModel==='EDIT'"/>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="Job Group" prop="jobGroup">
              <el-input v-model="form.jobGroup" :disabled="disableForm"/>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="Cron Expression" prop="cronExpression">
              <el-input v-model="form.cronExpression" :disabled="disableForm"/>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-form-item label="Job Class" prop="clazz">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="Input Paramter more values here."
                      v-model="form.clazz" :disabled="disableForm">
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
  import assignDeep from 'assign-deep'
  import { mapActions } from 'vuex'

  import moduleStore from './bll/store'
  import store from '../../store'
  (!store.state.sysJobService) && store.registerModule('sysJobService', moduleStore)

  export default{
    data() {
      return {
        disableForm: true,
        pageModel: 'ADD',
        form: {
          Id: null,
          jobName: '',
          jobGroup: '',
          cronExpression: '',
          clazz: '',
          description: ''
        },
        rules: {
          jobName: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          jobGroup: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          cronExpression: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          clazz: [
            {required: true, message: 'This field is required.', trigger: 'change'}
          ],
          description: [
            {required: true, message: 'This field is required.', trigger: 'change'}
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
          this.form.id = record.id;
          this.form.jobName = record.jobName;
          this.form.jobGroup = record.jobGroup;
          this.form.cronExpression = record.cronExpression;
          this.form.clazz = record.clazz;
          this.form.description = record.description;
        } else {
          assignDeep(this.form, {
            id: '',
            jobName: '',
            jobGroup: '',
            cronExpression: '',
            clazz: '',
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
      ...mapActions(['saveSysJob', 'querySysJob', 'updateSysJob']),
      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            self[self.pageModel === 'ADD' ? 'saveSysJob' : 'updateSysJob'](self.form).then(() => {
              self.disable();
              if (self.pageModel === 'ADD') {
                self.resetHandler();
                self.$message.success('Succeed in adding param info.');
              } else {
                self.$alert('Succeed in update param info.', 'Information', {
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

