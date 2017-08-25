<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">

      <el-row>
        <el-col :span="8">
          <el-form-item label="申请人">
            <el-input type="input" v-model="loginUserCode" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="请假类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择" style="width:100%">
              <el-option v-for="item in leaveTypes" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="请假时间" prop="dateRange">
            <el-date-picker
              v-model="form.dateRange"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="审核人" prop="assignee">
            <el-input type="input" v-model="form.assignee"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="事由" prop="reason">
            <el-input type="textarea" v-model="form.reason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="备注" prop="description">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="saveHandler">申请</el-button>
        <el-button @click="resetHandler">{{$t('CANCEL')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from '../bll/bpmnStore'
  import store from '../../../store'
  (!store.state.sysBpmn) && store.registerModule('sysBpmn', moduleStore)

  export default{
    data() {
      return {
        pid: null,
        mode: null,
        form: {
          type: null,
          dateRange: '',
          reason: '',
          description: '',
          assignee: 'admin'//TODO
        },
        rules: {
          type: [
            {type: 'number', required: true, message: this.$t('FIELD_REQUIRED'), trigger: 'blur'}
          ],
          dateRange: [
            {type: 'array', required: true, message: this.$t('FIELD_REQUIRED'), trigger: 'blur'}
          ],
          assignee: [
            {required: true, message: this.$t('FIELD_REQUIRED'), trigger: 'blur'}
          ],
          reason: [
            {required: true, message: this.$t('FIELD_REQUIRED'), trigger: 'blur'}
          ]
        }
      }

    },
    computed: {
      leaveTypes() {
        return this.$store.state.sysBpmn.leaveTypes;
      },
      loginUserCode() {
        let loginUser = this.$store.state.loginUser;
        return loginUser && loginUser.userCode;
      }
    },

    mounted() {
      this.initPage();
    },
    methods: {
      ...mapActions(['applyLeave', 'updateLeave', 'queryLeaveByPid']),

      initPage() {
        console.log('[ Apply Leave ] page mounted');

        const {pid} = this.$route.query;

        if (pid) {
          this.mode = 'EDIT';
          this.pid = pid;
          this.queryLeaveByPid({pid}).then(leave => {
            this.form.type = leave.type;
            this.form.reason = leave.reason;
            this.form.description = leave.description;
            this.form.id = leave.id;
            this.form.pid = pid;

            let dateRange = [];
            dateRange.push(leave.beginDate);
            dateRange.push(leave.endDate);
            this.form.dateRange = dateRange;
          });
        }
      },

      saveHandler() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let applyInfo = superman.extend({}, this.form);

            applyInfo.beginDate = applyInfo.dateRange[0];
            applyInfo.endDate = applyInfo.dateRange[1];
            delete applyInfo.dateRange;

            this[this.mode === 'EDIT' ? 'updateLeave' : 'applyLeave']({applyInfo}).then(() => {
              this.$alert('申请成功！', {
                callback: () => {
                  this.$router.push('/bpmn/myTask');
                }
              });

            })
          } else {
            this.$message({
              showClose: true,
              message: this.$t('FORM_INVALID'),
              type: 'error'
            });

            return false;
          }
        });
      },

      resetHandler() {
        this.$refs.form.resetFields();
      }
    }
  }
</script>
