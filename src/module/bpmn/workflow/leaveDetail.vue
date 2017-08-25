<template>
  <div>
    <div style="text-align:center">请假申请单</div>
    <div>
      <p>申请人：{{getLeave.userCode}}</p>
      <p>请假类型：{{getLeave.type}}</p>
      <p>请假时间：{{getLeave.beginDate}} ~ {{getLeave.endDate}}</p>
      <p>事由：{{getLeave.reason}}</p>
      <p>备注：{{getLeave.description}}</p>
    </div>

    <div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="审批意见">
          <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button-group>
        <el-button @click="dealWithHandler(item)"
                   v-for="item in getTrans"
                   :type="item.toLowerCase() ==='end' ?'danger':'primary'">{{item}}
        </el-button>
      </el-button-group>
    </div>

    <leave-comment-list :pid="pid"/>
  </div>
</template>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from '../bll/bpmnStore'
  import store from '../../../store'
  (!store.state.sysBpmn) && store.registerModule('sysBpmn', moduleStore)

  import LeaveCommentList from './component/leaveCommentList.vue';

  export default{
    data() {
      return {
        form: {
          desc: null
        },
        pid: null
      }
    },

    computed: {
      getLeave() {
        return this.$store.state.sysBpmn.leave;
      },
      getTrans() {
        return this.$store.state.sysBpmn.trans;
      }
    },

    components: {LeaveCommentList},
    mounted() {
      this.initPage();
    },
    methods: {
      ...mapActions(['queryLeaveByPid', 'changeOutGoing', 'queryTaskTrans']),

      initPage() {
        console.log('[ Leave Detail ] page mounted');

        let queryObj = this.$route.query;
        if (queryObj && queryObj.pid) {
          const {pid} = queryObj;

          this.pid = pid;
          this.queryLeaveByPid({pid});
          this.queryTaskTrans({pid});

        } else {
          console.warn('no leaveId in query param');
        }
      },

      dealWithHandler(type) {
        console.log('deal with', type);
        if (type) {
          // 或者根据类型转换
          this._outGoing(this.pid, type.toLowerCase(), this.form.desc);
        } else {
          console.warn('type is null,please check');
        }
      },

      _outGoing(pid, outGoing, desc) {
        const info = {pid, outGoing, desc};
        this.changeOutGoing({OutGoing: info}).then(() => {
          switch (outGoing) {
            case 'agree':
              this.$message('通过审核成功');
              this.$router.push('/bpmn/myTask');
              break;
            case 'reject':
              this.$message('拒绝成功');
              this.$router.push('/bpmn/myTask');
              break;
            case 'end':
              this.$message('结束成功');
              this.$router.push('/bpmn/myTask');
              break;
            default:
              console.warn('unkown outGoing');
              break;
          }
        });
      }
    }

  }
</script>
